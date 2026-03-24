import { NextResponse } from 'next/server';

import { supabase } from '@/lib/supabase';

const monthAliases: Record<string, string[]> = {
  Nisan: ['Nisan'],
  Iyyar: ['Iyyar'],
  Sivan: ['Sivan'],
  Tamuz: ['Tamuz'],
  Av: ['Av'],
  Elul: ['Elul'],
  Tishrei: ['Tishrei'],
  Cheshvan: ['Cheshvan'],
  Kislev: ['Kislev'],
  Tevet: ['Tevet'],
  Shvat: ["Sh'vat", 'Shvat'],
  Adar: ['Adar', 'Adar I', 'Adar II'],
};

function parseHebrewBirthday(value: string | null) {
  if (!value) return null;

  const match = value.match(/^(\d{1,2})\s+(.+?)\s+\d{4,}$/);
  if (!match) return null;

  return {
    day: match[1],
    month: match[2],
  };
}

function normalizeName(value: string) {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');

    if (!month) {
      return NextResponse.json({ error: 'Month is required.' }, { status: 400 });
    }

    const allowedMonths = monthAliases[month] ?? [month];

    const { data, error } = await supabase
      .from('nurit_subscribers')
      .select('name, email, hebrew_birthday, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Birthday fetch error:', error);
      return NextResponse.json({ error: 'Failed to load birthdays.' }, { status: 500 });
    }

    const seenEmails = new Set<string>();
    const seenNames = new Set<string>();

    const birthdays = (data ?? []).flatMap((row: {
      name: string | null;
      email: string | null;
      hebrew_birthday: string | null;
    }) => {
      const parsed = parseHebrewBirthday(row.hebrew_birthday);
      if (!row.name || !parsed) return [];
      if (!allowedMonths.includes(parsed.month)) return [];

      const normalizedName = normalizeName(row.name);
      const normalizedEmail = row.email?.toLowerCase().trim();

      if ((normalizedEmail && seenEmails.has(normalizedEmail)) || seenNames.has(normalizedName)) {
        return [];
      }

      if (normalizedEmail) seenEmails.add(normalizedEmail);
      seenNames.add(normalizedName);

      return [{
        name: row.name,
        day: parsed.day,
      }];
    });

    return NextResponse.json({ birthdays });
  } catch (error) {
    console.error('Birthdays API error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
