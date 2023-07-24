'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiCartAlt, BiSolidCartAlt } from 'react-icons/bi';
import { message } from 'antd';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const ProductCard = ({ product, handleAddToCart, handleRemoveFromCart }) => {
  const [addToCart, setAddToCart] = useState(false);
  const [addToWishlist, setAddToWishlist] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const successAdd = () => {
    messageApi.open({
      type: 'success',
      content: 'Item added to cart',
      duration: 0.8,
    });
  };
  const successRemove = () => {
    messageApi.open({
      type: 'success',
      content: 'Item removed from cart',
      duration: 0.8,
    });
  };

  const toggleCart = (id) => {
    if (!addToCart) {
      handleAddToCart(id);
      setAddToCart(true);
      successAdd();
    }
    if (addToCart) {
      handleRemoveFromCart(id);
      setAddToCart(false);
      successRemove();
    }
  };
  const toggleWishlist = () => {
    setAddToWishlist(!addToWishlist);
  };

  return (
    <div className="bg-white group rounded-xl border p-3 space-y-4 relative group">
      {contextHolder}
      <Link href={`/productDetails/${product.id}`}>
        {/* Image & actions */}
        <div className="aspect-square rounded-xl bg-gray-100 relative">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="aspect-square object-cover rounded-md"
          />
        </div>
      </Link>
      {/* Description */}
      <div className="flex items-center justify-between gap-3">
        <Link href={`/productDetails/${product.id}`}>
          <div>
            <p className="font-semibold text-lg">{product.title}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          {/* Price & Reiew */}
          <div className="flex items-center justify-between">
            <p className="text-black flex items-center gap-2">
              <span className="font-semibold">{product.price}$</span>
              <span className="line-through text-gray-500 text-sm">
                {`${Math.round(
                  product.price / (1 - product.discountPercentage / 100)
                )}$`}
              </span>
            </p>
          </div>
        </Link>
        <div
          onClick={() => {
            toggleCart(product.id);
          }}
          className="bg-black p-2 rounded-md cursor-pointer"
        >
          <span className="text-white text-2xl">
            {addToCart ? <BiSolidCartAlt /> : <BiCartAlt />}
          </span>
        </div>
      </div>
      <div
        onClick={toggleWishlist}
        className={` transition-all opacity-0 group-hover:opacity-100 bg-white p-2 rounded-md absolute drop-shadow-lg shadow-2xl shadow-black top-0 right-4 cursor-pointer text-2xl ${
          addToWishlist ? 'text-red-500' : 'text-black'
        }`}
      >
        {addToWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
      </div>
    </div>
  );
};

export default ProductCard;
