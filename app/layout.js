import { ReactQueryProvider } from './ReactQueryProvider';
import './globals.css';
import CategoriesList from './layout/CategoriesList/CategoriesList';
import Navbar from './components/Navbar/Navbar';

export const metadata = {
  title: 'Ecommerce',
  description:
    'This ecommerce is for selling different products from different categories',
};

export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body>
          <Navbar />

          <main className="p-6 pt-4">
            <CategoriesList />
            {children}
          </main>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
