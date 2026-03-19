import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';

const heading = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['400', '700', '900']
});

const body = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '700']
});

export const metadata = {
  title: 'Dessy Atelier | Bespoke Lagos Couture',
  description: 'A premier Lagos-based fashion house specializing in high-end bespoke tailoring and contemporary African couture.',
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