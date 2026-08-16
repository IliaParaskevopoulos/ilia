// Signed, stateless session tokens ("<payload>.<hmac-hex>"), verifiable
// with Web Crypto so the same code works in both the edge proxy and
// regular Node route handlers/server components — no DB round trip
// needed just to check "is this cookie valid".

async function hmacHex(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Buffer.from(sig).toString("hex");
}

export async function signToken(payload: string, secret: string): Promise<string> {
  const sig = await hmacHex(payload, secret);
  return `${payload}.${sig}`;
}

export async function verifyToken(
  token: string | undefined | null,
  secret: string
): Promise<string | null> {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await hmacHex(payload, secret);
  if (sig.length !== expected.length) return null;
  // Constant-time-ish comparison; both are hex of fixed length here.
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0 ? payload : null;
}
