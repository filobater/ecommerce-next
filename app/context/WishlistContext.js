'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { message } from 'antd';
import { AuthContext } from './AuthContext';
import { db } from '../firebase/firebaseConfig';

import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore';

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

  const collectionRef = collection(db, user?.uid + 'products');

  const handleAddData = () => {
    if (user?.uid) {
      setDoc(doc(db, user.uid + 'products', 'wishlist'), {
        products: wishlist.length > 0 && wishlist,
      })
        .then(() => console.log('data added'))
        .catch((err) => console.log(err));
    }
  };

  // const getData = () => {
  //   try {
  //     onSnapshot(collectionRef, (data) => {
  //       console.log(
  //         data.docs.map((doc) => {
  //           return doc.data().products;
  //         })
  //       );
  //       // data.docs.map((doc) => {
  //       //   if (doc.data().products.length > 0) {
  //       //     setWishlist(doc.data().products);
  //       //   }
  //       // });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   // console.log(wishlist);
  // };

  useEffect(() => {
    handleAddData();
  }, [wishlist]);

  // useEffect(() => {
  //   getData();
  // });

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
      value={{ handleAddToWishlist, wishlist, handleRemoveFromWishlist }}
    >
      {contextHolder}
      {children}
    </WishlistContext.Provider>
  );
};
