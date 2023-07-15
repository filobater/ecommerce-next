'use client';
import Link from 'next/link';
import { useCategories } from '@/app/hooks/useCategories';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CategoriesList = () => {
  const { data, isLoading } = useCategories();

  const categories = data?.data;

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <ul className="categories flex gap-4 whitespace-nowrap overflow-auto mb-6 pb-3">
          {categories?.map((category, i) => (
            <li key={i}>
              <Link href={`/categories/${category}`}>{category}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CategoriesList;
