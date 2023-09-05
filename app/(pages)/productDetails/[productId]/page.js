'use client';

import { useState, useContext } from 'react';
import { Rate, InputNumber } from 'antd';
import ThumbnailSlider from '@/app/components/ThumbnailSlider/ThumbnailSlider';
import { useProductDetails } from '@/app/hooks/useProductDetails';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BiCartAlt } from 'react-icons/bi';
import { CartContext } from '@/app/context/CartContext';
import { message } from 'antd';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import PageTitle from '@/app/components/PageTitle/PageTitle';
import { WishlistContext } from '@/app/context/WishlistContext';

const ProductDetails = ({ params }) => {
  const [quantity, setQuantity] = useState(1);

  const { handleAddToWishlist } = useContext(WishlistContext);

  const addToWishlist = (product, id) => {
    handleAddToWishlist(product, id);
    // setAddToWishlist(!addToWishlist);
  };

  const { data, isLoading } = useProductDetails(params.productId);

  const product = data?.data;

  const { cart, setCart, handleAddToCart } = useContext(CartContext);

  return (
    <>
      <PageTitle className={'mb-8'}>Product details</PageTitle>
      <div
        onClick={() => addToWishlist(product, product.id)}
        className={` bg-white p-2 w-fit rounded-md cursor-pointer text-4xl ml-auto 
         'text-black'
        `}
        title="Add to wishlist"
      >
        {<AiOutlineHeart />}
      </div>
      <div className="flex lg:flex-nowrap flex-wrap gap-8 lg:justify-normal md:justify-center items-start pt-5">
        <div className="left md:basis-[55%] basis-full">
          {isLoading ? (
            <Skeleton className="aspect-square " />
          ) : (
            <ThumbnailSlider
              imgs={product.images}
              productName={product.title}
            />
          )}
        </div>

        <div className="right mt-8 flex-1">
          {isLoading ? (
            <Skeleton count={8} className="md:w-[70%] w-[100%]" />
          ) : (
            <>
              <h2 className="font-bold text-3xl mb-3">{product?.title}</h2>
              <p className="text-gray-600 md:w-[75%] w-full mb-3 ">
                {product?.description}
              </p>

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
                  {`${(
                    product?.price /
                    (1 - product?.discountPercentage / 100)
                  ).toFixed(2)}$`}
                </span>
                <p className="font-semibold mt-2">
                  Available: {product?.stock}
                </p>
                <div className="flex flex-wrap gap-4">
                  <InputNumber
                    size="large"
                    className="mt-4"
                    min={1}
                    max={product.stock}
                    defaultValue={1}
                    onChange={(value) => setQuantity(value)}
                    aria-label="Quantity"
                  />
                  <button
                    onClick={() =>
                      handleAddToCart(product.id, product, quantity)
                    }
                    className=" h-[3.75rem] flex p-2 px-12 gap-4 items-center bg-black  hover:shadow-xl hover:shadow-slate-800 transition-all text-white text-lg rounded-lg"
                  >
                    <BiCartAlt className="text-xl" /> Add to cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
