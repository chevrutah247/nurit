import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Source_Sans_3 } from 'next/font/google';

import { LanguageProvider } from '@/components/language-provider';
import { SiteHeader } from '@/components/site-header';
import { ShabbatBar } from '@/components/shabbat-bar';
import { SiteFooter } from '@/components/site-footer';
import { siteConfig } from '@/content/site';

import './globals.css';

const headingFont = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-heading',
  weight: ['500', '600', '700'],
});

const bodyFont = Source_Sans_3({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1a1612',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Russian Junior N'shei Chabad — Организация русскоговорящих еврейских женщин Хабада",
    template: `%s | Russian Junior N'shei Chabad`,
  },
  description: "Russian Junior N'shei Chabad — организация русскоговорящих еврейских женщин Хабада в Краун-Хайтс, Бруклин. Уроки Хасидуса, фарбренгены, поддержка семей. Основана в 1999 году. Community of Russian-speaking Jewish women in Crown Heights, Brooklyn.",
  keywords: [
    "Russian Junior N'shei Chabad", "RJNC", "rjnsheichabad",
    "русскоговорящие еврейские женщины", "Russian Jewish women", "Crown Heights",
    "Хабад", "Chabad", "Хасидус", "Chassidus", "фарбренген", "farbrengen",
    "еврейское образование", "Jewish education", "Brooklyn",
    "Краун-Хайтс", "Torah classes", "уроки Торы",
    "Нурит Сарычев", "Nurit Sarytchev",
    "еврейская община", "Jewish community",
  ],
  authors: [{ name: "Russian Junior N'shei Chabad" }],
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: "Russian Junior N'shei Chabad",
    title: "Russian Junior N'shei Chabad — Еврейские женщины Хабада",
    description: "Организация русскоговорящих еврейских женщин Хабада в Краун-Хайтс. Уроки, фарбренгены, поддержка семей с 1999 года.",
    url: siteConfig.siteUrl,
    locale: 'ru_RU',
    alternateLocale: ['en_US', 'he_IL'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Russian Junior N'shei Chabad",
    description: "Организация русскоговорящих еврейских женщин Хабада в Краун-Хайтс, Бруклин.",
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'apple-mobile-web-app-title': 'RJNC',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: "Russian Junior N'shei Chabad",
  alternateName: ['RJNC', 'Организация русскоговорящих еврейских женщин Хабада'],
  url: siteConfig.siteUrl,
  logo: `${siteConfig.siteUrl}/images/rjnc-logo.png`,
  description: "Community organization of Russian-speaking Jewish women in Crown Heights, Brooklyn. Torah classes, farbrengens, community support since 1999.",
  foundingDate: '1999',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brooklyn',
    addressRegion: 'NY',
    addressCountry: 'US',
    streetAddress: 'Crown Heights',
  },
  sameAs: [
    'https://edonthego.org',
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "What is Russian Junior N'shei Chabad?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Russian Junior N'shei Chabad is a community of Russian-speaking Jewish women in Crown Heights, Brooklyn, founded in 1999. We offer weekly Chassidus classes, monthly Rosh Chodesh farbrengens, and community support.",
      },
    },
    {
      '@type': 'Question',
      name: 'Что такое RJNC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Организация русскоговорящих еврейских женщин Хабада была основана в 1999 году в Краун-Хайтс, Бруклин. Мы проводим еженедельные уроки по Хасидусу, ежемесячные фарбренгены и оказываем поддержку семьям.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where are the Chassidus classes held?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Classes are held every Monday at 9 PM (675 Empire Blvd), Tuesday at 10 AM (935 Eastern Pkwy) and 9 PM (275 Albany Ave), and Shabbos at 6:30 PM at F.R.E.E.',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://www.hebcal.com" />
        <link rel="preconnect" href="https://www.hebcal.com" />
      </head>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <LanguageProvider>
          <SiteHeader />
          <ShabbatBar />
          <main>{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
