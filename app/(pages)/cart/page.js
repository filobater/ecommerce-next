'use client';
import { useContext, useEffect } from 'react';
import { CartContext } from '@/app/context/CartContext';

import CardCart from '@/app/components/CardCart/CardCart';
import { Divider } from 'antd';
import Link from 'next/link';
import Checkout from '@/app/components/Checkout/Checkout';

const Cart = () => {
  const { cart, handleRemoveFromCart } = useContext(CartContext);

  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl mb-8 ">
        Your cart: {cart.length} {cart.length > 1 ? 'items' : 'item'}
      </h1>
      {cart.length > 0 ? (
        <div className="flex justify-between flex-col lg:flex-row gap-12">
          <div className="basis-[56%] ">
            <ul className="flex items-center justify-between">
              <li>Image</li>
              <li>Name</li>
              <li>Price</li>
              <li>Quantity</li>
              <li>Total Price</li>
              <li>Actions</li>
            </ul>
            <Divider />
            {cart.reverse().map((product) => (
              <CardCart
                key={product.id}
                product={product}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>
          <div className="flex-1">
            <Checkout />
          </div>
        </div>
      ) : (
        <span>
          Go to home to add products{' '}
          <Link className="font-bold" href={'/'}>
            Home
          </Link>
        </span>
      )}
    </div>
  );
};

export default Cart;
