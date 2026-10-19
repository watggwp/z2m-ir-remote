// JSON document store: db.json holds settings + remotes/buttons (atomic writes),
// history.jsonl is an append-only event log (one JSON object per line).
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const HISTORY_FILE = path.join(DATA_DIR, 'history.jsonl');

const DEFAULT_DB = {
  settings: {
    mqttUrl: process.env.MQTT_URL || 'mqtt://localhost:1883',
    username: process.env.MQTT_USER || '',
    password: process.env.MQTT_PASS || '',
    baseTopic: process.env.BASE_TOPIC || 'zigbee2mqtt',
  },
  remotes: [],
};

fs.mkdirSync(DATA_DIR, { recursive: true });

let db = load();
let saveTimer = null;

function load() {
  try {
    const parsed = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    return { ...DEFAULT_DB, ...parsed, settings: { ...DEFAULT_DB.settings, ...parsed.settings } };
  } catch (err) {
    if (err.code !== 'ENOENT') console.error('[store] db.json unreadable, starting fresh:', err.message);
    return structuredClone(DEFAULT_DB);
  }
}

function flush() {
  clearTimeout(saveTimer);
  saveTimer = null;
  const tmp = DB_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, DB_FILE);
}

function save() {
  if (!saveTimer) saveTimer = setTimeout(flush, 200);
}

const id = () => crypto.randomBytes(6).toString('hex');
const now = () => new Date().toISOString();

function getRemote(remoteId) {
  return db.remotes.find((r) => r.id === remoteId);
}

function getButton(remoteId, buttonId) {
  const remote = getRemote(remoteId);
  return remote && { remote, button: remote.buttons.find((b) => b.id === buttonId) };
}

function appendHistory(entry) {
  const line = { id: id(), ts: now(), ...entry };
  fs.appendFileSync(HISTORY_FILE, JSON.stringify(line) + '\n');
  return line;
}

function readHistory({ limit = 200, remoteId, buttonId, type } = {}) {
  let lines;
  try {
    lines = fs.readFileSync(HISTORY_FILE, 'utf8').split('\n');
  } catch {
    return [];
  }
  const out = [];
  for (let i = lines.length - 1; i >= 0 && out.length < limit; i--) {
    if (!lines[i]) continue;
    let e;
    try { e = JSON.parse(lines[i]); } catch { continue; }
    if (remoteId && e.remoteId !== remoteId) continue;
    if (buttonId && e.buttonId !== buttonId) continue;
    if (type && e.type !== type) continue;
    out.push(e);
  }
  return out;
}

function clearHistory() {
  fs.writeFileSync(HISTORY_FILE, '');
}

module.exports = {
  get db() { return db; },
  replaceDb(next) { db = { ...DEFAULT_DB, ...next, settings: { ...db.settings, ...(next.settings || {}) } }; flush(); },
  save, flush, id, now, getRemote, getButton,
  appendHistory, readHistory, clearHistory,
  DATA_DIR,
};
