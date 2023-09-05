'use client';
import { useContext, useState } from 'react';
import { WishlistContext } from '@/app/context/WishlistContext';
import InformationList from '@/app/components/InformationList/InformationList';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import Item from '@/app/components/Item/Item';
import PageTitle from '@/app/components/PageTitle/PageTitle';
import { CartContext } from '@/app/context/CartContext';
import { AuthContext } from '@/app/context/AuthContext';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Wishlist = () => {
  const { wishlist, handleRemoveFromWishlist, loadingWishlist } =
    useContext(WishlistContext);
  const { handleAddToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;

  return (
    <>
      {!user ? (
        <p className="text-center font-semibold text-lg">
          You need to be logged in!
        </p>
      ) : (
        <>
          <div className=" flex lg:flex-row flex-col-reverse gap-16 justify-center  lg:p-8 p-0">
            {wishlist.length > 0 && (
              <div className="flex-1">
                <InformationList>
                  <li>Price</li>
                </InformationList>
                {wishlist.map((product) => (
                  <Item
                    key={product.id}
                    product={product}
                    handleRemove={handleRemoveFromWishlist}
                  >
                    <button
                      onClick={() => handleAddToCart(product.id, product)}
                    >
                      <AiOutlineShoppingCart className="text-2xl" />
                    </button>
                  </Item>
                ))}
              </div>
            )}
            {loadingWishlist ? (
              <Spin indicator={antIcon} />
            ) : (
              <div className="flex flex-col items-center gap-4 justify-center">
                <AiOutlineHeart className="text-8xl" />
                <PageTitle className={'lg:text-5xl text-3xl'}>
                  My wishlist
                </PageTitle>
                {wishlist.length === 0 && (
                  <p className="font-semibold">There is no items to show</p>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Wishlist;
