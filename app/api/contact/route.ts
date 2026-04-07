import { NextRequest, NextResponse } from 'next/server';
import { createToken, escapeHtml } from '@/lib/contact-token';

const MIN_FORM_FILL_TIME_MS = 3000; // bots usually submit instantly
const MAX_NAME_LEN = 100;
const MAX_EMAIL_LEN = 200;
const MAX_MESSAGE_LEN = 5000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, website, formStartedAt } = body;

    // 1. Honeypot — bots fill hidden fields
    if (website && typeof website === 'string' && website.length > 0) {
      // Pretend success so the bot doesn't retry
      return NextResponse.json({ success: true, verification: 'sent' });
    }

    // 2. Time check — bots submit instantly
    if (formStartedAt && typeof formStartedAt === 'number') {
      const elapsed = Date.now() - formStartedAt;
      if (elapsed < MIN_FORM_FILL_TIME_MS) {
        return NextResponse.json({ success: true, verification: 'sent' });
      }
    }

    // 3. Required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // 4. Length limits
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      name.length > MAX_NAME_LEN ||
      email.length > MAX_EMAIL_LEN ||
      message.length > MAX_MESSAGE_LEN
    ) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // 5. Valid email
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmail) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // 6. Generate verification token
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    const token = createToken({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    const origin = request.headers.get('origin') || 'https://nurit.org';
    const verifyUrl = `${origin}/api/contact/verify?t=${encodeURIComponent(token)}`;

    // 7. Send verification email TO the sender
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'NURIT Website <noreply@shabbathub.com>',
        to: email.trim(),
        subject: 'Подтвердите отправку сообщения / Confirm your NURIT message',
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#fff;border-radius:12px;border:1px solid #eee;">
            <div style="text-align:center;margin-bottom:24px;">
              <h2 style="color:#8c4a6b;margin:0 0 8px;">NURIT</h2>
              <p style="color:#999;font-size:13px;margin:0;">Russian Junior N'shei Chabad</p>
            </div>

            <p style="color:#333;font-size:15px;line-height:1.6;">
              Здравствуйте, <strong>${escapeHtml(name)}</strong>!<br>
              Hello, <strong>${escapeHtml(name)}</strong>!
            </p>

            <p style="color:#555;font-size:14px;line-height:1.6;">
              Чтобы мы получили ваше сообщение, нажмите на кнопку ниже и подтвердите свой email.
              Это нужно один раз, чтобы убедиться, что сообщение отправили именно вы.
            </p>
            <p style="color:#555;font-size:14px;line-height:1.6;">
              To deliver your message to NURIT, please click the button below to confirm your email.
              This is a one-time step to verify that you actually sent it.
            </p>

            <div style="text-align:center;margin:28px 0;">
              <a href="${verifyUrl}"
                 style="display:inline-block;background:#8c4a6b;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
                Подтвердить отправку / Confirm message
              </a>
            </div>

            <div style="background:#fafafa;border:1px solid #eee;border-radius:8px;padding:16px;margin-top:16px;">
              <p style="color:#888;font-size:12px;margin:0 0 8px;">Ваше сообщение / Your message:</p>
              <p style="color:#333;font-size:14px;white-space:pre-wrap;margin:0;">${escapeHtml(message)}</p>
            </div>

            <p style="color:#999;font-size:12px;line-height:1.5;margin-top:24px;">
              Ссылка действительна 1 час. Если вы не отправляли это сообщение — просто проигнорируйте письмо.<br>
              The link is valid for 1 hour. If you didn't send this message, just ignore this email.
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to send verification' }, { status: 500 });
    }

    return NextResponse.json({ success: true, verification: 'sent' });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
