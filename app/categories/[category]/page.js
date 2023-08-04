'use client';
import { useContext, useEffect } from 'react';
import { useProductsCategory } from '@/app/hooks/useProductsCategory';

import ProductsList from '@/app/layout/ProductsList/ProductsList';
import { CartContext } from '@/app/context/CartContext';

const CategoryPage = ({ params }) => {
  const { data, isLoading } = useProductsCategory(params.category);

  const products = data?.data.products;
  const { setProducts } = useContext(CartContext);

  useEffect(() => {
    setProducts(products);
  });

  return (
    <div>
      <h1 className="capitalize font-bold text-2xl mb-4">{params.category}</h1>
      <ProductsList products={products} />
    </div>
  );
};

export default CategoryPage;
