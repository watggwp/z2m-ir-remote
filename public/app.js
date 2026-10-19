// ---------- icons ----------
const P = {
  power: '<path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.8 0"/>',
  volup: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M19 12h-6M16 9v6"/>',
  voldown: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M19 12h-6"/>',
  mute: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="m22 9-6 6M16 9l6 6"/>',
  up: '<path d="m18 15-6-6-6 6"/>', down: '<path d="m6 9 6 6 6-6"/>',
  left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>',
  ok: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>', minus: '<path d="M5 12h14"/>',
  home: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M9 22V12h6v10"/>',
  back: '<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  play: '<path d="m7 4 13 8-13 8V4Z"/>', pause: '<path d="M8 4v16M16 4v16"/>',
  input: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="m10 20 2-4 2 4M8 20h8"/>',
  temp: '<path d="M14 14.8V4a2 2 0 0 0-4 0v10.8a4 4 0 1 0 4 0Z"/>',
  snow: '<path d="M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1 19.1 4.9"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  wind: '<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>',
  swing: '<path d="M4 12a8 8 0 0 1 16 0"/><path d="m12 12 5-5"/>',
  star: '<path d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8Z"/>',
  bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2Z"/>',
  // remote kinds
  tv: '<rect x="2" y="5" width="20" height="13" rx="2"/><path d="M8 21h8"/>',
  ac: '<rect x="2" y="4" width="20" height="9" rx="2"/><path d="M6 9h12M7 17l-1 3M12 17v3M17 17l1 3"/>',
  fan: '<circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-7 4-7s3 4-2 7M14 12c4 0 7 1 7 4s-4 3-7-2M12 14c0 4-1 7-4 7s-3-4 2-7M10 12c-4 0-7-1-7-4s4-3 7 2"/>',
  box: '<rect x="3" y="8" width="18" height="9" rx="2"/><path d="M7 12.5h.01M11 12.5h6"/>',
  speaker: '<rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><path d="M12 6h.01"/>',
  light: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2Z"/>',
  remote: '<rect x="7" y="2" width="10" height="20" rx="3"/><circle cx="12" cy="7" r="1.5"/><path d="M10 12h4M10 16h4"/>',
  // ui
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z"/>',
  trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  learn: '<path d="M2 12a10 10 0 0 1 4-8M22 12a10 10 0 0 0-4-8M6 12a6 6 0 0 1 2.5-4.9M18 12a6 6 0 0 0-2.5-4.9"/><circle cx="12" cy="12" r="2"/><path d="M12 14v8"/>',
  check: '<path d="M20 6 9 17l-5-5"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
};
const icon = (name) => (P[name] ? `<svg viewBox="0 0 24 24" aria-hidden="true">${P[name]}</svg>` : '');

const BUTTON_ICONS = ['', 'power', 'volup', 'voldown', 'mute', 'up', 'down', 'left', 'right', 'ok', 'plus', 'minus',
  'home', 'back', 'menu', 'input', 'play', 'pause', 'temp', 'snow', 'sun', 'wind', 'swing', 'timer', 'bulb', 'star'];
const REMOTE_ICONS = ['tv', 'ac', 'fan', 'box', 'speaker', 'light', 'remote'];
const COLORS = ['slate', 'blue', 'teal', 'green', 'amber', 'red', 'pink', 'violet'];

const PRESETS = {
  blank: { label: 'ว่างเปล่า', icon: 'remote', buttons: [] },
  tv: { label: 'ทีวี', icon: 'tv', buttons: [
    ['เปิด/ปิด', 'power', 'red'], ['เพิ่มเสียง', 'volup', 'blue'], ['ลดเสียง', 'voldown', 'blue'], ['ปิดเสียง', 'mute', 'slate'],
    ['ช่อง +', 'up', 'teal'], ['ช่อง -', 'down', 'teal'], ['สัญญาณเข้า', 'input', 'violet'], ['หน้าหลัก', 'home', 'slate'],
    ['ตกลง', 'ok', 'green'], ['ย้อนกลับ', 'back', 'slate']] },
  ac: { label: 'แอร์', icon: 'ac', buttons: [
    ['เปิด/ปิด', 'power', 'red'], ['อุณหภูมิ +', 'plus', 'amber'], ['อุณหภูมิ -', 'minus', 'blue'], ['โหมด', 'snow', 'teal'],
    ['ความแรงลม', 'wind', 'slate'], ['สวิง', 'swing', 'violet'], ['ตั้งเวลา', 'timer', 'slate']] },
  fan: { label: 'พัดลม', icon: 'fan', buttons: [
    ['เปิด/ปิด', 'power', 'red'], ['ความเร็ว', 'wind', 'teal'], ['ส่าย', 'swing', 'violet'], ['ตั้งเวลา', 'timer', 'slate']] },
  box: { label: 'กล่องทีวี', icon: 'box', buttons: [
    ['เปิด/ปิด', 'power', 'red'], ['ขึ้น', 'up', 'slate'], ['ลง', 'down', 'slate'], ['ซ้าย', 'left', 'slate'], ['ขวา', 'right', 'slate'],
    ['ตกลง', 'ok', 'green'], ['ย้อนกลับ', 'back', 'slate'], ['หน้าหลัก', 'home', 'slate'], ['เล่น/หยุด', 'play', 'blue']] },
  light: { label: 'ไฟ', icon: 'light', buttons: [
    ['เปิด', 'bulb', 'amber'], ['ปิด', 'power', 'slate'], ['สว่างขึ้น', 'plus', 'amber'], ['หรี่ลง', 'minus', 'slate']] },
};

// ---------- state ----------
const state = {
  settings: {}, remotes: [], mqtt: { status: 'connecting' }, devices: [], instances: [], learning: [], history: [],
  selected: safeGet('selectedRemote'), editMode: false, filter: 'all', query: '',
};
let learnUi = null; // { device, remoteId, buttonId, endsAt, timer, phase }

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function safeGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function safeSet(k, v) { try { localStorage.setItem(k, v); } catch {} }

async function api(method, url, body) {
  const res = await fetch(url, { method, headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

const currentRemote = () => state.remotes.find((r) => r.id === state.selected) || state.remotes[0];
const deviceOf = (name) => state.devices.find((d) => d.name === name);

// ---------- toasts ----------
const hasPopover = 'popover' in HTMLElement.prototype;
function toast(msg, kind = 'ok', ms = 2600) {
  const el = document.createElement('div');
  el.className = `toast ${kind}`;
  el.setAttribute('role', kind === 'error' ? 'alert' : 'status');
  if (hasPopover) el.popover = 'manual';
  el.innerHTML = `<span class="t-dot"></span><span class="t-msg">${esc(msg)}</span><button class="t-close" aria-label="ปิด">&times;</button>`;
  $('#toasts').append(el);
  hasPopover ? el.showPopover() : el.classList.add('show');
  layoutToasts();
  const close = () => {
    hasPopover && el.matches(':popover-open') ? el.hidePopover() : el.classList.remove('show');
    setTimeout(() => { el.remove(); layoutToasts(); }, 220);
  };
  el.querySelector('.t-close').onclick = close;
  setTimeout(close, ms);
}
function layoutToasts() {
  let b = 20;
  [...$('#toasts').children].reverse().forEach((t) => { t.style.setProperty('--b', b + 'px'); b += t.offsetHeight + 8; });
}

// ---------- time formatting ----------
const rtf = new Intl.RelativeTimeFormat('th', { numeric: 'auto' });
function ago(iso) {
  if (!iso) return '';
  const s = (new Date(iso) - Date.now()) / 1000;
  if (Math.abs(s) < 45) return 'เมื่อสักครู่';
  if (Math.abs(s) < 3600) return rtf.format(Math.round(s / 60), 'minute');
  if (Math.abs(s) < 86400) return rtf.format(Math.round(s / 3600), 'hour');
  return rtf.format(Math.round(s / 86400), 'day');
}
const timeFmt = new Intl.DateTimeFormat('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
const dayFmt = new Intl.DateTimeFormat('th-TH', { weekday: 'short', day: 'numeric', month: 'short' });

// ---------- render: top + sidebar ----------
const MQTT_LABEL = { connected: 'เชื่อมต่อแล้ว', connecting: 'กำลังเชื่อมต่อ', disconnected: 'ไม่ได้เชื่อมต่อ' };
function renderStatus() {
  const pill = $('#mqttPill');
  pill.dataset.status = state.mqtt.status;
  pill.querySelector('.label').textContent = `MQTT · ${MQTT_LABEL[state.mqtt.status] || state.mqtt.status}`;
  pill.title = state.mqtt.error ? `ข้อผิดพลาด: ${state.mqtt.error}` : `${state.settings.mqttUrl || ''} (คลิกเพื่อตั้งค่า)`;
}

function renderSidebar() {
  const sel = currentRemote()?.id;
  $('#remoteList').innerHTML = state.remotes.length ? state.remotes.map((r) => {
    const learned = r.buttons.filter((b) => b.code).length;
    return `<button type="button" class="remote-item ${r.id === sel ? 'active' : ''}" data-id="${r.id}">
      <span class="ri-icon">${icon(r.icon || 'remote')}</span>
      <span class="ri-text"><div class="ri-name">${esc(r.name)}</div>
      <div class="ri-meta">${r.buttons.length} ปุ่ม · พร้อมใช้ ${learned}</div></span></button>`;
  }).join('') : '<div class="empty-mini">ยังไม่มีรีโมท กด "+ เพิ่ม" เพื่อเริ่ม</div>';

  $('#deviceList').innerHTML = state.devices.length ? state.devices.map((d) => {
    const av = d.availability === 'online' ? '<span class="badge on">ออนไลน์</span>'
      : d.availability === 'offline' ? '<span class="badge off">ออฟไลน์</span>' : '<span class="badge">พบแล้ว</span>';
    return `<li><span class="ri-icon">${icon('learn')}</span><div style="flex:1;min-width:0">
      <div class="dname">${esc(d.name)}</div><div class="dmeta">${esc(d.model || '')}${d.linkquality != null ? ` · LQI ${d.linkquality}` : ''}</div></div>${av}</li>`;
  }).join('') : emptyDevicesHtml();
}

function emptyDevicesHtml() {
  if (state.mqtt.status !== 'connected') return '<li class="empty-mini">เชื่อมต่อ MQTT เพื่อค้นหาอุปกรณ์</li>';
  const elsewhere = (state.instances || []).filter((i) => i.ir.length && i.base !== state.settings.baseTopic);
  const head = `<li class="empty-mini">ไม่พบอุปกรณ์ IR ใน base topic <b>${esc(state.settings.baseTopic)}</b></li>`;
  if (!elsewhere.length) {
    return head + `<li class="empty-mini">วิธีเพิ่ม: เปิดหน้า Zigbee2MQTT กด Permit join แล้วกดปุ่มรีเซ็ตบน ZS06 ค้างไว้จนไฟกะพริบ</li>`;
  }
  return head + elsewhere.map((i) => `<li class="suggest">
    <div style="flex:1;min-width:0"><div class="dname">พบ ${i.ir.length} เครื่องใน ${esc(i.base)}</div>
    <div class="dmeta">${i.ir.map(esc).join(', ')}</div></div>
    <button class="btn btn-sm btn-primary" type="button" data-switch-base="${esc(i.base)}">ใช้ชุดนี้</button></li>`).join('');
}

async function switchBase(base) {
  try {
    await api('PUT', '/api/settings', { baseTopic: base });
    toast(`สลับไปใช้ ${base} แล้ว กำลังค้นหาอุปกรณ์...`, 'info');
  } catch (err) { toast(err.message, 'error'); }
}

// ---------- render: main ----------
function renderMain() {
  const main = $('#main');
  const remote = currentRemote();
  if (!remote) return renderOnboarding(main);

  const dev = deviceOf(remote.device);
  const devBadge = !remote.device ? '<span class="badge off">ยังไม่เลือกอุปกรณ์</span>'
    : dev?.availability === 'online' ? `<span class="badge on">${esc(remote.device)} · ออนไลน์</span>`
    : dev?.availability === 'offline' ? `<span class="badge off">${esc(remote.device)} · ออฟไลน์</span>`
    : `<span class="badge">${esc(remote.device)}</span>`;
  const q = state.query.trim().toLowerCase();
  const buttons = remote.buttons.filter((b) => !q || b.name.toLowerCase().includes(q));
  const missing = remote.buttons.filter((b) => !b.code).length;

  main.innerHTML = `
    <div class="remote-header">
      <span class="rh-icon">${icon(remote.icon || 'remote')}</span>
      <div class="rh-title"><h1>${esc(remote.name)}</h1>
        <div class="rh-sub">${devBadge}<span>${remote.buttons.length} ปุ่ม${missing ? ` · รอเรียนรู้ ${missing}` : ''}</span></div></div>
      <div class="rh-actions"><button class="btn btn-ghost btn-sm" id="editRemoteBtn" type="button">${icon('edit')} แก้ไขรีโมท</button>
      <button class="btn btn-danger-ghost btn-sm" id="deleteRemoteBtn" type="button">${icon('trash')} ลบ</button></div>
    </div>
    <div class="toolbar">
      <label class="search"><input type="search" id="searchInput" placeholder="ค้นหาปุ่ม..." value="${esc(state.query)}" aria-label="ค้นหาปุ่ม"></label>
      <label class="toggle" title="เปิดเพื่อแก้ไข เรียนรู้ใหม่ ลบ หรือลากเพื่อจัดเรียงปุ่ม">
        <input type="checkbox" id="editToggle" ${state.editMode ? 'checked' : ''}> โหมดแก้ไข</label>
      <button class="btn btn-primary" id="addButtonBtn" type="button">${icon('plus')} เพิ่มปุ่ม</button>
    </div>
    <div class="button-grid ${state.editMode ? 'edit-mode' : ''}" id="grid">
      ${buttons.map(tileHtml).join('')}
      ${q ? '' : `<button type="button" class="add-tile" id="addTile">${icon('plus')}เพิ่มปุ่มใหม่</button>`}
    </div>`;
}

function tileHtml(b) {
  const inner = b.icon ? icon(b.icon) : `<span class="initial">${esc([...b.name][0] || '?')}</span>`;
  const meta = !b.code ? 'แตะเพื่อเรียนรู้' : b.pressCount ? `กดแล้ว ${b.pressCount} ครั้ง` : 'พร้อมใช้งาน';
  return `<div class="ir-btn ${b.code ? '' : 'no-code'}" role="button" tabindex="0" data-id="${b.id}"
      style="--c: var(--c-${COLORS.includes(b.color) ? b.color : 'slate'})" draggable="${state.editMode}"
      title="${b.code ? `กดเพื่อส่ง${b.lastPressedAt ? ' · ล่าสุด ' + ago(b.lastPressedAt) : ''}` : 'ยังไม่มีโค้ด IR'}">
    <span class="edit-tools">
      <button type="button" class="tool learn" data-act="learn" title="เรียนรู้ใหม่" aria-label="เรียนรู้ใหม่">${icon('learn')}</button>
      <button type="button" class="tool" data-act="edit" title="แก้ไข" aria-label="แก้ไข">${icon('edit')}</button>
    </span>
    <span class="b-icon">${inner}</span>
    <span class="b-name">${esc(b.name)}</span>
    <span class="b-meta">${meta}</span>
  </div>`;
}

function renderOnboarding(main) {
  const connected = state.mqtt.status === 'connected';
  const hasDev = state.devices.length > 0;
  main.innerHTML = `<div class="empty">
    <h1>ยินดีต้อนรับสู่ IR Remote</h1>
    <p>ควบคุมทีวี แอร์ พัดลม และอุปกรณ์อินฟราเรดทุกชนิดผ่าน ZS06 กับ Zigbee2MQTT ได้จากหน้านี้</p>
    <div class="steps">
      <div class="step ${connected ? 'done' : ''}"><b>${connected ? icon('check') : 1}</b><div>เชื่อมต่อ MQTT</div><span>${connected ? 'เรียบร้อย' : 'ใส่ที่อยู่ broker ในหน้าตั้งค่า'}</span></div>
      <div class="step ${hasDev ? 'done' : ''}"><b>${hasDev ? icon('check') : 2}</b><div>พบอุปกรณ์ ZS06</div><span>${hasDev ? `พบ ${state.devices.length} เครื่อง` : 'pair ZS06 เข้ากับ Zigbee2MQTT'}</span></div>
      <div class="step"><b>3</b><div>สร้างรีโมทและปุ่ม</div><span>เลือกแม่แบบ แล้วกดเรียนรู้ทีละปุ่ม</span></div>
    </div>
    ${connected ? '<button class="btn btn-primary" id="emptyAddRemote" type="button">สร้างรีโมทแรก</button>'
      : '<button class="btn btn-primary" id="emptySettings" type="button">ตั้งค่า MQTT</button>'}
  </div>`;
}

// ---------- render: history ----------
function renderHistory(newId) {
  const remote = currentRemote();
  let list = state.history;
  if (state.filter === 'remote') list = list.filter((h) => h.remoteId === remote?.id);
  if (state.filter === 'learn') list = list.filter((h) => h.type === 'learn');

  let lastDay = '';
  const html = [];
  for (const h of list.slice(0, 300)) {
    const d = new Date(h.ts);
    const day = d.toDateString();
    if (day !== lastDay) {
      lastDay = day;
      const isToday = day === new Date().toDateString();
      html.push(`<li class="day-sep">${isToday ? 'วันนี้' : dayFmt.format(d)}</li>`);
    }
    const learn = h.type === 'learn';
    const title = learn
      ? (h.ok ? `เรียนรู้ "${esc(h.buttonName)}" สำเร็จ` : `เรียนรู้ "${esc(h.buttonName)}" ${h.result === 'timeout' ? 'หมดเวลา' : 'ยกเลิก'}`)
      : `${esc(h.buttonName)}`;
    const sub = [h.remoteName, !h.ok && h.error ? h.error : '', h.source && h.source !== 'web' ? `จาก ${h.source}` : '']
      .filter(Boolean).map(esc).join(' · ');
    html.push(`<li class="${h.id === newId ? 'new' : ''}"><span class="h-dot ${learn ? 'learn' : ''} ${h.ok ? '' : 'err'}"></span>
      <div class="h-main"><div class="h-title">${title}</div><div class="h-sub">${sub}</div></div>
      <span class="h-time" title="${esc(d.toLocaleString('th-TH'))}">${timeFmt.format(d)}</span></li>`);
  }
  $('#historyList').innerHTML = html.join('') || '<li class="empty-mini">ยังไม่มีประวัติ ลองกดปุ่มดูสิ</li>';

  // stats: today presses, most-used button, success rate
  const today = new Date().toDateString();
  const presses = state.history.filter((h) => h.type === 'press');
  const todayCount = presses.filter((h) => h.ok && new Date(h.ts).toDateString() === today).length;
  const counts = {};
  presses.forEach((h) => { if (h.ok) counts[h.buttonName] = (counts[h.buttonName] || 0) + 1; });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const rate = presses.length ? Math.round(presses.filter((h) => h.ok).length / presses.length * 100) : null;
  $('#stats').innerHTML = `
    <div class="stat" title="จำนวนครั้งที่ส่งคำสั่งสำเร็จวันนี้"><div class="v">${todayCount}</div><div class="k">กดวันนี้</div></div>
    <div class="stat" title="ปุ่มที่ถูกกดบ่อยที่สุด (จากประวัติที่โหลด)"><div class="v small">${top ? esc(top[0]) : '-'}</div><div class="k">ใช้บ่อยสุด</div></div>
    <div class="stat" title="สัดส่วนคำสั่งที่ส่งถึง MQTT broker สำเร็จ"><div class="v">${rate == null ? '-' : rate + '%'}</div><div class="k">สำเร็จ</div></div>`;
}

function renderAll() { renderStatus(); renderSidebar(); renderMain(); renderHistory(); }

// ---------- actions ----------
async function press(remote, button, tile) {
  if (!button.code) return startLearn(remote, button);
  tile?.classList.remove('sending', 'flash-ok', 'flash-err');
  void tile?.offsetWidth;
  tile?.classList.add('sending');
  if (navigator.vibrate) navigator.vibrate(15);
  try {
    await api('POST', `/api/remotes/${remote.id}/buttons/${button.id}/press`, {});
    tile?.classList.add('flash-ok');
  } catch (err) {
    tile?.classList.add('flash-err');
    toast(err.message, 'error', 4000);
  }
  setTimeout(() => tile?.classList.remove('flash-ok', 'flash-err'), 700);
}

async function startLearn(remote, button) {
  if (!remote.device) {
    toast('กรุณาเลือกอุปกรณ์ ZS06 ให้รีโมทนี้ก่อน', 'error');
    return openRemoteDialog(remote);
  }
  learnUi = { device: remote.device, remoteId: remote.id, buttonId: button.id, name: button.name, phase: 'starting' };
  renderLearn();
  $('#learnDialog').showModal();
  try {
    await api('POST', `/api/remotes/${remote.id}/buttons/${button.id}/learn`, {});
  } catch (err) {
    learnUi.phase = 'error';
    learnUi.error = err.message;
    renderLearn();
  }
}

function onLearnEvent(evt) {
  if (!learnUi || evt.device !== learnUi.device) {
    if (evt.state === 'success') toast('บันทึกโค้ด IR ใหม่แล้ว');
    return;
  }
  clearInterval(learnUi.timer);
  if (evt.state === 'started') {
    learnUi.phase = 'listening';
    learnUi.total = evt.timeoutMs;
    learnUi.endsAt = Date.now() + evt.timeoutMs;
    learnUi.timer = setInterval(renderLearnCountdown, 250);
  } else {
    learnUi.phase = evt.state; // success | timeout | cancelled
  }
  renderLearn();
  if (evt.state === 'cancelled') closeLearn();
}

function renderLearn() {
  const u = learnUi;
  if (!u) return;
  const C = 2 * Math.PI * 60;
  const ring = `<svg class="ring" viewBox="0 0 132 132"><circle class="track" cx="66" cy="66" r="60"/>
    <circle class="prog" cx="66" cy="66" r="60" stroke-dasharray="${C}" stroke-dashoffset="0" id="learnProg"/></svg>`;
  let body;
  if (u.phase === 'starting' || u.phase === 'listening') {
    body = `<div class="learn-visual">${ring}<div class="core waves">${icon('learn')}</div><span class="count" id="learnCount"></span></div>
      <h3 id="learnTitle">กำลังรอสัญญาณ IR</h3>
      <p class="muted">ปุ่ม <b>${esc(u.name)}</b></p>
      <ol class="steps-inline">
        <li>หันรีโมทตัวจริงไปที่ ZS06 ระยะประมาณ 5-15 ซม.</li>
        <li>กดปุ่ม "${esc(u.name)}" บนรีโมท 1 ครั้ง (ไม่ต้องกดค้าง)</li>
        <li>ไฟบน ZS06 จะดับเมื่อรับสัญญาณได้</li>
      </ol>
      <div class="dialog-actions"><button class="btn btn-ghost" type="button" data-learn="cancel">ยกเลิก</button></div>`;
  } else if (u.phase === 'success') {
    body = `<div class="learn-visual"><div class="core ok">${icon('check')}</div></div>
      <h3 id="learnTitle">เรียนรู้สำเร็จ</h3>
      <p class="muted">บันทึกโค้ดของปุ่ม <b>${esc(u.name)}</b> แล้ว ลองกดทดสอบได้เลย</p>
      <div class="dialog-actions">
        <button class="btn btn-ghost" type="button" data-learn="retry">เรียนรู้ใหม่</button>
        <button class="btn btn-accent" type="button" data-learn="test">ทดสอบส่ง</button>
        <button class="btn btn-primary" type="button" data-learn="close">เสร็จสิ้น</button>
      </div>`;
  } else {
    const msg = u.phase === 'timeout'
      ? 'ไม่ได้รับสัญญาณภายในเวลาที่กำหนด ตรวจสอบว่าหันรีโมทถูกทิศและ ZS06 ออนไลน์อยู่'
      : (u.error || 'เกิดข้อผิดพลาด');
    body = `<div class="learn-visual"><div class="core fail">${icon('x')}</div></div>
      <h3 id="learnTitle">${u.phase === 'timeout' ? 'หมดเวลา' : 'เริ่มเรียนรู้ไม่ได้'}</h3>
      <p class="muted">${esc(msg)}</p>
      <div class="dialog-actions">
        <button class="btn btn-ghost" type="button" data-learn="close">ปิด</button>
        <button class="btn btn-primary" type="button" data-learn="retry">ลองอีกครั้ง</button>
      </div>`;
  }
  $('#learnBody').innerHTML = body;
  renderLearnCountdown();
}

function renderLearnCountdown() {
  const u = learnUi;
  const prog = document.getElementById('learnProg');
  const count = document.getElementById('learnCount');
  if (!u || !prog || u.phase !== 'listening') { if (count) count.textContent = 'กำลังเริ่ม...'; return; }
  const left = Math.max(0, u.endsAt - Date.now());
  const C = 2 * Math.PI * 60;
  prog.style.strokeDashoffset = String(C * (1 - left / u.total));
  count.textContent = `${Math.ceil(left / 1000)} วินาที`;
}

function closeLearn() {
  if (learnUi) clearInterval(learnUi.timer);
  learnUi = null;
  $('#learnDialog').close();
}

$('#learnBody').addEventListener('click', async (e) => {
  const act = e.target.closest('[data-learn]')?.dataset.learn;
  if (!act || !learnUi) return;
  const remote = state.remotes.find((r) => r.id === learnUi.remoteId);
  const button = remote?.buttons.find((b) => b.id === learnUi.buttonId);
  if (act === 'cancel') {
    await api('POST', '/api/learn/cancel', { device: learnUi.device }).catch(() => {});
    closeLearn();
  } else if (act === 'close') closeLearn();
  else if (act === 'retry' && remote && button) { clearInterval(learnUi.timer); startLearn(remote, button); }
  else if (act === 'test' && remote && button) {
    press(remote, button);
    toast(`ส่ง "${button.name}" แล้ว`);
  }
});
$('#learnDialog').addEventListener('cancel', (e) => {
  // Esc during listening = cancel the learn session on the device too
  if (learnUi?.phase === 'listening') api('POST', '/api/learn/cancel', { device: learnUi.device }).catch(() => {});
  if (learnUi) clearInterval(learnUi.timer);
  learnUi = null;
});

// ---------- dialogs ----------
function lightDismissFallback(dialog) {
  if ('closedBy' in HTMLDialogElement.prototype) return;
  dialog.addEventListener('click', (e) => {
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (r.top <= e.clientY && e.clientY <= r.bottom && r.left <= e.clientX && e.clientX <= r.right) return;
    dialog.close('cancel');
  });
}
document.querySelectorAll('dialog[closedby="any"]').forEach(lightDismissFallback);

function choiceRow(el, items, selected, render) {
  el.innerHTML = items.map((v) => render(v, v === selected)).join('');
  el.onclick = (e) => {
    const b = e.target.closest('.choice');
    if (!b) return;
    el.querySelectorAll('.choice').forEach((c) => c.classList.toggle('selected', c === b));
    el.dataset.value = b.dataset.v;
    el.dispatchEvent(new Event('change'));
  };
  el.dataset.value = selected;
}

function confirmBox(title, text) {
  const d = $('#confirmDialog');
  $('#confirmTitle').textContent = title;
  $('#confirmText').textContent = text;
  d.returnValue = '';
  d.showModal();
  return new Promise((resolve) => d.addEventListener('close', () => resolve(d.returnValue === 'ok'), { once: true }));
}

// remote dialog
function openRemoteDialog(remote) {
  const d = $('#remoteDialog');
  const f = $('#remoteForm');
  $('#remoteDialogTitle').textContent = remote ? 'แก้ไขรีโมท' : 'เพิ่มรีโมท';
  f.name.value = remote?.name || '';
  const devs = state.devices.map((x) => x.name);
  if (remote?.device && !devs.includes(remote.device)) devs.unshift(remote.device);
  f.device.innerHTML = `<option value="">-- เลือกอุปกรณ์ --</option>` +
    devs.map((n) => `<option ${n === (remote?.device ?? devs[0]) ? 'selected' : ''}>${esc(n)}</option>`).join('');
  if (!remote && devs.length === 1) f.device.value = devs[0];

  const iconEl = $('#remoteIconChoices');
  choiceRow(iconEl, REMOTE_ICONS, remote?.icon || 'tv', (v, s) =>
    `<button type="button" class="choice ${s ? 'selected' : ''}" data-v="${v}" aria-label="${v}">${icon(v)}</button>`);

  $('#presetField').hidden = !!remote;
  const presetEl = $('#presetChoices');
  presetEl.dataset.value = 'blank';
  presetEl.innerHTML = Object.entries(PRESETS).map(([k, p]) =>
    `<button type="button" class="preset ${k === 'blank' ? 'selected' : ''}" data-k="${k}">${p.label}${p.buttons.length ? ` (${p.buttons.length})` : ''}</button>`).join('');
  presetEl.onclick = (e) => {
    const b = e.target.closest('.preset');
    if (!b) return;
    presetEl.querySelectorAll('.preset').forEach((x) => x.classList.toggle('selected', x === b));
    presetEl.dataset.value = b.dataset.k;
    const p = PRESETS[b.dataset.k];
    choiceRow(iconEl, REMOTE_ICONS, p.icon, (v, s) =>
      `<button type="button" class="choice ${s ? 'selected' : ''}" data-v="${v}" aria-label="${v}">${icon(v)}</button>`);
    if (!f.name.value.trim() && b.dataset.k !== 'blank') f.name.value = p.label;
  };

  d.returnValue = '';
  d.showModal();
  d.onclose = async () => {
    if (d.returnValue !== 'ok') return;
    const body = { name: f.name.value, device: f.device.value, icon: iconEl.dataset.value };
    try {
      if (remote) {
        await api('PATCH', `/api/remotes/${remote.id}`, body);
        toast('บันทึกรีโมทแล้ว');
      } else {
        const preset = PRESETS[presetEl.dataset.value];
        body.buttons = preset.buttons.map(([name, ic, color]) => ({ name, icon: ic, color }));
        const created = await api('POST', '/api/remotes', body);
        selectRemote(created.id);
        toast(`สร้าง "${created.name}" แล้ว${body.buttons.length ? ' แตะปุ่มเพื่อเริ่มเรียนรู้' : ''}`, 'ok', 3500);
      }
    } catch (err) { toast(err.message, 'error'); }
  };
}

// button dialog
function openButtonDialog(remote, button) {
  const d = $('#buttonDialog');
  const f = $('#buttonForm');
  $('#buttonDialogTitle').textContent = button ? 'แก้ไขปุ่ม' : 'เพิ่มปุ่ม';
  f.name.value = button?.name || '';
  f.code.value = button?.code || '';
  f.querySelector('.advanced').open = false;
  $('#deleteButtonBtn').hidden = !button;
  $('#saveLearnBtn').textContent = button?.code ? 'บันทึกและเรียนรู้ใหม่' : 'บันทึกและเรียนรู้';

  const iconEl = $('#buttonIconChoices');
  const colorEl = $('#colorChoices');
  choiceRow(iconEl, BUTTON_ICONS, button?.icon || '', (v, s) =>
    `<button type="button" class="choice ${s ? 'selected' : ''} ${v ? '' : 'text'}" data-v="${v}" title="${v || 'ตัวอักษรแรก'}">${v ? icon(v) : 'Aa'}</button>`);
  choiceRow(colorEl, COLORS, button?.color || 'slate', (v, s) =>
    `<button type="button" class="choice swatch ${s ? 'selected' : ''}" data-v="${v}" style="--c: var(--c-${v})" aria-label="${v}"></button>`);

  const preview = () => {
    $('#buttonPreview').innerHTML = tileHtml({ name: f.name.value || 'ชื่อปุ่ม', icon: iconEl.dataset.value,
      color: colorEl.dataset.value, code: f.code.value || button?.code || 'x', pressCount: 0 });
  };
  f.name.oninput = preview;
  iconEl.onchange = preview;
  colorEl.onchange = preview;
  preview();

  $('#deleteButtonBtn').onclick = async () => {
    d.close();
    if (await confirmBox('ลบปุ่มนี้?', `ปุ่ม "${button.name}" และโค้ด IR ที่บันทึกไว้จะถูกลบ (ประวัติยังคงอยู่)`)) {
      await api('DELETE', `/api/remotes/${remote.id}/buttons/${button.id}`).catch((e) => toast(e.message, 'error'));
      toast('ลบปุ่มแล้ว');
    }
  };

  d.returnValue = '';
  d.showModal();
  d.onclose = async () => {
    if (d.returnValue !== 'ok' && d.returnValue !== 'learn') return;
    const body = { name: f.name.value, icon: iconEl.dataset.value, color: colorEl.dataset.value, code: f.code.value };
    try {
      const saved = button
        ? await api('PATCH', `/api/remotes/${remote.id}/buttons/${button.id}`, body)
        : await api('POST', `/api/remotes/${remote.id}/buttons`, body);
      if (d.returnValue === 'learn') startLearn(remote, saved);
      else toast(button ? 'บันทึกปุ่มแล้ว' : `เพิ่มปุ่ม "${saved.name}" แล้ว`);
    } catch (err) { toast(err.message, 'error'); }
  };
}

// settings dialog
function openSettings() {
  const d = $('#settingsDialog');
  const f = $('#settingsForm');
  for (const k of ['mqttUrl', 'username', 'password', 'baseTopic']) f[k].value = state.settings[k] || '';
  const inst = state.instances || [];
  $('#baseChoices').innerHTML = inst.length ? inst.map((i) =>
    `<button type="button" class="preset ${i.base === state.settings.baseTopic ? 'selected' : ''}" data-base="${esc(i.base)}"
      title="${i.devices} อุปกรณ์${i.ir.length ? ' · IR: ' + esc(i.ir.join(', ')) : ''}">${esc(i.base)}${i.ir.length ? ` · IR ${i.ir.length}` : ''}</button>`).join('') : '';
  $('#baseChoices').onclick = (e) => {
    const b = e.target.closest('[data-base]');
    if (!b) return;
    f.baseTopic.value = b.dataset.base;
    $('#baseChoices').querySelectorAll('.preset').forEach((x) => x.classList.toggle('selected', x === b));
  };
  d.returnValue = '';
  d.showModal();
  d.onclose = async () => {
    if (d.returnValue !== 'ok') return;
    try {
      await api('PUT', '/api/settings', Object.fromEntries(new FormData(f)));
      toast('บันทึกแล้ว กำลังเชื่อมต่อใหม่...', 'info');
    } catch (err) { toast(err.message, 'error'); }
  };
}

$('#importInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    $('#settingsDialog').close();
    if (!(await confirmBox('นำเข้าข้อมูล?', `รีโมททั้งหมดตอนนี้จะถูกแทนที่ด้วย ${data.remotes?.length ?? 0} รีโมทจากไฟล์`))) return;
    const r = await api('POST', '/api/import', data);
    toast(`นำเข้า ${r.count} รีโมทแล้ว`);
  } catch (err) { toast('นำเข้าไม่สำเร็จ: ' + err.message, 'error'); }
});

// ---------- event wiring ----------
function selectRemote(id) {
  state.selected = id;
  state.query = '';
  safeSet('selectedRemote', id);
  renderSidebar(); renderMain(); renderHistory();
}

$('#remoteList').addEventListener('click', (e) => {
  const item = e.target.closest('.remote-item');
  if (item) selectRemote(item.dataset.id);
});
$('#addRemoteBtn').onclick = () => openRemoteDialog();
$('#deviceList').addEventListener('click', (e) => {
  const b = e.target.closest('[data-switch-base]');
  if (b) switchBase(b.dataset.switchBase);
});
$('#settingsBtn').onclick = openSettings;
$('#mqttPill').onclick = openSettings;
$('#historyFilter').addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  state.filter = b.dataset.filter;
  $('#historyFilter').querySelectorAll('button').forEach((x) => x.classList.toggle('active', x === b));
  renderHistory();
});
$('#clearHistoryBtn').onclick = async () => {
  if (await confirmBox('ล้างประวัติทั้งหมด?', 'ประวัติการกดและการเรียนรู้ทั้งหมดจะถูกลบถาวร แนะนำให้ดาวน์โหลด CSV เก็บไว้ก่อน')) {
    await api('DELETE', '/api/history');
  }
};

const main = $('#main');
main.addEventListener('click', async (e) => {
  const remote = currentRemote();
  if (e.target.closest('#emptyAddRemote')) return openRemoteDialog();
  if (e.target.closest('#emptySettings')) return openSettings();
  if (!remote) return;
  if (e.target.closest('#addButtonBtn') || e.target.closest('#addTile')) return openButtonDialog(remote);
  if (e.target.closest('#editRemoteBtn')) return openRemoteDialog(remote);
  if (e.target.closest('#deleteRemoteBtn')) {
    if (await confirmBox(`ลบรีโมท "${remote.name}"?`, `ปุ่มทั้ง ${remote.buttons.length} ปุ่มและโค้ด IR จะถูกลบ (ประวัติยังคงอยู่)`)) {
      await api('DELETE', `/api/remotes/${remote.id}`).catch((err) => toast(err.message, 'error'));
      toast('ลบรีโมทแล้ว');
    }
    return;
  }
  const tile = e.target.closest('.ir-btn');
  if (!tile) return;
  const button = remote.buttons.find((b) => b.id === tile.dataset.id);
  if (!button) return;
  const act = e.target.closest('[data-act]')?.dataset.act;
  if (act === 'learn') return startLearn(remote, button);
  if (act === 'edit' || state.editMode) return openButtonDialog(remote, button);
  press(remote, button, tile);
});
main.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList?.contains('ir-btn')) { e.preventDefault(); e.target.click(); }
});
main.addEventListener('input', (e) => {
  if (e.target.id !== 'searchInput') return;
  state.query = e.target.value;
  const pos = e.target.selectionStart;
  renderMain();
  const input = $('#searchInput');
  input.focus();
  input.setSelectionRange(pos, pos);
});
main.addEventListener('change', (e) => {
  if (e.target.id === 'editToggle') { state.editMode = e.target.checked; renderMain(); }
});

// drag to reorder (edit mode)
let dragId = null;
main.addEventListener('dragstart', (e) => {
  const tile = e.target.closest?.('.ir-btn');
  if (!tile || !state.editMode) return;
  dragId = tile.dataset.id;
  tile.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
});
main.addEventListener('dragover', (e) => {
  const tile = e.target.closest?.('.ir-btn');
  if (!dragId || !tile) return;
  e.preventDefault();
  main.querySelectorAll('.drop-target').forEach((t) => t !== tile && t.classList.remove('drop-target'));
  if (tile.dataset.id !== dragId) tile.classList.add('drop-target');
});
main.addEventListener('drop', async (e) => {
  const tile = e.target.closest?.('.ir-btn');
  const remote = currentRemote();
  if (!dragId || !tile || !remote) return;
  e.preventDefault();
  const ids = remote.buttons.map((b) => b.id).filter((i) => i !== dragId);
  ids.splice(ids.indexOf(tile.dataset.id), 0, dragId);
  remote.buttons.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  renderMain();
  await api('PUT', `/api/remotes/${remote.id}/order`, { order: ids }).catch((err) => toast(err.message, 'error'));
});
main.addEventListener('dragend', () => {
  dragId = null;
  main.querySelectorAll('.dragging, .drop-target').forEach((t) => t.classList.remove('dragging', 'drop-target'));
});

// ---------- live updates (SSE) ----------
function connectEvents() {
  const es = new EventSource('/api/events');
  es.addEventListener('snapshot', (e) => {
    Object.assign(state, JSON.parse(e.data));
    renderAll();
  });
  es.addEventListener('remotes', (e) => {
    state.remotes = JSON.parse(e.data);
    renderSidebar(); renderMain();
  });
  es.addEventListener('mqtt', (e) => {
    const prev = state.mqtt.status;
    state.mqtt = JSON.parse(e.data);
    renderStatus();
    if (prev !== state.mqtt.status && state.mqtt.status === 'connected') toast('เชื่อมต่อ MQTT แล้ว');
    if (!state.remotes.length) renderMain();
    renderSidebar();
  });
  es.addEventListener('devices', (e) => {
    state.devices = JSON.parse(e.data);
    renderSidebar();
    if (currentRemote() || !state.remotes.length) renderMain();
  });
  es.addEventListener('settings', (e) => { state.settings = JSON.parse(e.data); renderStatus(); renderSidebar(); });
  es.addEventListener('instances', (e) => { state.instances = JSON.parse(e.data); renderSidebar(); });
  es.addEventListener('learn', (e) => onLearnEvent(JSON.parse(e.data)));
  es.addEventListener('history', (e) => {
    const h = JSON.parse(e.data);
    state.history.unshift(h);
    state.history.length = Math.min(state.history.length, 1000);
    renderHistory(h.id);
  });
  es.addEventListener('history-cleared', () => { state.history = []; renderHistory(); toast('ล้างประวัติแล้ว'); });
  es.onerror = () => { state.mqtt = { status: 'disconnected', error: 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้' }; renderStatus(); };
}

async function init() {
  try { state.history = await api('GET', '/api/history?limit=1000'); } catch {}
  connectEvents();
  setInterval(() => renderHistory(), 60000);
}
init();
