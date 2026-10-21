// MQTT bridge to Zigbee2MQTT: discovers IR blasters, sends codes, runs learn sessions.
const mqtt = require('mqtt');
const { EventEmitter } = require('events');

const LEARN_TIMEOUT_MS = 30000;
// Z2M may echo the device's cached (old) learned_ir_code right after we start
// learning; values seen in this window become the baseline instead of a result.
const LEARN_SETTLE_MS = 1500;

class Bridge extends EventEmitter {
  constructor() {
    super();
    this.client = null;
    this.status = 'disconnected';
    this.error = null;
    this.base = 'zigbee2mqtt';
    this.devices = new Map(); // friendly_name -> { name, model, vendor, ieee, availability, lastSeen, lastLearned }
    this.sessions = new Map(); // device -> learn session
    this.instances = new Map(); // base topic -> { base, devices, ir: [names] }
  }

  connect(settings) {
    this.disconnect();
    this.base = (settings.baseTopic || 'zigbee2mqtt').replace(/\/+$/, '');
    this.devices.clear();
    this.instances.clear();
    this.setStatus('connecting');
    const client = mqtt.connect(settings.mqttUrl, {
      username: settings.username || undefined,
      password: settings.password || undefined,
      reconnectPeriod: 3000,
      connectTimeout: 8000,
      clientId: 'zs06-web-' + Math.random().toString(16).slice(2, 8),
    });
    this.client = client;
    client.on('connect', () => {
      this.error = null;
      this.setStatus('connected');
      // '+/bridge/devices' discovers other Zigbee2MQTT instances on the broker.
      // Must be one SUBSCRIBE: some brokers skip retained messages for a later overlapping subscription.
      client.subscribe(['+/bridge/devices', `${this.base}/#`]);
    });
    client.on('reconnect', () => this.setStatus('connecting'));
    client.on('close', () => this.client === client && this.setStatus('disconnected'));
    client.on('error', (err) => { this.error = err.message; this.setStatus(this.status); });
    client.on('message', (topic, payload) => this.onMessage(topic, payload));
  }

  disconnect() {
    for (const device of this.sessions.keys()) this.endLearn(device, 'cancelled');
    if (this.client) {
      const c = this.client;
      this.client = null;
      c.end(true);
    }
    this.setStatus('disconnected');
  }

  setStatus(status) {
    this.status = status;
    this.emit('status', { status, error: this.error });
  }

  deviceList() {
    return [...this.devices.values()].sort((a, b) => a.name.localeCompare(b.name));
  }

  onMessage(topic, payload) {
    const inst = /^([^/]+)\/bridge\/devices$/.exec(topic);
    if (inst) this.onInstance(inst[1], payload.toString());
    if (!topic.startsWith(this.base + '/')) return;
    const rest = topic.slice(this.base.length + 1);
    const text = payload.toString();

    if (rest === 'bridge/devices') return this.onDeviceList(text);
    if (rest.startsWith('bridge/') || rest.endsWith('/set') || rest.endsWith('/get')) return;

    if (rest.endsWith('/availability')) {
      const dev = this.devices.get(rest.slice(0, -'/availability'.length));
      if (!dev) return;
      let state = text;
      try { state = JSON.parse(text).state ?? text; } catch {}
      dev.availability = state;
      return this.emit('devices', this.deviceList());
    }

    const dev = this.devices.get(rest);
    if (!dev) return;
    let msg;
    try { msg = JSON.parse(text); } catch { return; }
    dev.lastSeen = new Date().toISOString();
    if (typeof msg.linkquality === 'number') dev.linkquality = msg.linkquality;
    if (typeof msg.learned_ir_code === 'string' && msg.learned_ir_code) {
      this.onLearnedCode(rest, msg.learned_ir_code);
      dev.lastLearned = msg.learned_ir_code;
    }
    this.emit('devices', this.deviceList());
  }

  onInstance(base, text) {
    let list;
    try { list = JSON.parse(text); } catch { return; }
    if (!Array.isArray(list)) return;
    const ir = list.filter((d) => JSON.stringify(d.definition?.exposes || []).includes('ir_code_to_send'));
    this.instances.set(base, { base, devices: list.length - 1, ir: ir.map((d) => d.friendly_name) });
    this.emit('instances', this.instanceList());
  }

  instanceList() {
    return [...this.instances.values()].sort((a, b) => b.ir.length - a.ir.length || a.base.localeCompare(b.base));
  }

  onDeviceList(text) {
    let list;
    try { list = JSON.parse(text); } catch { return; }
    const seen = new Set();
    for (const d of list) {
      const exposes = JSON.stringify(d.definition?.exposes || []);
      if (!exposes.includes('ir_code_to_send')) continue;
      seen.add(d.friendly_name);
      const prev = this.devices.get(d.friendly_name) || {};
      if (!prev.name) this.requestState(d.friendly_name);
      this.devices.set(d.friendly_name, {
        ...prev,
        name: d.friendly_name,
        model: d.definition?.model,
        vendor: d.definition?.vendor,
        ieee: d.ieee_address,
      });
    }
    for (const name of this.devices.keys()) if (!seen.has(name)) this.devices.delete(name);
    this.emit('devices', this.deviceList());
  }

  publishSet(device, payload) {
    return new Promise((resolve, reject) => {
      if (!this.client || this.status !== 'connected') return reject(new Error('MQTT ยังไม่เชื่อมต่อ'));
      this.client.publish(`${this.base}/${device}/set`, JSON.stringify(payload), { qos: 1 }, (err) =>
        err ? reject(err) : resolve());
    });
  }

  // Z2M does not retain device state, so LQI stays unknown until the device talks.
  // A /get makes it reply now; firmware that ignores it just stays unknown.
  requestState(device) {
    if (this.client && this.status === 'connected') {
      this.client.publish(`${this.base}/${device}/get`, JSON.stringify({ learned_ir_code: '' }));
    }
  }

  send(device, code) {
    return this.publishSet(device, { ir_code_to_send: code });
  }

  async startLearn(device, meta) {
    if (this.sessions.has(device)) throw new Error('อุปกรณ์นี้กำลังเรียนรู้อยู่');
    const session = {
      device, meta,
      startedAt: Date.now(),
      baseline: this.devices.get(device)?.lastLearned,
      timer: setTimeout(() => this.endLearn(device, 'timeout'), LEARN_TIMEOUT_MS),
    };
    this.sessions.set(device, session);
    try {
      await this.publishSet(device, { learn_ir_code: 'ON' });
    } catch (err) {
      clearTimeout(session.timer);
      this.sessions.delete(device);
      throw err;
    }
    this.emit('learn', { state: 'started', device, meta, timeoutMs: LEARN_TIMEOUT_MS });
  }

  onLearnedCode(device, code) {
    const s = this.sessions.get(device);
    if (!s) return;
    if (Date.now() - s.startedAt < LEARN_SETTLE_MS && code === s.baseline) return;
    if (Date.now() - s.startedAt < LEARN_SETTLE_MS && s.baseline === undefined) {
      s.baseline = code;
      return;
    }
    if (code === s.baseline) return;
    this.endLearn(device, 'success', code);
  }

  endLearn(device, state, code) {
    const s = this.sessions.get(device);
    if (!s) return false;
    clearTimeout(s.timer);
    this.sessions.delete(device);
    if (state !== 'success') this.publishSet(device, { learn_ir_code: 'OFF' }).catch(() => {});
    this.emit('learn', { state, device, meta: s.meta, code });
    return true;
  }

  activeLearns() {
    return [...this.sessions.values()].map((s) => ({
      device: s.device, meta: s.meta, remainingMs: Math.max(0, LEARN_TIMEOUT_MS - (Date.now() - s.startedAt)),
    }));
  }
}

module.exports = { Bridge, LEARN_TIMEOUT_MS };
