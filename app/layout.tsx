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
  weight: ['300', '400', '600', '800'] 
});

export const metadata = {
  title: 'Dessy Atelier | Lagos Elegance',
  description: 'Premier fashion design house creating bespoke Nigerian luxury.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans bg-primary text-white`}>
        {children}
      </body>
    </html>
  );
}