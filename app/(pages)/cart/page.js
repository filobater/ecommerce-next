'use client';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/app/context/CartContext';

import ItemCart from '../../components/ItemCart/ItemCart';
import { Divider } from 'antd';
import Link from 'next/link';
import Checkout from '@/app/components/Checkout/Checkout';
import PageTitle from '@/app/components/PageTitle/PageTitle';

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
    <div className="md:p-8 p-2">
      <PageTitle className={'mb-8'}>
        Your cart: {cart.length} {cart.length > 1 ? 'items' : 'item'}
      </PageTitle>
      {cart.length > 0 ? (
        <div className="flex justify-between flex-col lg:flex-row gap-12">
          <div className="basis-[56%] ">
            <ul className="flex items-center justify-between gap-4 border-b pb-8">
              <li>Product details</li>
              <li>Price</li>
              <li>Quantity</li>
              <li>Total Price</li>
              <li>Actions</li>
            </ul>

            {cart.map((product) => (
              <ItemCart
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
