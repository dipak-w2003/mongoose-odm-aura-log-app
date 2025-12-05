import { DateTime } from "luxon";

// 1️⃣ Display for users (Kathmandu)
export function formatFullDateTime(d: Date | string) {
  return DateTime.fromJSDate(new Date(d))
    .setZone("Asia/Kathmandu")
    .toFormat("yyyy-MM-dd HH:mm:ss");
}

// 2️⃣ Backend storage (ALWAYS UTC)
export function formatUTCISO(d: Date | string) {
  return DateTime.fromJSDate(new Date(d))
    .toUTC()
    .toISO({
      suppressMilliseconds: true,
      includeOffset: true,
    });
  // "2025-12-04T15:28:23+00:00"
}

// 3️⃣ ISO in Kathmandu (if needed for UI)
export function formatKathmanduISO(d: Date | string) {
  return DateTime.fromJSDate(new Date(d))
    .setZone("Asia/Kathmandu")
    .toISO({
      suppressMilliseconds: true,
      includeOffset: true,
    });
  // "2025-12-04T21:13:23+05:45"
}

export function DateStrToDateKTM(utcString: string) {
  if (!utcString) throw new Error("Invalid date string");

  // Convert UTC string → Kathmandu timezone
  const dtKTM = DateTime.fromISO(utcString).setZone("Asia/Kathmandu");

  return {
    luxon: dtKTM,          // Kathmandu Luxon DateTime
    js: dtKTM.toJSDate(),  // JavaScript Date (Kathmandu equivalent)
    formatted: dtKTM.toFormat("yyyy/MM/dd HH:mm"), // Pretty string
    isoKTM: dtKTM.toISO({ suppressMilliseconds: true }), // Kathmandu ISO
  };
}