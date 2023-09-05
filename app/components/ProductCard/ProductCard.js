'use client';
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiCartAlt } from 'react-icons/bi';
import { message } from 'antd';

import { CartContext } from '@/app/context/CartContext';

const ProductCard = ({ product }) => {
  const [addToCart, setAddToCart] = useState(false);

  const { handleAddToCart, cart } = useContext(CartContext);

  const [messageApi, contextHolder] = message.useMessage();

  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
      duration: 0.8,
    });
  };

  const toggleCart = (id) => {
    handleAddToCart(id);
  };

  return (
    <div className="bg-white group rounded-xl border p-3 space-y-4 relative duration-200 hover:shadow-lg hover:shadow-slate-600">
      {contextHolder}
      <Link href={`/productDetails/${product.id}`}>
        {/* Image & actions */}
        <div className="aspect-square rounded-xl bg-gray-100 relative">
          <Image
            src={product.thumbnail}
            alt={product.title}
            placeholder="blur"
            blurDataURL={product.thumbnail}
            priority
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
                {`${(
                  product?.price /
                  (1 - product?.discountPercentage / 100)
                ).toFixed(2)}$`}
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
            <BiCartAlt />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
