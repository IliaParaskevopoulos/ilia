import { randomInt, createHash } from "crypto";

// Deliberately excludes visually-ambiguous characters (0/O, 1/I/L).
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

// Human-typeable access code, e.g. "NW7K-QP2M-3XRT". Not a password a
// user chose — a shared secret we generate and hand to the client.
export function generateAccessCode(): string {
  const chars = Array.from({ length: 12 }, () => ALPHABET[randomInt(ALPHABET.length)]);
  return `${chars.slice(0, 4).join("")}-${chars.slice(4, 8).join("")}-${chars.slice(8, 12).join("")}`;
}

export function hashAccessCode(code: string): string {
  return createHash("sha256").update(code.trim().toUpperCase()).digest("hex");
}
