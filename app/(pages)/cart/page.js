'use client';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/app/context/CartContext';

import CardCart from '@/app/components/CardCart/CardCart';
import { Divider } from 'antd';
import Link from 'next/link';
import Checkout from '@/app/components/Checkout/Checkout';

const Cart = () => {
  const { cart, handleRemoveFromCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState();
  const [totalPriceAll, setTotalPriceAll] = useState();

  const handleChangeQty = (quantity, productId) => {
    const product = cart.find((product) => product.id === productId);
    product.quantity = quantity;
    setQuantity(quantity);
    product.totalPrice = product.quantity * product.price;
  };

  useEffect(() => {
    if (cart?.length > 0) {
      setTotalPriceAll(
        cart
          .map((product) => product.totalPrice)
          .reduce((acc, cur) => acc + cur, 0)
      );
    }
  }, [quantity]);

  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl mb-8 ">
        Your cart: {cart.length} {cart.length > 1 ? 'items' : 'item'}
      </h1>
      {cart.length > 0 ? (
        <div className="flex justify-between flex-col lg:flex-row gap-12">
          <div className="basis-[56%] ">
            <ul className="flex items-center justify-between gap-4 ">
              <li>Image</li>
              <li>Name</li>
              <li>Price</li>
              <li>Quantity</li>
              <li>Total Price</li>
              <li>Actions</li>
            </ul>
            <Divider />
            {cart.map((product) => (
              <CardCart
                key={product.id}
                product={product}
                handleRemoveFromCart={handleRemoveFromCart}
                handleChangeQty={handleChangeQty}
              />
            ))}
          </div>
          <div className="flex-1">
            <Checkout totalPrice={totalPriceAll} />
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
