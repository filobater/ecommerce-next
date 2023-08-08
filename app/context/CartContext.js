//************ not completed yet ******************/

'use client';
import { useState, useEffect, createContext } from 'react';
import { message } from 'antd';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  const msg = (type, msg) => {
    messageApi.open({
      type: type,
      content: msg,
      duration: 0.8,
    });
  };

  const handleAddToCart = (productId) => {
    const productAddToCart = products.find(
      (product) => product.id === productId
    );

    const existedProduct = cart.find((product) => product.id === productId);

    if (existedProduct) {
      msg('warning', 'Item already in the cart');
    }

    if (!existedProduct) {
      msg('success', 'Item added to cart');
      setCart([...cart, { ...productAddToCart, quantity: 1, isInCart: true }]);
    }
  };

  console.log(cart);

  const handleRemoveFromCart = (productId) => {
    const filteredCart = cart.filter((product) => product.id !== productId);
    setCart([...filteredCart]);
  };

  return (
    <CartContext.Provider
      value={{
        handleAddToCart,
        handleRemoveFromCart,
        cart,
        setProducts,
        setCart,
      }}
    >
      {contextHolder}
      {children}
    </CartContext.Provider>
  );
};
