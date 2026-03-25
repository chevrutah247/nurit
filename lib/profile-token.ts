import { createHmac, timingSafeEqual } from 'crypto';

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24;

function getSecret() {
  return process.env.PROFILE_EDIT_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || 'nurit-profile-secret';
}

function toBase64Url(value: string) {
  return Buffer.from(value).toString('base64url');
}

function fromBase64Url(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

export function createProfileToken(email: string) {
  const payload = JSON.stringify({
    email,
    exp: Date.now() + TOKEN_TTL_MS,
  });

  const encodedPayload = toBase64Url(payload);
  const signature = createHmac('sha256', getSecret()).update(encodedPayload).digest('base64url');

  return `${encodedPayload}.${signature}`;
}

export function verifyProfileToken(token: string) {
  const [encodedPayload, signature] = token.split('.');

  if (!encodedPayload || !signature) {
    throw new Error('Invalid token.');
  }

  const expected = createHmac('sha256', getSecret()).update(encodedPayload).digest('base64url');
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    throw new Error('Invalid token.');
  }

  const payload = JSON.parse(fromBase64Url(encodedPayload)) as { email: string; exp: number };

  if (!payload.email || payload.exp < Date.now()) {
    throw new Error('Token expired.');
  }

  return payload;
}
