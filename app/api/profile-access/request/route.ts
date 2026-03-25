import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { createProfileToken } from '@/lib/profile-token';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json() as { email?: string };

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const { data } = await supabase
      .from('nurit_subscribers')
      .select('email')
      .eq('email', email)
      .limit(1);

    if (data && data.length > 0) {
      const token = createProfileToken(email);
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rjnsheichabad.com';
      const profileUrl = `${siteUrl}/manage-profile?token=${encodeURIComponent(token)}`;

      await resend.emails.send({
        from: "NURIT Website <noreply@shabbathub.com>",
        to: email,
        subject: 'Your NURIT profile edit link',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:24px;">
            <h2 style="color:#8c4a6b;">Edit your NURIT profile</h2>
            <p>Use the secure link below to review and update your registration details.</p>
            <p><a href="${profileUrl}" style="display:inline-block;padding:14px 22px;border-radius:10px;background:#8c4a6b;color:#fff;text-decoration:none;font-weight:700;">Open profile</a></p>
            <p style="color:#6b5a4e;">This link expires in 24 hours.</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Profile access request error:', error);
    return NextResponse.json({ error: 'Failed to send profile link.' }, { status: 500 });
  }
}
