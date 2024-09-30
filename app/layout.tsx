import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import Header from '@/components/Header/Header';

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-lato',
});

const geistSans = localFont({
  src: '../public/assets/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../public/assets/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Table Issue Tracker',
  description: 'Simple way to track and manage issues',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.className}`}>
      <body
        className={`${lato.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
