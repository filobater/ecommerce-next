//************ not completed yet ******************/

'use client';
import { useState, useEffect, createContext } from 'react';
import { useProducts } from '../hooks/useProducts';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const handleAddToCart = (productId) => {
    const productAddToCart = products.find(
      (product) => product.id === productId
    );

    productAddToCart.quantity = 1;

    setCart([...cart, productAddToCart]);
  };

  const handleRemoveFromCart = (productId) => {
    const filteredCart = cart.filter((product) => product.id !== productId);
    setCart([...filteredCart]);
  };

  console.log(cart);

  return (
    <CartContext.Provider
      value={{ handleAddToCart, handleRemoveFromCart, cart, setProducts }}
    >
      {children}
    </CartContext.Provider>
  );
};
