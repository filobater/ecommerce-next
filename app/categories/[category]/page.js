'use client';
import { useProductsCategory } from '@/app/hooks/useProductsCategory';

import ProductsList from '@/app/components/layout/ProductsList/ProductsList';

const CategoryPage = ({ params }) => {
  const { data } = useProductsCategory(params.category);

  const products = data?.data.products;
  return (
    <div>
      <h1 className="capitalize font-bold text-2xl mb-4">{params.category}</h1>
      <ProductsList products={products} />
    </div>
  );
};

export default CategoryPage;
