'use client';

import ProductsList from '../ProductsList/ProductsList';

import { useProducts } from '@/app/hooks/useProducts';
import SkeletonCardList from '../SkeletonCardList/SkeletonCardList';

const FeaturedProducts = () => {
  const { data, isError, error, isLoading } = useProducts();
  const products = data?.data.products;

  return (
    <div id="featured-products">
      <h2 className="font-bold text-2xl my-5">Featured Products</h2>
      {isLoading ? <SkeletonCardList /> : <ProductsList products={products} />}
    </div>
  );
};

export default FeaturedProducts;
