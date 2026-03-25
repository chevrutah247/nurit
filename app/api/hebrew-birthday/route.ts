import { NextResponse } from 'next/server';

import { BirthTiming, convertToHebrewBirthday } from '@/lib/hebrew-birthday';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const birthday = searchParams.get('birthday');
    const birthTiming = (searchParams.get('birthTiming') || 'before_sunset') as BirthTiming;

    if (!birthday) {
      return NextResponse.json({ error: 'Birthday is required.' }, { status: 400 });
    }

    const result = await convertToHebrewBirthday(birthday, birthTiming);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Hebrew birthday conversion error:', error);
    return NextResponse.json({ error: 'Failed to convert birthday.' }, { status: 500 });
  }
}
