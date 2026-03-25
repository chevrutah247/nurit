import { NextResponse } from 'next/server';

import { BirthTiming, convertToHebrewBirthday } from '@/lib/hebrew-birthday';
import { verifyProfileToken } from '@/lib/profile-token';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token is required.' }, { status: 400 });
    }

    const { email } = verifyProfileToken(token);

    const { data, error } = await supabase
      .from('nurit_subscribers')
      .select('name, email, phone, address, birthday, adjusted_birthday, birth_timing, hebrew_birthday, created_at')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      const fallback = await supabase
        .from('nurit_subscribers')
        .select('name, email, phone, birthday, hebrew_birthday, created_at')
        .eq('email', email)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fallback.error || !fallback.data) {
        return NextResponse.json({ error: 'Profile not found.' }, { status: 404 });
      }

      return NextResponse.json({
        profile: {
          ...fallback.data,
          address: '',
          adjusted_birthday: fallback.data.birthday,
          birth_timing: 'before_sunset',
        },
      });
    }

    if (!data) {
      return NextResponse.json({ error: 'Profile not found.' }, { status: 404 });
    }

    return NextResponse.json({ profile: data });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Failed to load profile.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json() as {
      token?: string;
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
      birthday?: string;
      birthTiming?: BirthTiming;
    };

    if (!body.token || !body.name || !body.email || !body.birthday) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const { email: originalEmail } = verifyProfileToken(body.token);
    const birthTiming = body.birthTiming || 'before_sunset';
    const converted = await convertToHebrewBirthday(body.birthday, birthTiming);

    const fullUpdate = await supabase
      .from('nurit_subscribers')
      .update({
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        address: body.address || null,
        birthday: body.birthday,
        adjusted_birthday: converted.adjustedBirthday,
        birth_timing: birthTiming,
        hebrew_birthday: converted.hebrewBirthday,
      })
      .eq('email', originalEmail);

    let updateError = fullUpdate.error;

    if (updateError) {
      const fallback = await supabase
        .from('nurit_subscribers')
        .update({
          name: body.name,
          email: body.email,
          phone: body.phone || null,
          birthday: body.birthday,
          hebrew_birthday: converted.hebrewBirthday,
        })
        .eq('email', originalEmail);

      updateError = fallback.error;
    }

    if (updateError) {
      console.error('Profile update error:', updateError);
      return NextResponse.json({ error: 'Failed to update profile.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      hebrewBirthday: converted.hebrewBirthday,
      hebrewBirthdayHeb: converted.hebrewBirthdayHeb,
    });
  } catch (error) {
    console.error('Profile patch error:', error);
    return NextResponse.json({ error: 'Failed to update profile.' }, { status: 500 });
  }
}
