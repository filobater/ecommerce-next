import { ReactQueryProvider } from './ReactQueryProvider';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ecommerce',
  description:
    'This ecommerce is for selling different products from different categories',
};

export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ReactQueryProvider>
  );
}
