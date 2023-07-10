import React from 'react';
import ProductCard from '../../ProductCard/ProductCard';

const ProductsList = ({ products }) => {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 ">
      {products?.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductsList;
