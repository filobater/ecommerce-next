'use client';

import ProductCard from '@/app/components/ProductCard/ProductCard';
import { CartContext } from '@/app/context/CartContext';
import { useProducts } from '@/app/hooks/useProducts';
import { useContext, useEffect } from 'react';

const FeaturedProducts = () => {
  const { data, isError, error } = useProducts();
  const products = data?.data.products;
  const { setProducts } = useContext(CartContext);
  useEffect(() => {
    setProducts(products);

    return () => {
      setProducts([]);
    };
  });

  return (
    <div id="featured-products">
      <h2 className="font-bold text-2xl my-5">Featured Products</h2>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 ">
        {products?.slice(8, 16).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
