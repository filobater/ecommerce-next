'use client';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/app/context/CartContext';

import Item from '@/app/components/Item/Item';

import Link from 'next/link';
import Checkout from '@/app/components/Checkout/Checkout';
import PageTitle from '@/app/components/PageTitle/PageTitle';
import InformationList from '@/app/components/InformationList/InformationList';

const Cart = () => {
  const { cart, handleRemoveFromCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState();
  const [totalPriceAll, setTotalPriceAll] = useState();

  const handleQty = (quantity = 1, product, setQuantity) => {
    product.quantity = quantity;
    setQuantity(quantity);
    product.totalPrice = product.quantity * product.price;
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleChangeQty = (quantity = 1, productId) => {
    const product = cart.find((product) => product.id === productId);
    if (!quantity) {
      handleQty(1, product, setQuantity);
    } else {
      handleQty(quantity, product, setQuantity);
    }
  };

  useEffect(() => {
    if (cart?.length > 0) {
      setTotalPriceAll(
        cart
          .map((product) => product.totalPrice)
          .reduce((acc, cur) => acc + cur, 0)
      );
    }
  }, [quantity, cart]);

  return (
    <div className="md:p-8 p-2">
      <PageTitle className={'mb-8'}>
        My cart: {cart.length} {cart.length > 1 ? 'items' : 'item'}
      </PageTitle>
      {cart.length > 0 ? (
        <div className="flex justify-between flex-col lg:flex-row gap-12">
          <div className="basis-[56%] ">
            <InformationList>
              <li>Quantity</li>
              <li>Total price</li>
            </InformationList>

            {cart.map((product) => (
              <Item
                key={product.id}
                product={product}
                handleRemove={handleRemoveFromCart}
                handleChangeQty={handleChangeQty}
              />
            ))}
          </div>
          <div className="flex-1">
            <Checkout totalPrice={totalPriceAll} />
            <div className="text-red-800 text-center mt-4">
              <p>
                to test the payment <br /> use 4242 4242 4242 4242, any future
                date and any three numbers
              </p>
            </div>
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
