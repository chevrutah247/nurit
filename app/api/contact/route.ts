import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'NURIT Website <noreply@shabbathub.com>',
        to: 'chevrutah24x7@gmail.com',
        subject: `NURIT: message from ${name}`,
        ...(isEmail ? { reply_to: email } : {}),
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
            <h2 style="color:#8c4a6b;">New message from NURIT website</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <hr style="border:none;border-top:1px solid #eee;margin:16px 0;">
            <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
