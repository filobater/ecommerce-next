//************ not completed yet ******************/

'use client';
import { useState, useEffect, createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const handleAddToCart = (productId) => {
    const productAddToCart = products.find(
      (product) => product.id === productId
    );

    productAddToCart.quantity = 1;
    productAddToCart.isInCart = true;

    setCart([...cart, productAddToCart]);
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
      {children}
    </CartContext.Provider>
  );
};
