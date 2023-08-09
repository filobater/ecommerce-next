'use client';
import { useContext, useEffect } from 'react';
import { SearchContext } from '@/app/context/SearchContext';

import { useSearchProducts } from '@/app/hooks/useSearchProducts';

import ProductsList from '@/app/layout/ProductsList/ProductsList';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SearchPage = () => {
  const { searchValue } = useContext(SearchContext);

  const { data, isLoading } = useSearchProducts(searchValue);

  const productsData = data?.data;

  return (
    <div>
      {isLoading ? (
        <Skeleton className="!w-[200px] mt-8" />
      ) : !searchValue ? (
        <span className="font-semibold">
          Type in the search bar to see results
        </span>
      ) : (
        <h1 className="font-bold text-2xl mb-4">{`Search result${
          productsData?.total > 1 ? 's' : ''
        }: ${productsData?.total}`}</h1>
      )}
      {productsData?.products.length > 0 && (
        <ProductsList products={productsData.products} />
      )}
    </div>
  );
};

export default SearchPage;
