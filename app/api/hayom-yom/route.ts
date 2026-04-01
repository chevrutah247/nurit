import { NextResponse } from 'next/server';

const SOURCE_URL = 'https://ru.chabad.org/dailystudy/hayomyom.htm';

function decodeHtml(value: string) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function extractHayomYom(html: string) {
  const text = decodeHtml(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|h1|h2|h3|li|section|article)>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
  );

  const lines = text
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  const titleIndex = lines.findIndex((line) => line === 'Айом Йом');
  const displayIndex = lines.findIndex((line) => line === 'Русский Иврит');

  if (titleIndex === -1 || displayIndex === -1) {
    return null;
  }

  const dateLine = lines.slice(titleIndex + 1, displayIndex).find((line) => /\d{4}/.test(line)) || '';
  const russianText = lines[displayIndex + 1] || '';

  if (!russianText) return null;

  return {
    title: 'Айом Йом',
    dateLine,
    text: russianText,
    sourceUrl: SOURCE_URL,
  };
}

export async function GET() {
  try {
    const response = await fetch(SOURCE_URL, {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NURIT Bot/1.0; +https://www.rjnsheichabad.com)',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to load Hayom Yom.' }, { status: 502 });
    }

    const html = await response.text();
    const data = extractHayomYom(html);

    if (!data) {
      return NextResponse.json({ error: 'Failed to parse Hayom Yom.' }, { status: 500 });
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Hayom Yom fetch error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
