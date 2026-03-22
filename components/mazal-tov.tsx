'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/language-provider';

type Birthday = { name: string; day: string }

const birthdaysByMonth: Record<string, Birthday[]> = {
  Nisan: [
    { name: 'Orah Shneidman', day: '4' },
    { name: 'Rozaliya Buchman', day: '5' },
    { name: 'Malka Saginor', day: '11' },
    { name: 'Dina Tzeiger', day: '13' },
    { name: 'Nina Israel', day: '14' },
    { name: 'Chana Krechmar', day: '14' },
    { name: 'Milka Gorbach', day: '16' },
    { name: 'Ester Rubinov', day: '24' },
    { name: 'Perl Kulik', day: '25' },
    { name: 'Yehudis Tovshtein', day: '27' },
    { name: 'Bruria Batash', day: '28' },
    { name: 'Shirley Sak', day: '28' },
    { name: 'Rina Lerner', day: '29' },
    { name: 'Shaina Maor', day: '30' },
    { name: 'Kayla Burtman', day: '30' },
    { name: 'Sara Sirota', day: '30' },
    { name: 'Golda Shulman', day: '30' },
  ],
  Iyyar: [
    { name: 'Nekadam Ischakova', day: '3' },
    { name: 'Lika Hagit Yakovis', day: '5' },
    { name: 'Chava Dombrovskiy', day: '6' },
    { name: 'Rina Effros', day: '6' },
    { name: 'Iraida Krigsman', day: '6' },
    { name: 'Leah Pomansky', day: '6' },
    { name: 'Malky Shkolnik', day: '8' },
    { name: 'Sima Vernik', day: '9' },
    { name: 'Chana Fayershtein', day: '12' },
    { name: 'Regina Movshina', day: '17' },
    { name: 'Etty Boruchov', day: '19' },
    { name: 'Sofa Bolotina', day: '22' },
    { name: 'Ariella Gutshabes', day: '26' },
  ],
  Sivan: [
    { name: 'Tanya Fedorovskiy', day: '3' },
    { name: 'Leah Kagan', day: '3' },
    { name: 'Leah Brocha Kokin', day: '3' },
    { name: 'Ariela Sibony', day: '6' },
    { name: 'Elena-Noa Beyderman', day: '10' },
    { name: 'Ludmila Mayanskaya', day: '10' },
    { name: 'Mushky Teleshevsky', day: '11' },
    { name: 'Chana Kovtunenko', day: '12' },
    { name: 'Ilana Ilyayev', day: '16' },
    { name: 'Mila Shnaiderman', day: '' },
    { name: 'Taly Dombrovskiy', day: '20' },
    { name: 'Dana Sogomonyan', day: '22' },
    { name: 'Tanya Malochovskiy', day: '23' },
    { name: 'Zlata Okunev', day: '24' },
    { name: 'Miriam Ilyayev', day: '25' },
    { name: 'Rivka Torenheim', day: '27' },
    { name: 'Galina Kreymer', day: '' },
    { name: 'Ester Khirik', day: '' },
  ],
  Tamuz: [
    { name: 'Leah Levin', day: '2' },
    { name: 'Miriam Nepo', day: '3' },
    { name: 'Lena Dubinsky', day: '8' },
    { name: 'Aviva Orlova', day: '11' },
    { name: 'Miriam Reyder', day: '13' },
    { name: 'Alla Gorochova', day: '16' },
    { name: 'Lubov Zusman', day: '16' },
    { name: 'Ester Friedman', day: '19' },
    { name: 'Malky Dinerman', day: '20' },
    { name: 'Tanya Cretu', day: '21' },
    { name: 'Rivka Parnas', day: '21' },
    { name: 'Sara Shafit', day: '21' },
    { name: 'Shoshana Fridman', day: '25' },
    { name: 'Bronya Girshina', day: '25' },
    { name: 'Rivko Avezova', day: '' },
  ],
  Av: [
    { name: 'Rachel Orlov', day: '1' },
    { name: 'Chana-Rochel Duchovniy', day: '1' },
    { name: 'Ester Gedzberg', day: '5' },
    { name: 'Vera Tovshtein', day: '6' },
    { name: 'Elana Chaya Krasinskaya', day: '7' },
    { name: 'Adina Yakubova', day: '15' },
    { name: 'Batsheva Elishevich', day: '17' },
    { name: 'Leah Dashevsky', day: '18' },
    { name: 'Inna Nisnevich', day: '18' },
    { name: 'Yocheved Boruchov', day: '21' },
    { name: 'Ester Kaganova', day: '22' },
    { name: 'Shoshana Edelkopf', day: '25' },
    { name: 'Naomi Tverskaya', day: '28' },
  ],
  Elul: [
    { name: 'Chana Elentuch', day: '2' },
    { name: 'Ester Tal', day: '6' },
    { name: 'Rina Shakarov', day: '7' },
    { name: 'Ziva Eindzweig', day: '9' },
    { name: 'Inna Ester Izman', day: '12' },
    { name: 'Tanya Kogan', day: '14' },
    { name: 'Elka Rabiskiy', day: '14' },
    { name: 'Chana Tishchenko', day: '19' },
    { name: 'Eleonora Rubinov', day: '24' },
    { name: 'Faina Goryachkovskiy', day: '25' },
    { name: 'Roza Morozov', day: '25' },
    { name: 'Meyrav Tovitou', day: '23' },
    { name: 'Mazal Bam', day: '28' },
    { name: 'Shayna Roth', day: '28' },
    { name: 'Leah Siller Kiseleva', day: '29' },
  ],
  Tishrei: [
    { name: 'Sheina Prus', day: '1' },
    { name: 'Emma Aminov', day: '7' },
    { name: 'Batya Kovtunenko', day: '7' },
    { name: 'Luba Kogan', day: '8' },
    { name: 'Ruchama Baum', day: '' },
    { name: 'Tamara Botvinnikov', day: '11' },
    { name: 'Alina Merzdov', day: '12' },
    { name: 'Tanya Molochnaya', day: '13' },
    { name: 'Raizel Gaft', day: '15' },
    { name: 'Yehudis Brum', day: '19' },
    { name: 'Sima Shafit', day: '27' },
    { name: 'Faigy Israeli', day: '29' },
    { name: 'Rivka Sidorov', day: '30' },
  ],
  Cheshvan: [
    { name: 'Miriam Gubnitzkiy', day: '4' },
    { name: 'Chana Karetniy', day: '4' },
    { name: 'Sara Tubis', day: '11' },
    { name: 'Leah Livshitz', day: '15' },
    { name: 'Miriam Later', day: '19' },
    { name: 'Rachel Margolin', day: '' },
    { name: 'Dina Wall', day: '25' },
    { name: 'Chana Volkov', day: '28' },
    { name: 'Shterna Sirota', day: '29' },
  ],
  Kislev: [
    { name: 'Clara Landsman', day: '2' },
    { name: 'Adina Mushinsky', day: '4' },
    { name: 'Leora Meltzin', day: '' },
    { name: 'Ilona Abramovich', day: '7' },
    { name: 'Sara Geizinsky', day: '8' },
    { name: 'Batsheva Gur', day: '7' },
    { name: 'Avigal Gribov', day: '11' },
    { name: 'Ziva Gu', day: '11' },
    { name: 'Batsheva Rabinovich', day: '17' },
    { name: 'Leora Kovtunenko', day: '17' },
    { name: 'Suri Hubner', day: '23' },
    { name: 'Perel Kolpak', day: '24' },
    { name: 'Liel Kuravskiy', day: '25' },
    { name: 'Rina Ga', day: '26' },
    { name: 'Rivka Pestun', day: '30' },
  ],
  Tevet: [
    { name: 'Nadya Batsheva Yevdayeva', day: '5' },
    { name: 'Rima Feldman', day: '6' },
    { name: 'Miriam Grumberg', day: '11' },
    { name: 'Biana Batsheva Kofman', day: '11' },
    { name: 'Ester Miropolskiy', day: '14' },
    { name: 'Miriam Grosh', day: '16' },
    { name: 'Anna Travinsky', day: '20' },
    { name: 'Miriam Gozenpud', day: '27' },
  ],
  Shvat: [
    { name: 'Miriam Orlova', day: '6' },
    { name: 'Miriam Belinsky', day: '8' },
    { name: 'Irina Gurevich', day: '10' },
    { name: 'Miriam Alexander', day: '11' },
    { name: 'Tamar Baltazar', day: '13' },
    { name: 'Rochel Faygen', day: '17' },
    { name: 'Liora Olchovskaya', day: '17' },
    { name: 'Geula Kaufman', day: '20' },
    { name: 'Dina Vishnevskiy', day: '20' },
    { name: 'Liora Menzeles', day: '20' },
    { name: 'Shoshana Ilyayev', day: '25' },
    { name: 'Aviva Borodkin', day: '26' },
    { name: 'Dina Kagan', day: '29' },
  ],
  Adar: [
    { name: 'Leah Goldshtein', day: '3' },
    { name: 'Anna Zusman', day: '5' },
    { name: 'Chana Komarovskiy', day: '7' },
    { name: 'Rochel Konik', day: '8' },
    { name: 'Emma Gekt', day: '9' },
    { name: 'Ester Granovskaya', day: '22' },
    { name: 'Natasha Burmistrovich', day: '23' },
    { name: 'Nechama Tzatzkes', day: '27' },
  ],
}

const monthNamesRu: Record<string, string> = {
  Nisan: 'Нисан', Iyyar: 'Ияр', Sivan: 'Сиван', Tamuz: 'Тамуз',
  Av: 'Ав', Elul: 'Элуль', Tishrei: 'Тишрей', Cheshvan: 'Хешван',
  Kislev: 'Кислев', Tevet: 'Тевет', Shvat: 'Шват', Adar: 'Адар',
  'Adar I': 'Адар I', 'Adar II': 'Адар II',
}

const hebcalToKey: Record<string, string> = {
  'Nisan': 'Nisan', 'Iyyar': 'Iyyar', 'Sivan': 'Sivan', 'Tamuz': 'Tamuz',
  'Av': 'Av', 'Elul': 'Elul', 'Tishrei': 'Tishrei', 'Cheshvan': 'Cheshvan',
  'Kislev': 'Kislev', 'Tevet': 'Tevet', "Sh'vat": 'Shvat', 'Shvat': 'Shvat',
  'Adar': 'Adar', 'Adar I': 'Adar', 'Adar II': 'Adar',
}

export function MazalTov() {
  const { language } = useLanguage();
  const isRu = language === 'rus';
  const [hebrewMonth, setHebrewMonth] = useState<string | null>(null);
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);

  useEffect(() => {
    async function fetchMonth() {
      try {
        const today = new Date();
        const res = await fetch(
          `https://www.hebcal.com/converter?cfg=json&gy=${today.getFullYear()}&gm=${today.getMonth() + 1}&gd=${today.getDate()}&g2h=1`
        );
        if (!res.ok) return;
        const data = await res.json();
        const hm = data.hm;
        const key = hebcalToKey[hm] || hm;
        setHebrewMonth(hm);
        setBirthdays(birthdaysByMonth[key] || []);
      } catch {}
    }
    fetchMonth();
  }, []);

  if (!hebrewMonth || birthdays.length === 0) return null;

  const monthDisplay = isRu ? (monthNamesRu[hebrewMonth] || hebrewMonth) : hebrewMonth;

  return (
    <div style={{
      background: 'var(--bg-alt, rgba(255,255,255,0.04))',
      border: '1px solid rgba(212,168,83,0.2)',
      borderRadius: 16,
      padding: '2rem',
      maxWidth: 480,
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Confetti */}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
        }
        @keyframes confetti-sway {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(15px); }
        }
        .confetti-piece {
          position: absolute;
          top: -10px;
          width: 8px;
          height: 8px;
          border-radius: 2px;
          animation: confetti-fall linear infinite;
          pointer-events: none;
          z-index: 0;
        }
      `}</style>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${5 + (i * 4.7) % 90}%`,
            background: ['#d4a853', '#e8c56d', '#f0d68a', '#c49a3c', '#b8860b', '#ff69b4', '#ff85c0', '#ffd700', '#87ceeb', '#98fb98'][i % 10],
            animationDuration: `${3 + (i % 5) * 1.2}s`,
            animationDelay: `${(i * 0.4) % 4}s`,
            width: `${6 + (i % 3) * 3}px`,
            height: `${6 + (i % 4) * 2}px`,
            borderRadius: i % 3 === 0 ? '50%' : '2px',
            opacity: 0.7,
          }}
        />
      ))}
      <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: 28, marginBottom: 4 }}>🎂</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--gold, #d4a853)', marginBottom: 4 }}>
          {isRu ? 'Мазаль Тов!' : 'Mazal Tov!'}
        </h3>
        <p style={{ color: '#8a7a5a', fontSize: 14 }}>
          {isRu ? `Именинницы месяца ${monthDisplay}` : `Birthdays in ${monthDisplay}`}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {birthdays.map((b, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 12px', borderRadius: 10,
            background: i % 2 === 0 ? 'rgba(212,168,83,0.06)' : 'transparent',
          }}>
            <span style={{ color: '#4a3f2f', fontWeight: 500, fontSize: 15 }}>{b.name}</span>
            <span style={{ color: 'var(--gold, #d4a853)', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>
              {b.day ? `${b.day} ${monthDisplay}` : monthDisplay}
            </span>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
