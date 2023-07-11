'use client';
import React from 'react';
import ProductCard from '@/app/components/ProductCard/ProductCard';
import { useProducts } from '@/app/hooks/useProducts';

const FeaturedProducts = () => {
  const { data, isError, error } = useProducts();
  const products = data?.data.products;

  // console.log(products.filter((product) => product.category === 'smartphones'));

  return (
    <div id="featured-products">
      <h2 className="font-bold text-2xl my-5">Featured Products</h2>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 ">
        {products?.slice(8, 16).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
