import "server-only";

import crypto from "crypto";
import Anthropic from "@anthropic-ai/sdk";

const DEFAULT_SALT = "qendresa-hot-take-salt";

// Fast word-list check — words stored in env so they stay out of the public repo
function containsBlockedWord(text: string): boolean {
  const raw = process.env.HOT_TAKE_BLOCKED_WORDS ?? "";
  if (!raw) return false;
  const words = raw.split(",").map((w) => w.trim().toLowerCase()).filter(Boolean);
  const lower = text.toLowerCase().replace(/[^a-z0-9\s]/g, "");
  return words.some((word) => new RegExp(`\\b${word}\\b`).test(lower));
}

// Claude moderation — catches hate speech, harassment, and non-genuine submissions
async function checkWithClaude(text: string): Promise<boolean> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 5,
    messages: [
      {
        role: "user",
        content: `Should the following text be rejected from a public hot-takes board? Reject it if it is: hate speech, slurs, harassment, explicit sexual content, threats, a test/spam message, random/gibberish text, a single generic word (like "test", "hello", "hi", "ok"), or not a real opinion or statement. Reply only "yes" or "no".\n\nText: "${text}"`,
      },
    ],
  });
  const reply = (message.content[0] as { type: string; text: string }).text
    .trim()
    .toLowerCase();
  return reply.startsWith("yes");
}

// Returns a rejection reason or null if content is clean
export async function moderateHotTake(text: string): Promise<string | null> {
  if (containsBlockedWord(text)) {
    return "Your hot take contains inappropriate content.";
  }
  try {
    const flagged = await checkWithClaude(text);
    if (flagged) return "Your hot take contains inappropriate content.";
  } catch {
    // If Claude is unavailable, don't block the submission — word list already ran
  }
  return null;
}

export function getUserHash(anonId: string): string {
  const salt = process.env.HOT_TAKE_SALT || DEFAULT_SALT;
  return crypto.createHash("sha256").update(`${anonId}:${salt}`).digest("hex");
}

export function getWeekStartUtc(date: Date = new Date()): string {
  const utc = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const day = utc.getUTCDay(); // 0 Sunday - 6 Saturday
  const diff = day === 0 ? -6 : 1 - day; // Monday start
  utc.setUTCDate(utc.getUTCDate() + diff);
  return utc.toISOString().slice(0, 10);
}

export function sanitizeHotTake(input: string): string {
  return input.replace(/[<>]/g, "").trim();
}
