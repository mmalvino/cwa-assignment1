import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header'; 
import { Footer } from '@/components/Footer'; 
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: 'CWA Assignment 1 | Tabs Generator',
  description: 'A Next.js application for generating custom HTML tabs with dark/light mode.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-4 sm:p-8">
              {children}
            </main>
            <Footer name="Micky Malvino Kusandiwinata" number="22586472" year={2025} />
          </div>
      </body>
    </html>
  );
}
