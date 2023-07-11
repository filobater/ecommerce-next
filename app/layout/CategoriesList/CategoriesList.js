'use client';

import Link from 'next/link';
import { useCategories } from '@/app/hooks/useCategories';

const CategoriesList = () => {
  const { data } = useCategories();

  const categories = data?.data;

  return (
    <ul className="categories flex gap-4 whitespace-nowrap overflow-auto mb-6 pb-3">
      {categories?.map((category, i) => (
        <li key={i}>
          <Link href={`/categories/${category}`}>{category}</Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoriesList;
