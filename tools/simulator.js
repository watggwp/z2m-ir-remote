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
// Shaped like HOBEIAN ZG-205Z/A as Zigbee2MQTT describes it (access: 1 = published, 2 = settable).
const PRESENCE_DEVICE = {
  friendly_name: 'Human1', ieee_address: '0xa4c1381bd383fb76', type: 'Router',
  definition: {
    model: 'ZG-205Z/A', vendor: 'HOBEIAN', description: '5.8Ghz/24Ghz Human presence sensor',
    exposes: [
      { type: 'binary', name: 'presence', property: 'presence', access: 1, value_on: true, value_off: false },
      { type: 'enum', name: 'motion_state', property: 'motion_state', access: 1, values: ['none', 'large', 'small', 'static'] },
      { type: 'numeric', name: 'target_distance', property: 'target_distance', access: 1, unit: 'm' },
      { type: 'numeric', name: 'illuminance', property: 'illuminance', access: 1, unit: 'lx' },
      { type: 'numeric', name: 'fading_time', property: 'fading_time', access: 3, unit: 's' },
      { type: 'numeric', name: 'linkquality', property: 'linkquality', access: 1, category: 'diagnostic' },
    ],
  },
};
const LEARN_DELAY_MS = Number(process.env.SIM_LEARN_DELAY) || 3000;

function startFakeZ2M() {
  const c = mqtt.connect(`mqtt://localhost:${MQTT_PORT}`, { clientId: 'fake-z2m' });
  const lastCode = {};
  c.on('connect', () => {
    const irDevices = DEVICES.map((name, i) => ({
      friendly_name: name,
      ieee_address: '0xa4c13800000000' + String(i).padStart(2, '0'),
      definition: {
        model: 'ZS06', vendor: 'Tuya',
        exposes: [{ name: 'learn_ir_code' }, { name: 'learned_ir_code' }, { name: 'ir_code_to_send' }],
      },
    }));
    c.publish(`${BASE}/bridge/devices`, JSON.stringify([...irDevices, PRESENCE_DEVICE]), { retain: true });
    for (const name of DEVICES) {
      c.publish(`${BASE}/${name}/availability`, JSON.stringify({ state: 'online' }), { retain: true });
      c.publish(`${BASE}/${name}`, JSON.stringify({ linkquality: 120 + Math.floor(Math.random() * 100) }));
    }
    c.subscribe([`${BASE}/+/set`, `${BASE}/+/get`]);
    // Fake mmWave presence sensor: someone walks in and out every few seconds.
    let present = false;
    setInterval(() => {
      if (Math.random() < 0.3) present = !present;
      c.publish(`${BASE}/${PRESENCE_DEVICE.friendly_name}`, JSON.stringify({
        presence: present, motion_state: present ? (Math.random() < 0.5 ? 'small' : 'static') : 'none',
        target_distance: present ? +(0.5 + Math.random() * 4).toFixed(2) : 0,
        illuminance: 80 + Math.floor(Math.random() * 40), fading_time: 30, linkquality: 100 + Math.floor(Math.random() * 60),
      }));
    }, 2000);
    console.log(`[sim] fake Zigbee2MQTT ready with: ${DEVICES.join(', ')}, ${PRESENCE_DEVICE.friendly_name}`);
  });
  c.on('message', (topic, payload) => {
    const name = topic.slice(BASE.length + 1, -'/set'.length);
    if (topic.endsWith('/get')) {
      c.publish(`${BASE}/${name}`, JSON.stringify({ learned_ir_code: lastCode[name], linkquality: 40 + Math.floor(Math.random() * 200) }));
      return;
    }
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
