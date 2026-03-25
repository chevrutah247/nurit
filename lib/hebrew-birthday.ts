export type BirthTiming = 'before_sunset' | 'after_sunset';

export function adjustGregorianBirthday(birthday: string, birthTiming: BirthTiming) {
  const [year, month, day] = birthday.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (birthTiming === 'after_sunset') {
    date.setUTCDate(date.getUTCDate() + 1);
  }

  const adjustedYear = date.getUTCFullYear();
  const adjustedMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
  const adjustedDay = String(date.getUTCDate()).padStart(2, '0');

  return {
    adjustedBirthday: `${adjustedYear}-${adjustedMonth}-${adjustedDay}`,
    gy: adjustedYear,
    gm: Number(adjustedMonth),
    gd: Number(adjustedDay),
  };
}

export async function convertToHebrewBirthday(birthday: string, birthTiming: BirthTiming) {
  const { adjustedBirthday, gy, gm, gd } = adjustGregorianBirthday(birthday, birthTiming);
  const hebcalUrl = `https://www.hebcal.com/converter?cfg=json&gy=${gy}&gm=${gm}&gd=${gd}&g2h=1`;
  const response = await fetch(hebcalUrl, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to convert date to Hebrew calendar.');
  }

  const data = await response.json();

  return {
    adjustedBirthday,
    hebrewBirthday: `${data.hd} ${data.hm} ${data.hy}`,
    hebrewBirthdayHeb: data.hebrew as string,
    hebrewDay: String(data.hd),
    hebrewMonth: String(data.hm),
    hebrewYear: String(data.hy),
  };
}
