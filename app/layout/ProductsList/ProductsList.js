import { useContext, useEffect } from 'react';
import ProductCard from '@/app/components/ProductCard/ProductCard';
import { CartContext } from '@/app/context/CartContext';

const ProductsList = ({ products }) => {
  const { handleAddToCart, handleRemoveFromCart, cart, setProducts } =
    useContext(CartContext);

  useEffect(() => {
    setProducts(products);
  });

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 ">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      ))}
    </div>
  );
};

export default ProductsList;
