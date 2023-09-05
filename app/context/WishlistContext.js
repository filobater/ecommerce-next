'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { message } from 'antd';
import { AuthContext } from './AuthContext';
import { db } from '../firebase/firebaseConfig';

import { setDoc, doc, getDoc } from 'firebase/firestore';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const { user } = useContext(AuthContext);

  const msg = (type, msg) => {
    messageApi.open({
      type: type,
      content: msg,
      duration: 1.5,
    });
  };

  const handleAddData = () => {
    if (user?.uid) {
      setDoc(doc(db, user.uid + 'products', 'wishlist'), {
        products: wishlist || [],
      })
        .then(() => console.log('data added'))
        .catch((err) => alert(err));
    }
  };

  const getData = async () => {
    const docRef = doc(db, user.uid + 'products', 'wishlist');

    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.exists()) {
        setWishlist(docSnap.data().products);
      } else {
        setWishlist([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingWishlist(false);
    }
  };

  useEffect(() => {
    handleAddData();
  }, [wishlist]);

  useEffect(() => {
    if (user?.uid) {
      getData();
    }
  }, [user]);

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

  return (
    <WishlistContext.Provider
      value={{
        handleAddToWishlist,
        wishlist,
        handleRemoveFromWishlist,
        loadingWishlist,
      }}
    >
      {contextHolder}
      {children}
    </WishlistContext.Provider>
  );
};
