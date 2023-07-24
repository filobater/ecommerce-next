import { ReactQueryProvider } from './ReactQueryProvider';
import './globals.css';
import CategoriesList from './layout/CategoriesList/CategoriesList';
import Navbar from './components/Navbar/Navbar';
import { SearchProvider } from './context/SearchContext.js';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

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
          <AuthProvider>
            <CartProvider>
              <SearchProvider>
                <Navbar />
                <main className="p-6 pt-4">
                  <CategoriesList />
                  {children}
                </main>
              </SearchProvider>
            </CartProvider>
          </AuthProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
