const path = require('path');
const express = require('express');
const store = require('./lib/store');
const { Bridge } = require('./lib/bridge');

const PORT = Number(process.env.PORT) || 3000;
const app = express();
const bridge = new Bridge();

app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ---------- Server-Sent Events ----------
const clients = new Set();
function broadcast(event, data) {
  const msg = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of clients) res.write(msg);
}

app.get('/api/events', (req, res) => {
  res.set({ 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
  res.flushHeaders();
  res.write(`event: snapshot\ndata: ${JSON.stringify(snapshot())}\n\n`);
  clients.add(res);
  const ping = setInterval(() => res.write(': ping\n\n'), 25000);
  req.on('close', () => { clearInterval(ping); clients.delete(res); });
});

const publicSettings = () => ({ ...store.db.settings, password: store.db.settings.password ? '********' : '' });

function snapshot() {
  return {
    settings: publicSettings(),
    remotes: store.db.remotes,
    mqtt: { status: bridge.status, error: bridge.error },
    devices: bridge.deviceList(),
    sensors: bridge.sensorList(),
    instances: bridge.instanceList(),
    learning: bridge.activeLearns(),
  };
}

const remotesChanged = () => { store.save(); broadcast('remotes', store.db.remotes); };

bridge.on('status', (s) => broadcast('mqtt', s));
bridge.on('devices', (d) => broadcast('devices', d));
bridge.on('sensors', (s) => broadcast('sensors', s));
bridge.on('instances', (i) => broadcast('instances', i));
bridge.on('learn', (evt) => {
  const { remoteId, buttonId } = evt.meta || {};
  const found = store.getButton(remoteId, buttonId);
  if (evt.state === 'success' && found?.button) {
    found.button.code = evt.code;
    found.button.updatedAt = store.now();
    remotesChanged();
  }
  if (evt.state !== 'started') {
    broadcast('history', store.appendHistory({
      type: 'learn', ok: evt.state === 'success', result: evt.state, device: evt.device,
      remoteId, buttonId, remoteName: found?.remote?.name, buttonName: found?.button?.name,
    }));
  }
  broadcast('learn', { state: evt.state, device: evt.device, remoteId, buttonId, timeoutMs: evt.timeoutMs });
});

// ---------- helpers ----------
const wrap = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((err) =>
  res.status(err.status || 500).json({ error: err.message }));
const fail = (status, message) => Object.assign(new Error(message), { status });
const text = (v, max = 80) => String(v ?? '').trim().slice(0, max);

function findRemote(req) {
  const remote = store.getRemote(req.params.rid);
  if (!remote) throw fail(404, 'ไม่พบรีโมท');
  return remote;
}
function findButton(req) {
  const remote = findRemote(req);
  const button = remote.buttons.find((b) => b.id === req.params.bid);
  if (!button) throw fail(404, 'ไม่พบปุ่ม');
  return { remote, button };
}

// ---------- state & settings ----------
app.get('/api/state', (req, res) => res.json(snapshot()));

app.put('/api/settings', wrap((req, res) => {
  const s = store.db.settings;
  const b = req.body || {};
  if (b.mqttUrl !== undefined) s.mqttUrl = text(b.mqttUrl, 300);
  if (b.username !== undefined) s.username = text(b.username, 200);
  if (b.password !== undefined && b.password !== '********') s.password = String(b.password);
  if (b.baseTopic !== undefined) s.baseTopic = text(b.baseTopic, 100) || 'zigbee2mqtt';
  store.flush();
  bridge.connect(s);
  broadcast('settings', publicSettings());
  res.json(publicSettings());
}));

// ---------- remotes ----------
app.post('/api/remotes', wrap((req, res) => {
  const name = text(req.body?.name);
  if (!name) throw fail(400, 'กรุณาตั้งชื่อรีโมท');
  const remote = { id: store.id(), name, device: text(req.body?.device, 200), icon: text(req.body?.icon, 20) || 'tv',
    buttons: [], createdAt: store.now() };
  // Optional preset buttons (names/icons only; codes are learned later)
  for (const p of (Array.isArray(req.body?.buttons) ? req.body.buttons : []).slice(0, 60)) {
    if (!text(p?.name, 40)) continue;
    remote.buttons.push({ id: store.id(), name: text(p.name, 40), icon: text(p.icon, 20), color: text(p.color, 20) || 'slate',
      code: '', pressCount: 0, lastPressedAt: null, createdAt: store.now(), updatedAt: store.now() });
  }
  store.db.remotes.push(remote);
  remotesChanged();
  res.status(201).json(remote);
}));

app.patch('/api/remotes/:rid', wrap((req, res) => {
  const remote = findRemote(req);
  const b = req.body || {};
  if (b.name !== undefined) remote.name = text(b.name) || remote.name;
  if (b.device !== undefined) remote.device = text(b.device, 200);
  if (b.icon !== undefined) remote.icon = text(b.icon, 20);
  remotesChanged();
  res.json(remote);
}));

app.delete('/api/remotes/:rid', wrap((req, res) => {
  const remote = findRemote(req);
  store.db.remotes = store.db.remotes.filter((r) => r !== remote);
  remotesChanged();
  res.status(204).end();
}));

// ---------- buttons ----------
app.post('/api/remotes/:rid/buttons', wrap((req, res) => {
  const remote = findRemote(req);
  const name = text(req.body?.name, 40);
  if (!name) throw fail(400, 'กรุณาตั้งชื่อปุ่ม');
  const button = { id: store.id(), name, color: text(req.body?.color, 20) || 'slate', icon: text(req.body?.icon, 20), code: String(req.body?.code || '').trim(),
    pressCount: 0, lastPressedAt: null, createdAt: store.now(), updatedAt: store.now() };
  remote.buttons.push(button);
  remotesChanged();
  res.status(201).json(button);
}));

app.patch('/api/remotes/:rid/buttons/:bid', wrap((req, res) => {
  const { button } = findButton(req);
  const b = req.body || {};
  if (b.name !== undefined) button.name = text(b.name, 40) || button.name;
  if (b.color !== undefined) button.color = text(b.color, 20);
  if (b.icon !== undefined) button.icon = text(b.icon, 20);
  if (b.code !== undefined) button.code = String(b.code).trim();
  button.updatedAt = store.now();
  remotesChanged();
  res.json(button);
}));

app.delete('/api/remotes/:rid/buttons/:bid', wrap((req, res) => {
  const { remote, button } = findButton(req);
  remote.buttons = remote.buttons.filter((x) => x !== button);
  remotesChanged();
  res.status(204).end();
}));

app.put('/api/remotes/:rid/order', wrap((req, res) => {
  const remote = findRemote(req);
  const order = Array.isArray(req.body?.order) ? req.body.order : [];
  const byId = new Map(remote.buttons.map((b) => [b.id, b]));
  const sorted = order.map((i) => byId.get(i)).filter(Boolean);
  remote.buttons = [...sorted, ...remote.buttons.filter((b) => !order.includes(b.id))];
  remotesChanged();
  res.json(remote.buttons.map((b) => b.id));
}));

// Press: also usable by other automations, e.g. curl -X POST .../press
app.post('/api/remotes/:rid/buttons/:bid/press', wrap(async (req, res) => {
  const { remote, button } = findButton(req);
  const base = { type: 'press', device: remote.device, remoteId: remote.id, buttonId: button.id,
    remoteName: remote.name, buttonName: button.name, source: text(req.body?.source, 30) || 'web' };
  try {
    if (!button.code) throw fail(400, 'ปุ่มนี้ยังไม่มีโค้ด IR');
    if (!remote.device) throw fail(400, 'รีโมทนี้ยังไม่ได้เลือกอุปกรณ์ ZS06');
    await bridge.send(remote.device, button.code);
  } catch (err) {
    broadcast('history', store.appendHistory({ ...base, ok: false, error: err.message }));
    throw err;
  }
  button.pressCount = (button.pressCount || 0) + 1;
  button.lastPressedAt = store.now();
  remotesChanged();
  const entry = store.appendHistory({ ...base, ok: true });
  broadcast('history', entry);
  res.json(entry);
}));

app.post('/api/remotes/:rid/buttons/:bid/learn', wrap(async (req, res) => {
  const { remote, button } = findButton(req);
  if (!remote.device) throw fail(400, 'รีโมทนี้ยังไม่ได้เลือกอุปกรณ์ ZS06');
  await bridge.startLearn(remote.device, { remoteId: remote.id, buttonId: button.id });
  res.status(202).json({ ok: true });
}));

app.post('/api/learn/cancel', wrap((req, res) => {
  res.json({ cancelled: bridge.endLearn(text(req.body?.device, 200), 'cancelled') });
}));

// ---------- history ----------
app.get('/api/history', (req, res) => {
  const { remoteId, buttonId, type } = req.query;
  res.json(store.readHistory({ limit: Math.min(Number(req.query.limit) || 200, 5000), remoteId, buttonId, type }));
});

app.get('/api/history.csv', (req, res) => {
  const rows = store.readHistory({ limit: 100000 });
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const head = ['ts', 'type', 'ok', 'remoteName', 'buttonName', 'device', 'source', 'result', 'error'];
  const csv = '﻿' + [head.join(','), ...rows.map((r) => head.map((h) => esc(r[h])).join(','))].join('\n');
  res.set({ 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="ir-history.csv"' });
  res.send(csv);
});

app.delete('/api/history', (req, res) => {
  store.clearHistory();
  broadcast('history-cleared', {});
  res.status(204).end();
});

// ---------- backup ----------
app.get('/api/export', (req, res) => {
  res.set('Content-Disposition', 'attachment; filename="ir-remotes-backup.json"');
  res.json({ version: 1, exportedAt: store.now(), remotes: store.db.remotes });
});

app.post('/api/import', wrap((req, res) => {
  const remotes = req.body?.remotes;
  if (!Array.isArray(remotes)) throw fail(400, 'ไฟล์สำรองไม่ถูกต้อง');
  store.replaceDb({ ...store.db, remotes });
  broadcast('remotes', store.db.remotes);
  res.json({ count: remotes.length });
}));

bridge.connect(store.db.settings);
app.listen(PORT, () => console.log(`ZS06 IR Remote web UI: http://localhost:${PORT}`));

process.on('SIGINT', () => { store.flush(); process.exit(0); });
