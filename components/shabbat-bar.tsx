'use client';

import { useState, useEffect } from 'react';

import { useLanguage } from '@/components/language-provider';

const hebrewMonths: Record<string, string> = {
  'Nisan': 'Nisan', 'Iyyar': 'Iyyar', 'Sivan': 'Sivan',
  'Tamuz': 'Tamuz', 'Av': 'Av', 'Elul': 'Elul',
  'Tishrei': 'Tishrei', 'Cheshvan': 'Cheshvan', 'Kislev': 'Kislev',
  'Tevet': 'Tevet', 'Shvat': 'Shvat', "Sh'vat": 'Shvat',
  'Adar': 'Adar', 'Adar I': 'Adar I', 'Adar II': 'Adar II',
};

export function ShabbatBar() {
  const [hebrewDate, setHebrewDate] = useState('');
  const [parsha, setParsha] = useState('');
  const [candleLighting, setCandleLighting] = useState('');
  const [havdalah, setHavdalah] = useState('');
  const [ready, setReady] = useState(false);
  const { copy } = useLanguage();

  useEffect(() => {
    async function fetchInfo() {
      try {
        const cached = sessionStorage.getItem('nurit-shabbat-bar');
        if (cached) {
          const p = JSON.parse(cached);
          if (p.hebrewDate) setHebrewDate(p.hebrewDate);
          if (p.parsha) setParsha(p.parsha);
          if (p.candleLighting) setCandleLighting(p.candleLighting);
          if (p.havdalah) setHavdalah(p.havdalah);
          setReady(true);
          return;
        }

        const today = new Date();
        const y = today.getFullYear(), m = today.getMonth() + 1, d = today.getDate();

        const [dateRes, parshaRes] = await Promise.all([
          fetch(`https://www.hebcal.com/converter?cfg=json&gy=${y}&gm=${m}&gd=${d}&g2h=1`).then(r => r.ok ? r.json() : null),
          fetch(`https://www.hebcal.com/hebcal?v=1&cfg=json&maj=off&min=off&mod=off&nx=off&year=${y}&month=${m}&ss=off&mf=off&c=off&s=on`).then(r => r.ok ? r.json() : null),
        ]);

        let hDate = '';
        if (dateRes) {
          const month = hebrewMonths[dateRes.hm] || dateRes.hm;
          hDate = `${dateRes.hd} ${month} ${dateRes.hy}`;
        }

        let pName = '';
        if (parshaRes?.items) {
          const parashat = parshaRes.items.find((item: any) => {
            if (item.category !== 'parashat') return false;
            const itemDate = new Date(item.date);
            const dayDiff = (itemDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000);
            return dayDiff >= -1 && dayDiff <= 6;
          });
          if (parashat) pName = parashat.title?.replace('Parashat ', '') || '';
        }

        setHebrewDate(hDate);
        setParsha(pName);
        setReady(true);

        // Fetch Shabbat times with default NYC location
        let lat = 40.6782, lng = -73.9442, tzid = 'America/New_York'; // Brooklyn
        if (navigator.geolocation) {
          try {
            const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
              navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 3000 })
            );
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;
            tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;
          } catch {}
        }

        let cLight = '';
        let hDalah = '';
        const shabbatRes = await fetch(
          `https://www.hebcal.com/shabbat?cfg=json&geo=pos&latitude=${lat}&longitude=${lng}&tzid=${tzid}`
        );
        if (shabbatRes.ok) {
          const data = await shabbatRes.json();
          const candle = data.items?.find((i: any) => i.category === 'candles');
          const havd = data.items?.find((i: any) => i.category === 'havdalah');
          if (candle) {
            cLight = new Date(candle.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            setCandleLighting(cLight);
          }
          if (havd) {
            hDalah = new Date(havd.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            setHavdalah(hDalah);
          }
        }

        sessionStorage.setItem('nurit-shabbat-bar', JSON.stringify({
          hebrewDate: hDate, parsha: pName,
          candleLighting: cLight, havdalah: hDalah,
        }));
      } catch (err) {
        console.error('ShabbatBar fetch error:', err);
      } finally {
        setReady(true);
      }
    }
    fetchInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="shabbat-bar">
      {ready && (hebrewDate || parsha) ? (
        <>
          {hebrewDate && <span>{hebrewDate}</span>}
          {hebrewDate && parsha && <span className="shabbat-dot">&bull;</span>}
          {parsha && <span>{copy.shabbat.parashat} {parsha}</span>}
          {candleLighting && (
            <>
              <span className="shabbat-dot">&bull;</span>
              <span>{copy.shabbat.candleLighting}: {candleLighting}</span>
            </>
          )}
          {havdalah && (
            <>
              <span className="shabbat-dot">&bull;</span>
              <span>{copy.shabbat.havdalah}: {havdalah}</span>
            </>
          )}
        </>
      ) : (
        <span style={{ opacity: 0 }}>.</span>
      )}
    </div>
  );
}
