# IR Remote (ZS06 · Zigbee2MQTT)

เว็บสำหรับสร้างปุ่มรีโมท เรียนรู้โค้ด IR สั่งงาน และเก็บประวัติการกด ผ่าน MQTT สำหรับ Tuya ZS06 (และอุปกรณ์ IR ใน Zigbee2MQTT ที่มี `ir_code_to_send`)

## เริ่มใช้งาน

ต้องมี Node.js 18 ขึ้นไป

```bash
npm install
npm start            # เปิด http://localhost:3000
```

ครั้งแรกให้กดปุ่มสถานะ MQTT มุมขวาบน แล้วใส่ที่อยู่ broker ตัวเดียวกับที่ Zigbee2MQTT ใช้ เช่น `mqtt://192.168.1.10:1883` ระบบจะค้นหา ZS06 ให้อัตโนมัติจาก `zigbee2mqtt/bridge/devices`

ตั้งค่าเริ่มต้นผ่าน environment ได้: `PORT`, `MQTT_URL`, `MQTT_USER`, `MQTT_PASS`, `BASE_TOPIC`, `DATA_DIR`

### ลองโดยไม่มีอุปกรณ์จริง

```bash
npm run demo         # broker จำลอง + ZS06 จำลอง 2 ตัว, ข้อมูลแยกไว้ที่ data-demo/
npm test             # ทดสอบ end-to-end: สร้าง > เรียนรู้ > เรียนรู้ซ้ำ > กด > ประวัติ
```

## วิธีใช้

1. **เพิ่มรีโมท** เลือกอุปกรณ์ ZS06 และแม่แบบ (ทีวี แอร์ พัดลม กล่องทีวี ไฟ) ระบบสร้างปุ่มพื้นฐานไว้ให้
2. **เรียนรู้** แตะปุ่มที่ยังไม่มีโค้ด (ขอบเส้นประ) หันรีโมทจริงไปที่ ZS06 แล้วกดภายใน 30 วินาที
3. **สั่งงาน** แตะปุ่มเพื่อส่ง IR ทุกการกดจะถูกบันทึกในแผงประวัติทันที
4. **โหมดแก้ไข** เปลี่ยนชื่อ ไอคอน สี เรียนรู้ใหม่ ลบ หรือลากเพื่อจัดเรียงปุ่ม

## การเก็บข้อมูล (NoSQL แบบไฟล์ JSON)

| ไฟล์ | เนื้อหา |
|---|---|
| `data/db.json` | ตั้งค่า MQTT, รีโมท, ปุ่ม, โค้ด IR, จำนวนครั้งที่กด (เขียนแบบ atomic) |
| `data/history.jsonl` | ประวัติทุกการกดและการเรียนรู้ หนึ่งบรรทัดต่อหนึ่งเหตุการณ์ (append-only) |

สำรองได้ด้วยการคัดลอกโฟลเดอร์ `data/` หรือกด "ส่งออก" ในหน้าตั้งค่า ส่วนประวัติดาวน์โหลดเป็น CSV (เปิดใน Excel ได้ภาษาไทยไม่เพี้ยน)

## MQTT ที่ใช้

| ทิศทาง | Topic | Payload |
|---|---|---|
| ส่ง IR | `zigbee2mqtt/<ชื่ออุปกรณ์>/set` | `{"ir_code_to_send": "<code>"}` |
| เริ่มเรียนรู้ | `zigbee2mqtt/<ชื่ออุปกรณ์>/set` | `{"learn_ir_code": "ON"}` |
| รับโค้ดที่เรียนรู้ | `zigbee2mqtt/<ชื่ออุปกรณ์>` | `{"learned_ir_code": "<code>", ...}` |
| ค้นหาอุปกรณ์ | `zigbee2mqtt/bridge/devices` | รายการอุปกรณ์ (กรองตัวที่มี `ir_code_to_send`) |
| สถานะออนไลน์ | `zigbee2mqtt/<ชื่ออุปกรณ์>/availability` | `{"state":"online"}` (ต้องเปิด availability ใน Z2M) |

## HTTP API (ใช้กับ automation อื่นได้)

```bash
# กดปุ่มจากระบบอื่น เช่น Home Assistant, Node-RED, cron
curl -X POST http://localhost:3000/api/remotes/<remoteId>/buttons/<buttonId>/press \
     -H "Content-Type: application/json" -d '{"source":"homeassistant"}'
```

| Method | Path | หน้าที่ |
|---|---|---|
| GET | `/api/state` | ข้อมูลทั้งหมด (รีโมท, อุปกรณ์, สถานะ MQTT) |
| GET | `/api/events` | Server-Sent Events แบบ real-time |
| POST/PATCH/DELETE | `/api/remotes[/:id]` | จัดการรีโมท |
| POST/PATCH/DELETE | `/api/remotes/:id/buttons[/:bid]` | จัดการปุ่ม |
| POST | `.../buttons/:bid/press` | ส่ง IR และบันทึกประวัติ |
| POST | `.../buttons/:bid/learn` | เริ่มเรียนรู้ (ผลลัพธ์ส่งทาง SSE) |
| GET | `/api/history?limit=&remoteId=&type=` | ประวัติ (`type` = press, learn) |
| GET | `/api/history.csv` | ดาวน์โหลดประวัติ |
| GET / POST | `/api/export`, `/api/import` | สำรองและกู้คืนรีโมท |

## ข้อควรทราบ

- **ไม่มีระบบล็อกอิน** ออกแบบให้ใช้ในวง LAN ถ้าจะเปิดออกอินเทอร์เน็ต ให้วางหลัง reverse proxy ที่มี auth หรือ VPN
- รหัสผ่าน MQTT เก็บใน `data/db.json` แบบข้อความธรรมดา (API ไม่ส่งรหัสกลับไปหน้าเว็บ)
- การตรวจจับผลการเรียนรู้ดูจาก `learned_ir_code` ที่ **เปลี่ยนไป** ถ้าเรียนรู้ปุ่มเดิมซ้ำแล้วได้โค้ดเหมือนเดิมทุกไบต์ ระบบจะรอจนหมดเวลา (โค้ดเดิมยังใช้ได้) หรือวางโค้ดเองในช่อง "โค้ด IR (ขั้นสูง)" ได้
- ประวัติ `success` หมายถึงส่งถึง MQTT broker สำเร็จ ZS06 ไม่ส่งการยืนยันกลับว่าเครื่องปลายทางรับสัญญาณ
- ZS06 ส่งได้ทีละคำสั่ง ถ้ากดถี่มากบางคำสั่งอาจหลุด
