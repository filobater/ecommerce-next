'use client';

import Link from 'next/link';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';

import ProductsCarousel from './components/ProductsCarousel/ProductsCarousel';
import { useCategories } from './hooks/useCategories';

export default function Home() {
  const { data } = useCategories();

  const categories = data?.data;
  console.log(categories);

  return (
    <main className="p-4">
      <h1>Navbar</h1>
      <ul className="flex gap-4 whitespace-nowrap overflow-auto mb-4 categories">
        {/* {categories?.map((category, i) => (
          <li key={i}>
            <Link href={`/${category}`}>{category}</Link>
          </li>
        ))} */}
      </ul>
      <ProductsCarousel />
      <FeaturedProducts />
    </main>
  );
}
