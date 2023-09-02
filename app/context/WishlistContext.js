'use client';

import { createContext, useState, useContext } from 'react';
import { message } from 'antd';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const { user } = useContext(AuthContext);

  const msg = (type, msg) => {
    messageApi.open({
      type: type,
      content: msg,
      duration: 1.5,
    });
  };

  const handleAddToWishlist = (product, productId) => {
    if (user) {
      const existedProduct = wishlist.find(
        (product) => product.id === productId
      );

      if (existedProduct) {
        msg('warning', 'Item already in wishlist');
      }

      if (!existedProduct) {
        msg('success', 'Item added to wishlist');

        setWishlist([...wishlist, { ...product, Wishlisted: true }]);
      }
    } else {
      msg('warning', 'You need to be logged in!');
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    const filteredWishlist = wishlist.filter(
      (product) => product.id !== productId
    );
    setWishlist([...filteredWishlist]);
  };

  console.log(wishlist);
  return (
    <WishlistContext.Provider
      value={{ handleAddToWishlist, wishlist, handleRemoveFromWishlist }}
    >
      {contextHolder}
      {children}
    </WishlistContext.Provider>
  );
};
