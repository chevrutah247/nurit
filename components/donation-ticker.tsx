'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/language-provider';

type Donation = {
  donor_name: string;
  amount: number;
  currency: string;
};

export function DonationTicker() {
  const { language } = useLanguage();
  const isRu = language === 'rus';
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    fetch('/api/donations')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDonations(data);
        }
      })
      .catch(() => {});
  }, []);

  if (donations.length === 0) return null;

  const label = isRu ? 'Благодарим за поддержку:' : 'Thank you for your support:';

  const tickerItems = donations.map(
    (d) => `${d.donor_name} — $${d.amount}${d.currency !== 'USD' ? ' ' + d.currency : ''}`
  );

  // Double the items for seamless loop
  const tickerText = [...tickerItems, ...tickerItems].join('          ');

  return (
    <div className="donation-ticker-wrapper">
      <div className="donation-ticker-label">{label}</div>
      <div className="donation-ticker-track">
        <div className="donation-ticker-content">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="donation-ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .donation-ticker-wrapper {
          display: flex;
          align-items: center;
          background: linear-gradient(90deg, #fffbeb 0%, #fef3c7 100%);
          border-bottom: 1px solid rgba(212, 168, 83, 0.2);
          overflow: hidden;
          white-space: nowrap;
          font-family: 'Georgia', serif;
          font-size: 14px;
          color: #4a3f2f;
        }
        .donation-ticker-label {
          flex-shrink: 0;
          padding: 8px 16px;
          font-weight: 700;
          color: #92400e;
          background: rgba(212, 168, 83, 0.1);
          border-right: 1px solid rgba(212, 168, 83, 0.2);
          font-size: 13px;
        }
        .donation-ticker-track {
          flex: 1;
          overflow: hidden;
          position: relative;
        }
        .donation-ticker-content {
          display: inline-flex;
          gap: 3rem;
          animation: ticker-scroll 40s linear infinite;
          padding: 8px 0;
        }
        .donation-ticker-item {
          white-space: nowrap;
          font-style: italic;
        }
        .donation-ticker-item::after {
          content: '✦';
          margin-left: 3rem;
          color: rgba(212, 168, 83, 0.4);
          font-style: normal;
        }
        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (max-width: 640px) {
          .donation-ticker-wrapper {
            font-size: 12px;
          }
          .donation-ticker-label {
            padding: 6px 10px;
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}
