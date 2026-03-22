import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "Russian Junior N'shei Chabad";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1612 0%, #2a2018 40%, #1a1612 100%)',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Decorative border */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: '2px solid rgba(212, 168, 83, 0.3)',
            borderRadius: 20,
            display: 'flex',
          }}
        />

        {/* Crown icon */}
        <div
          style={{
            fontSize: 80,
            marginBottom: 10,
            display: 'flex',
          }}
        >
          👑
        </div>

        {/* RJNC abbreviation */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#d4a853',
            letterSpacing: '12px',
            marginBottom: 16,
            display: 'flex',
          }}
        >
          RJNC
        </div>

        {/* Full name */}
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 600,
            marginBottom: 8,
            display: 'flex',
          }}
        >
          Russian Junior N&apos;shei Chabad
        </div>

        {/* Russian subtitle */}
        <div
          style={{
            fontSize: 22,
            color: 'rgba(212, 168, 83, 0.7)',
            display: 'flex',
          }}
        >
          Еврейские женщины Хабада • Crown Heights
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: 120,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #d4a853, transparent)',
            marginTop: 24,
            display: 'flex',
          }}
        />

        {/* Since 1999 */}
        <div
          style={{
            fontSize: 16,
            color: 'rgba(255, 255, 255, 0.4)',
            marginTop: 16,
            letterSpacing: '4px',
            display: 'flex',
          }}
        >
          SINCE 1999
        </div>
      </div>
    ),
    { ...size }
  );
}
