import { ReactQueryProvider } from './ReactQueryProvider';
import './globals.css';
import CategoriesList from './layout/CategoriesList/CategoriesList';
import Navbar from './components/Navbar/Navbar';
import { SearchProvider } from './context/SearchContext.js';
import { AuthProvider } from './context/AuthContext';

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
            <SearchProvider>
              <Navbar />
              <main className="p-6 pt-4">
                <CategoriesList />
                {children}
              </main>
            </SearchProvider>
          </AuthProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
