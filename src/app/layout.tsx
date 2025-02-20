import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './globals.css';
import { Lato } from 'next/font/google';
import { siteConfig } from '@/config/site.config';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'F1 2025 Race Calendar | Formula 1 Grand Prix Schedule',
    template: '%s | F1 2025 Calendar',
  },
  description: siteConfig.description,
  keywords: [
    'F1',
    'Formula 1',
    '2025 Calendar',
    'F1 Schedule',
    'Grand Prix',
    'Race Calendar',
    'Formula One',
  ],
  authors: [{ name: 'i14u' }],
  creator: 'i14u',
  publisher: 'i14u',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://f1-calendar-one.vercel.app',
    title: 'F1 2025 Race Calendar | Formula 1 Grand Prix Schedule',
    description: 'Complete 2025 Formula 1 race calendar with customizable timezones',
    siteName: 'F1 2025 Calendar',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'F1 2025 Calendar Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'F1 2025 Race Calendar',
    description: 'Complete 2025 Formula 1 race calendar with customizable timezones',
    creator: '@i14u',
    images: ['/og-image.jpg'],
  },
  manifest: '/site.webmanifest',
  themeColor: siteConfig.themeColor,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: siteConfig.name,
  },
  applicationName: siteConfig.name,
  formatDetection: {
    telephone: false,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lato.className} antialiased`}
    >
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
