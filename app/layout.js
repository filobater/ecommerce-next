import { ReactQueryProvider } from './ReactQueryProvider';
import './globals.css';
import { Inter } from 'next/font/google';
import CategoriesList from './components/layout/CategoriesList/CategoriesList';
import Navbar from './components/Navbar/Navbar';

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
        <body className={inter.className}>
          <Navbar />

          <main className="p-5 pt-4">
            <CategoriesList />
            {children}
          </main>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
