'use client';
import { useContext, useEffect } from 'react';
import { SearchContext } from '../context/SearchContext';
import { useSearchProducts } from '../hooks/useSearchProducts';
import { useRouter } from 'next/navigation';
import ProductsList from '../layout/ProductsList/ProductsList';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { CartContext } from '../context/CartContext';

const SearchPage = () => {
  const router = useRouter();
  const { searchValue } = useContext(SearchContext);

  if (!searchValue) {
    router.push('/');
    return <Skeleton count={4} />;
  }

  const { data, isLoading } = useSearchProducts(searchValue);

  const productsData = data?.data;

  const { setProducts } = useContext(CartContext);

  useEffect(() => {
    setProducts(productsData?.products);
  });

  return (
    <div>
      {isLoading ? (
        <Skeleton className="!w-[200px] mt-8" />
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
