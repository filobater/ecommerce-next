'use client';
import { useContext, useEffect } from 'react';
import { SearchContext } from '@/app/context/SearchContext';

import { useSearchProducts } from '@/app/hooks/useSearchProducts';

import ProductsList from '@/app/layout/ProductsList/ProductsList';

import PageTitle from '@/app/components/PageTitle/PageTitle';
import SkeletonCardList from '@/app/layout/SkeletonCardList/SkeletonCardList';

const SearchPage = () => {
  const { searchValue } = useContext(SearchContext);

  const { data, isLoading } = useSearchProducts(searchValue);

  const productsData = data?.data;

  return (
    <div>
      {isLoading ? (
        <SkeletonCardList />
      ) : !searchValue ? (
        <span className="font-semibold">
          Type in the search bar to see results
        </span>
      ) : (
        <PageTitle className={'font-bold text-2xl mb-4'}>{`Search result${
          productsData?.total > 1 ? 's' : ''
        }: ${productsData?.total}`}</PageTitle>
      )}
      {productsData?.products.length > 0 && (
        <ProductsList products={productsData.products} />
      )}
    </div>
  );
};

export default SearchPage;
