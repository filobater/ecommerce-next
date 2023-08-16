import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AiFillCloseCircle } from 'react-icons/ai';
import { InputNumber } from 'antd';
import Link from 'next/link';

const ItemCart = ({ product, handleRemoveFromCart, handleChangeQty }) => {
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    product.totalPrice = product.price * product.quantity;
    setTotalPrice(product.totalPrice);
  }, [product.totalPrice]);

  return (
    <div className=" flex justify-between  items-baseline border-b border-gray-300 py-8 gap-5">
      <div className="flex flex-col justify-center gap-3">
        <Image
          src={product.thumbnail}
          placeholder="blur"
          blurDataURL={product.thumbnail}
          width={150}
          height={150}
          className=" object-cover rounded border border-gray-300 md:!w-[80px] md:!h-[80px] w-[60px] !h-[60px]"
          alt={product.title}
        />
        <Link
          href={`/productDetails/${product.id}`}
          className="underline hover:no-underline"
        >
          <p>{product.title}</p>
        </Link>
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

export default ItemCart;
