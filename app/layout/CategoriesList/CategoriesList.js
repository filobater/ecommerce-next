'use client';
import Link from 'next/link';
import { useCategories } from '@/app/hooks/useCategories';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

const CategoriesList = () => {
  const { data, isLoading } = useCategories();
  const pathname = usePathname();

  const categories = data?.data;

  return (
    <>
      {isLoading ? (
        <Skeleton className="mb-6" />
      ) : (
        <ul className="categories flex gap-4 whitespace-nowrap overflow-auto mb-6 pb-3">
          {categories?.map((category, i) => (
            <li key={i}>
              <Link
                className={pathname.includes(category) ? 'font-semibold' : ''}
                href={`/categories/${category}`}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CategoriesList;
