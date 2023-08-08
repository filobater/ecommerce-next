import { useContext, useEffect } from 'react';
import ProductCard from '@/app/components/ProductCard/ProductCard';
import { CartContext } from '@/app/context/CartContext';

const ProductsList = ({ products }) => {
  const { setProducts } = useContext(CartContext);

  useEffect(() => {
    if (products?.length > 0) {
      setProducts(products);
    }
  });

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 ">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
