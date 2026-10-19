// End-to-end check against the simulator: create remote -> learn -> re-learn -> press -> history.
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const assert = require('assert');

const PORT = 3999;
const URL = `http://localhost:${PORT}`;
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zs06-test-'));
const child = spawn(process.execPath, [path.join(__dirname, 'simulator.js')], {
  env: { ...process.env, PORT, DATA_DIR: dataDir, SIM_MQTT_PORT: 1899, SIM_LEARN_DELAY: 2000 },
  stdio: ['ignore', 'pipe', 'inherit'],
});
child.stdout.on('data', (d) => process.stdout.write('  | ' + d));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function api(method, p, body) {
  const res = await fetch(URL + p, { method, headers: { 'Content-Type': 'application/json' }, body: body && JSON.stringify(body) });
  return { status: res.status, body: res.status === 204 ? null : await res.json() };
}
async function waitFor(fn, ms = 8000) {
  const end = Date.now() + ms;
  while (Date.now() < end) { const v = await fn(); if (v) return v; await sleep(200); }
  throw new Error('timeout waiting');
}
const getButton = async (rid, bid) => (await api('GET', '/api/state')).body.remotes.find((r) => r.id === rid).buttons.find((b) => b.id === bid);

(async () => {
  try {
    const st = await waitFor(async () => {
      try { const s = (await api('GET', '/api/state')).body; return s.mqtt.status === 'connected' && s.devices.length === 2 && s; } catch { return null; }
    });
    console.log('ok: connected, devices =', st.devices.map((d) => d.name).join(', '));

    const remote = (await api('POST', '/api/remotes', { name: 'ทีวี', device: 'IR Living Room', buttons: [{ name: 'Power', icon: 'power' }] })).body;
    assert.strictEqual(remote.buttons.length, 1);
    const bid = remote.buttons[0].id;

    const pressNoCode = await api('POST', `/api/remotes/${remote.id}/buttons/${bid}/press`, {});
    assert.strictEqual(pressNoCode.status, 400);
    console.log('ok: press without code rejected');

    assert.strictEqual((await api('POST', `/api/remotes/${remote.id}/buttons/${bid}/learn`, {})).status, 202);
    const learned1 = await waitFor(async () => (await getButton(remote.id, bid)).code);
    console.log('ok: learned code', learned1.slice(0, 12));

    // Re-learn: simulator echoes the old code first; it must not be accepted as the result
    await api('POST', `/api/remotes/${remote.id}/buttons/${bid}/learn`, {});
    const learned2 = await waitFor(async () => { const c = (await getButton(remote.id, bid)).code; return c !== learned1 && c; });
    console.log('ok: re-learn ignored stale echo, new code', learned2.slice(0, 12));

    const press = await api('POST', `/api/remotes/${remote.id}/buttons/${bid}/press`, { source: 'smoke-test' });
    assert.strictEqual(press.status, 200);
    assert.strictEqual((await getButton(remote.id, bid)).pressCount, 1);

    const hist = (await api('GET', '/api/history')).body;
    assert.deepStrictEqual(hist.map((h) => `${h.type}:${h.ok}`), ['press:true', 'learn:true', 'learn:true', 'press:false']);
    console.log('ok: history', hist.length, 'entries');

    const csv = await (await fetch(URL + '/api/history.csv')).text();
    assert(csv.includes('smoke-test'));
    await sleep(400);
    const db = JSON.parse(fs.readFileSync(path.join(dataDir, 'db.json'), 'utf8'));
    assert.strictEqual(db.remotes[0].buttons[0].code, learned2);
    console.log('ok: csv export + db.json persisted\nALL PASSED');
  } catch (err) {
    console.error('FAILED:', err);
    process.exitCode = 1;
  } finally {
    child.kill();
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
})();
