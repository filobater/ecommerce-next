'use client';

import { useState } from 'react';
import { Rate, InputNumber } from 'antd';
import ThumbnailSlider from '@/app/components/ThumbnailSlider/ThumbnailSlider';
import { useProductDetails } from '@/app/hooks/useProductDetails';
import { useProductsCategory } from '@/app/hooks/useProductsCategory';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ProductsList from '@/app/layout/ProductsList/ProductsList';
import { BiCartAlt } from 'react-icons/bi';

const ProductDetails = ({ params }) => {
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading } = useProductDetails(params.productId);

  const product = data?.data;

  const { data: relatedProducts } = useProductsCategory(product?.category);
  const filteredProducts = relatedProducts?.data?.products.filter(
    (relatedProduct) => relatedProduct.id !== product.id
  );
  const handleAddToCartWithQuantity = () => {
    console.log(quantity);
  };
  return (
    <>
      <h1 className="font-bold text-2xl mb-8">Product details</h1>
      <div className="flex lg:flex-nowrap flex-wrap gap-4 lg:justify-normal md:justify-center items-start pt-5">
        <div className="left md:basis-[55%] basis-full">
          {isLoading ? (
            <Skeleton className="lg:!w-[500px] lg:!h-[500px] !w-[400px] !h-[400px]" />
          ) : (
            <ThumbnailSlider
              imgs={product.images}
              productName={product.title}
            />
          )}
        </div>

        <div className="right mt-8 ">
          <h2 className="font-bold text-3xl mb-2">
            {product?.title || <Skeleton className="!w-[200px]" />}
          </h2>
          <p className="text-gray-400 md:w-[75%] w-full mb-3 ">
            {product?.description || (
              <Skeleton count={3} className="!w-[300px]" />
            )}
          </p>

          {isLoading ? (
            <Skeleton className="!w-[300px]" />
          ) : (
            <div className="flex items-baseline gap-3 mb-3">
              <Rate
                disabled
                defaultValue={product.rating}
                allowHalf
                className="text-yellow-500"
              />
              <span className="font-semibold text-gray-600">
                ({product.rating})
              </span>
            </div>
          )}

          {isLoading ? (
            <Skeleton className="!w-[100px]" />
          ) : (
            <div className="text-black flex flex-col items-start gap-1 ">
              <div className="flex gap-4 items-center">
                {' '}
                <span className="font-bold text-2xl">
                  {product?.price}$
                </span>{' '}
                <span className="font-semibold bg-gray-950 text-white text-[14px] rounded p-1">
                  {product?.discountPercentage}%
                </span>
              </div>
              <span className="line-through text-gray-500 text-normal">
                {`${Math.round(
                  product?.price / (1 - product?.discountPercentage / 100)
                )}$`}
              </span>
              <p className="font-semibold mt-2">Available: {product?.stock}</p>
              <div className="flex gap-4">
                <InputNumber
                  size="large"
                  className="mt-4"
                  min={1}
                  max={product.stock}
                  defaultValue={1}
                  onChange={(value) => setQuantity(value)}
                />
                <button
                  onClick={handleAddToCartWithQuantity}
                  className="flex p-2 px-12 gap-4 items-center bg-black  hover:shadow-xl hover:shadow-slate-800 transition-all text-white text-lg rounded-lg"
                >
                  <BiCartAlt className="text-xl" /> Add to cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-20" id="related-products">
        <h2 className="font-bold text-xl mb-4">Related products</h2>
        <ProductsList products={filteredProducts} />
      </div>
    </>
  );
};

export default ProductDetails;
