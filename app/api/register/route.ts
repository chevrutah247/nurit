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

    // Send notification email via Resend
    await resend.emails.send({
      from: 'NURIT Website <noreply@shabbathub.com>',
      to: 'chevrutah24x7@gmail.com',
      subject: `New NURIT Subscriber: ${name}`,
      html: `
        <h2>New Subscriber Registration</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Birthday (Gregorian):</strong> ${birthday}</p>
        <p><strong>Birthday (Hebrew):</strong> ${hebrewBirthday}</p>
        <p><strong>Birthday (Hebrew script):</strong> ${hebrewBirthdayHeb}</p>
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
