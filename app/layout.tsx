import React from 'react';
import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';

const heading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });
const body = Outfit({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'Dessy Atelier | Elevating African Elegance',
  description: 'Bespoke tailoring and contemporary African couture in the heart of Lagos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}