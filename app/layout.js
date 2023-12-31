import { ReactQueryProvider } from './ReactQueryProvider';
import './globals.css';
import CategoriesList from './layout/CategoriesList/CategoriesList';
import Navbar from './components/Navbar/Navbar';
import { SearchProvider } from './context/SearchContext.js';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

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
            <WishlistProvider>
              <CartProvider>
                <SearchProvider>
                  <Navbar />
                  <main className=" 2xl:container 2xl:m-auto p-4 pt-4 md:p6">
                    <CategoriesList />
                    {children}
                  </main>
                </SearchProvider>
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
