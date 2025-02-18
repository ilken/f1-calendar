import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import "./globals.css";
import { Lato } from 'next/font/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "F1 2025 Race Calendar | Formula 1 Grand Prix Schedule",
  description: "View the complete 2025 Formula 1 race calendar with all F1 Grand Prix dates, times and circuits. Customizable timezone support for global F1 fans.",
  keywords: "F1, Formula 1, 2025 Calendar, F1 Schedule, Grand Prix, Race Calendar",
  authors: [{ name: "i14u" }],
  openGraph: {
    title: "F1 2025 Race Calendar | Formula 1 Grand Prix Schedule",
    description: "Complete 2025 Formula 1 race calendar with customizable timezones",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "F1 2025 Calendar Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "F1 2025 Race Calendar",
    description: "Complete 2025 Formula 1 race calendar with customizable timezones",
  },
  manifest: "/site.webmanifest",
  icons: {
    apple: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${lato.className} antialiased`}>
      <body>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
