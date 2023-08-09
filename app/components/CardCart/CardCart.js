import { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { AiFillCloseCircle } from 'react-icons/ai';
import { InputNumber } from 'antd';
import Link from 'next/link';
import { CartContext } from '@/app/context/CartContext';

const CardCart = ({ product, handleRemoveFromCart, handleChangeQty }) => {
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    product.totalPrice = product.price * product.quantity;
    setTotalPrice(product.totalPrice);
  }, [product.totalPrice]);

  return (
    <div className=" flex justify-between  items-center border-b border-gray-300 py-8">
      <div className="flex flex-wrap gap-4 items-center">
        <Link href={`/productDetails/${product.id}`}>
          <Image
            src={product.thumbnail}
            placeholder="blur"
            blurDataURL={product.thumbnail}
            width={150}
            height={150}
            className="rounded border border-gray-300 md:!w-[150px] md:!h-[150px] w-[70px] !h-[70px]"
            alt={product.title}
          />
        </Link>
        <p>{product.title}</p>
      </div>
      <p>{product.price}$</p>
      <InputNumber
        size="large"
        className="mt-4"
        min={1}
        max={product.stock}
        defaultValue={product.quantity}
        onChange={(qty) => handleChangeQty(qty, product.id)}
      />
      <p>{totalPrice}$</p>
      <button onClick={() => handleRemoveFromCart(product.id)}>
        <AiFillCloseCircle />
      </button>
    </div>
  );
};

export default CardCart;
