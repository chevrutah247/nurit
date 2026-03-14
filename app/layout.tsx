import type { Metadata } from 'next';
import { Cormorant_Garamond, Source_Sans_3 } from 'next/font/google';

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
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
      <body>
        <SiteHeader />
        <ShabbatBar />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
