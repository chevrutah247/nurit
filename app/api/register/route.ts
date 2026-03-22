import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, birthday } = await request.json();

    if (!name || !email || !birthday) {
      return NextResponse.json(
        { error: 'Name, email, and birthday are required.' },
        { status: 400 }
      );
    }

    // Parse the Gregorian date
    const [gy, gm, gd] = birthday.split('-').map(Number);

    // Convert Gregorian to Hebrew date via hebcal.com
    const hebcalUrl = `https://www.hebcal.com/converter?cfg=json&gy=${gy}&gm=${gm}&gd=${gd}&g2h=1`;
    const hebcalRes = await fetch(hebcalUrl);

    if (!hebcalRes.ok) {
      return NextResponse.json(
        { error: 'Failed to convert date to Hebrew calendar.' },
        { status: 502 }
      );
    }

    const hebcalData = await hebcalRes.json();
    const hebrewBirthday = `${hebcalData.hd} ${hebcalData.hm} ${hebcalData.hy}`;
    const hebrewBirthdayHeb = hebcalData.hebrew as string;

    // Save to Supabase
    const { error: dbError } = await supabase
      .from('nurit_subscribers')
      .insert({
        name,
        email,
        phone: phone || null,
        birthday,
        hebrew_birthday: hebrewBirthday,
      });

    if (dbError) {
      console.error('Supabase error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save subscriber.' },
        { status: 500 }
      );
    }

    // Send confirmation email to subscriber
    await resend.emails.send({
      from: "Russian Junior N'shei Chabad <noreply@shabbathub.com>",
      to: email,
      subject: 'Спасибо за регистрацию! | Thank you for registering!',
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:32px;background:#faf6f0;border-radius:12px;">
          <h2 style="color:#8c4a6b;text-align:center;margin-bottom:24px;">Russian Junior N'shei Chabad</h2>
          <p style="color:#2d2017;font-size:18px;">Дорогая <strong>${name}</strong>,</p>
          <p style="color:#2d2017;font-size:16px;">Спасибо за регистрацию! Мы рады приветствовать вас в нашем сообществе.</p>
          <div style="background:#f5edd8;border-radius:10px;padding:20px;margin:20px 0;text-align:center;">
            <p style="color:#6b5a4e;font-size:14px;margin-bottom:8px;">Ваш еврейский день рождения:</p>
            <p style="color:#8c4a6b;font-size:22px;font-weight:700;margin:0;">${hebrewBirthday}</p>
            <p style="color:#9e7c3d;font-size:20px;font-weight:600;margin-top:8px;direction:rtl;">${hebrewBirthdayHeb}</p>
          </div>
          <p style="color:#2d2017;font-size:16px;">Вы будете получать обновления о наших мероприятиях, уроках и фарбренгенах.</p>
          <hr style="border:none;border-top:1px solid #d4c9bc;margin:24px 0;">
          <p style="color:#6b5a4e;font-size:13px;text-align:center;">Russian Junior N'shei Chabad · Brooklyn, NY<br><a href="https://www.rjnsheichabad.com" style="color:#8c4a6b;">rjnsheichabad.com</a></p>
        </div>
      `,
    });

    // Send notification email to admin
    await resend.emails.send({
      from: "NURIT Website <noreply@shabbathub.com>",
      to: 'chevrutah24x7@gmail.com',
      subject: `Новый подписчик NURIT: ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <h2 style="color:#8c4a6b;">Новый подписчик на сайте NURIT</h2>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Телефон:</strong> ${phone || '—'}</p>
          <p><strong>День рождения:</strong> ${birthday}</p>
          <p><strong>Еврейский день рождения:</strong> ${hebrewBirthday} / ${hebrewBirthdayHeb}</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      hebrewBirthday,
      hebrewBirthdayHeb,
    });
  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
