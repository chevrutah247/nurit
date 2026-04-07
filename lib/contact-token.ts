// Helpers for the email-verified contact form.
// We avoid persisting messages by signing them with HMAC and round-tripping
// the payload through the verification email link.

import crypto from 'crypto';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  ts: number;
}

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

function getSecret(): string {
  const secret = process.env.CONTACT_SECRET || process.env.RESEND_API_KEY;
  if (!secret) {
    throw new Error('CONTACT_SECRET or RESEND_API_KEY must be set');
  }
  return secret;
}

function base64UrlEncode(buf: Buffer): string {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): Buffer {
  const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  return Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/') + pad, 'base64');
}

function sign(payloadB64: string): string {
  return base64UrlEncode(
    crypto.createHmac('sha256', getSecret()).update(payloadB64).digest()
  );
}

export function createToken(payload: Omit<ContactPayload, 'ts'>): string {
  const full: ContactPayload = { ...payload, ts: Date.now() };
  const json = JSON.stringify(full);
  const payloadB64 = base64UrlEncode(Buffer.from(json, 'utf8'));
  const sig = sign(payloadB64);
  return `${payloadB64}.${sig}`;
}

export function verifyToken(token: string): ContactPayload | null {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadB64, sig] = parts;

  const expected = sign(payloadB64);
  // Constant-time compare
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return null;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;

  let payload: ContactPayload;
  try {
    payload = JSON.parse(base64UrlDecode(payloadB64).toString('utf8'));
  } catch {
    return null;
  }

  if (!payload.ts || Date.now() - payload.ts > TOKEN_TTL_MS) return null;
  if (!payload.name || !payload.email || !payload.message) return null;

  return payload;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
