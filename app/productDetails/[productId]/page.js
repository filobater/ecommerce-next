'use client';

import React from 'react';
import { Rate } from 'antd';
import ThumbnailSlider from '@/app/components/ThumbnailSlider/ThumbnailSlider';
import { useProductDetails } from '@/app/hooks/useProductDetails';

const ProductDetails = ({ params }) => {
  const { data } = useProductDetails(params.productId);

  const product = data?.data;
  console.log(product);

  return (
    <div className="flex lg:flex-nowrap flex-wrap justify-around items-baseline pt-5">
      <div className="left">
        <h1 className="font-bold text-2xl mb-8">Product details</h1>
        <ThumbnailSlider imgs={product?.images} productName={product?.title} />
      </div>
      <div className="right mt-8 ">
        <h2 className="font-bold text-3xl">{product?.title}</h2>
        <p className="text-gray-400 md:w-[75%] w-full ">
          {product?.description}
        </p>
        {product && (
          <div className="flex items-baseline gap-3">
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

        <p className="text-black flex flex-col items-start gap-1 ">
          <div className="flex gap-4 items-center">
            {' '}
            <span className="font-bold text-2xl">{product?.price}$</span>{' '}
            <span className="font-semibold bg-gray-950 text-white text-[14px] rounded p-1">
              {product?.discountPercentage}%
            </span>
          </div>
          <span className="line-through text-gray-500 text-normal">
            {`${Math.round(
              product?.price / (1 - product?.discountPercentage / 100)
            )}$`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
