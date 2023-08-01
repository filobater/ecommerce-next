'use client';
import { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import CardCart from '../components/CardCart/CardCart';
import { Divider } from 'antd';
import Link from 'next/link';

const Cart = () => {
  const { cart, handleRemoveFromCart } = useContext(CartContext);
  console.log(cart);

  return (
    <div className="p-8">
      {cart.length > 0 ? (
        <>
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
        </>
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
