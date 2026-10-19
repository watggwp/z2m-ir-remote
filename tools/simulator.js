// Demo mode: embedded MQTT broker + fake Zigbee2MQTT with a virtual ZS06,
// then starts the web server against it. Lets you try everything without hardware.
//   npm run demo           -> http://localhost:3000
const net = require('net');
const path = require('path');
const crypto = require('crypto');
const mqtt = require('mqtt');
const aedes = require('aedes')();

const MQTT_PORT = Number(process.env.SIM_MQTT_PORT) || 1884;
const BASE = 'zigbee2mqtt';
const DEVICES = ['IR Living Room', 'IR Bedroom'];
const LEARN_DELAY_MS = Number(process.env.SIM_LEARN_DELAY) || 3000;

function startFakeZ2M() {
  const c = mqtt.connect(`mqtt://localhost:${MQTT_PORT}`, { clientId: 'fake-z2m' });
  const lastCode = {};
  c.on('connect', () => {
    c.publish(`${BASE}/bridge/devices`, JSON.stringify(DEVICES.map((name, i) => ({
      friendly_name: name,
      ieee_address: '0xa4c13800000000' + String(i).padStart(2, '0'),
      definition: {
        model: 'ZS06', vendor: 'Tuya',
        exposes: [{ name: 'learn_ir_code' }, { name: 'learned_ir_code' }, { name: 'ir_code_to_send' }],
      },
    }))), { retain: true });
    for (const name of DEVICES) {
      c.publish(`${BASE}/${name}/availability`, JSON.stringify({ state: 'online' }), { retain: true });
      c.publish(`${BASE}/${name}`, JSON.stringify({ linkquality: 120 + Math.floor(Math.random() * 100) }));
    }
    c.subscribe(`${BASE}/+/set`);
    console.log(`[sim] fake Zigbee2MQTT ready with: ${DEVICES.join(', ')}`);
  });
  c.on('message', (topic, payload) => {
    const name = topic.slice(BASE.length + 1, -'/set'.length);
    let msg;
    try { msg = JSON.parse(payload); } catch { return; }
    if (msg.learn_ir_code === 'ON') {
      console.log(`[sim] ${name}: learning... (code arrives in ${LEARN_DELAY_MS} ms)`);
      // Like real Z2M: echo cached state (old code) immediately, new code later
      c.publish(`${BASE}/${name}`, JSON.stringify({ learned_ir_code: lastCode[name], linkquality: 150 }));
      setTimeout(() => {
        lastCode[name] = crypto.randomBytes(48).toString('base64');
        c.publish(`${BASE}/${name}`, JSON.stringify({ learned_ir_code: lastCode[name], linkquality: 150 }));
        console.log(`[sim] ${name}: learned ${lastCode[name].slice(0, 16)}...`);
      }, LEARN_DELAY_MS);
    }
    if (msg.learn_ir_code === 'OFF') console.log(`[sim] ${name}: learning stopped`);
    if (msg.ir_code_to_send) console.log(`[sim] ${name}: >>> IR SEND ${msg.ir_code_to_send.slice(0, 16)}...`);
  });
}

net.createServer(aedes.handle).listen(MQTT_PORT, () => {
  console.log(`[sim] MQTT broker on mqtt://localhost:${MQTT_PORT}`);
  startFakeZ2M();
  process.env.MQTT_URL = `mqtt://localhost:${MQTT_PORT}`;
  process.env.DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data-demo');
  // Demo uses its own data dir; force broker URL so a saved real-broker setting doesn't apply
  const store = require('../lib/store');
  store.db.settings.mqttUrl = process.env.MQTT_URL;
  store.db.settings.baseTopic = BASE;
  require('../server');
});
