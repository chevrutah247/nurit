import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, escapeHtml } from '@/lib/contact-token';

const ADMIN_EMAIL = 'chevrutah24x7@gmail.com';

function htmlPage(title: string, body: string): NextResponse {
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8f5f1; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .card { max-width: 480px; background: #fff; border-radius: 16px; padding: 40px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.06); border: 1px solid #eee; }
    .icon { font-size: 56px; margin-bottom: 16px; }
    h1 { color: #8c4a6b; margin: 0 0 12px; font-size: 24px; }
    p { color: #555; line-height: 1.6; margin: 0 0 12px; font-size: 15px; }
    .small { color: #999; font-size: 13px; margin-top: 24px; }
    a.btn { display: inline-block; background: #8c4a6b; color: #fff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    ${body}
  </div>
</body>
</html>`,
    {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    }
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('t');

  if (!token) {
    return htmlPage(
      'Ошибка / Error',
      `<div class="icon">⚠️</div>
       <h1>Ссылка недействительна</h1>
       <p>Link is invalid or missing.</p>
       <a class="btn" href="/">На главную / Home</a>`
    );
  }

  const payload = verifyToken(token);
  if (!payload) {
    return htmlPage(
      'Ссылка недействительна / Invalid link',
      `<div class="icon">⏱️</div>
       <h1>Ссылка недействительна или истекла</h1>
       <p>The link is invalid or has expired (valid for 1 hour).</p>
       <p>Пожалуйста, отправьте сообщение ещё раз.<br>Please submit the message again.</p>
       <a class="btn" href="/developer-contact">Отправить заново / Submit again</a>`
    );
  }

  // Send the actual message to admin
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return htmlPage(
      'Ошибка сервера / Server error',
      `<div class="icon">⚠️</div>
       <h1>Ошибка сервера</h1>
       <p>Server configuration error. Please try again later.</p>`
    );
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'NURIT Website <noreply@shabbathub.com>',
        to: ADMIN_EMAIL,
        subject: `NURIT: message from ${payload.name}`,
        reply_to: payload.email,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
            <h2 style="color:#8c4a6b;">New verified message from NURIT website</h2>
            <p style="color:#0a8548;font-size:13px;">✓ Email verified</p>
            <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
            <hr style="border:none;border-top:1px solid #eee;margin:16px 0;">
            <p style="white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      return htmlPage(
        'Ошибка отправки / Send error',
        `<div class="icon">⚠️</div>
         <h1>Не удалось отправить</h1>
         <p>Failed to deliver the message. Please try again later.</p>`
      );
    }
  } catch {
    return htmlPage(
      'Ошибка сети / Network error',
      `<div class="icon">⚠️</div>
       <h1>Ошибка сети</h1>
       <p>Network error. Please try again later.</p>`
    );
  }

  return htmlPage(
    'Сообщение отправлено / Message sent',
    `<div class="icon">✅</div>
     <h1>Спасибо! Сообщение отправлено</h1>
     <p>Your message has been delivered to NURIT.</p>
     <p>Мы свяжемся с вами в ближайшее время.<br>We'll get back to you soon.</p>
     <a class="btn" href="/">На главную / Home</a>`
  );
}
