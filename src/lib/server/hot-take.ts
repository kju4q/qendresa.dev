import "server-only";

import crypto from "crypto";

const DEFAULT_SALT = "qendresa-hot-take-salt";

export function getUserHash(anonId: string): string {
  const salt = process.env.HOT_TAKE_SALT || DEFAULT_SALT;
  return crypto.createHash("sha256").update(`${anonId}:${salt}`).digest("hex");
}

export function getWeekStartUtc(date: Date = new Date()): string {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = utc.getUTCDay(); // 0 Sunday - 6 Saturday
  const diff = day === 0 ? -6 : 1 - day; // Monday start
  utc.setUTCDate(utc.getUTCDate() + diff);
  return utc.toISOString().slice(0, 10);
}

export function sanitizeHotTake(input: string): string {
  return input.replace(/[<>]/g, "").trim();
}
