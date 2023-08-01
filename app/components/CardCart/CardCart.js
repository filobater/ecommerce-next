import { useState } from 'react';
import Image from 'next/image';
import { AiFillCloseCircle } from 'react-icons/ai';
import { InputNumber } from 'antd';

const CardCart = ({ product, handleRemoveFromCart }) => {
  const [totalPrice, setTotalPrice] = useState(
    product.price * product.quantity
  );

  const handleChangeQty = (quantity) => {
    product.quantity = quantity;
    setTotalPrice(product.price * product.quantity);
  };
  product.totalPrice = totalPrice;

  return (
    <div className=" flex justify-between  items-center border-b border-gray-300 py-8">
      <Image
        src={product.thumbnail}
        width={150}
        height={150}
        className="rounded border border-gray-300"
      />
      <p>{product.title}</p>
      <p>{product.price}$</p>
      <InputNumber
        size="large"
        className="mt-4"
        min={1}
        max={product.stock}
        defaultValue={product.quantity}
        onChange={(qty) => handleChangeQty(qty)}
      />
      <p>{totalPrice}$</p>
      <button onClick={() => handleRemoveFromCart(product.id)}>
        <AiFillCloseCircle />
      </button>
    </div>
  );
};

export default CardCart;
