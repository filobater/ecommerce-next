'use client';
import { useContext, useState } from 'react';
import { WishlistContext } from '@/app/context/WishlistContext';
import InformationList from '@/app/components/InformationList/InformationList';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import Item from '@/app/components/Item/Item';
import PageTitle from '@/app/components/PageTitle/PageTitle';
import { CartContext } from '@/app/context/CartContext';
import { AuthContext } from '@/app/context/AuthContext';

const Wishlist = () => {
  const { wishlist, handleRemoveFromWishlist } = useContext(WishlistContext);
  const { handleAddToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  console.log(user);

  console.log(wishlist);

  return (
    <>
      {!user ? (
        <p>You need to be logged in!</p>
      ) : (
        <>
          <div className=" flex gap-16 justify-center  p-8">
            {wishlist.length > 0 && (
              <div className="flex-1">
                <InformationList />
                {wishlist.map((product) => (
                  <Item
                    key={product.id}
                    product={product}
                    handleRemove={handleRemoveFromWishlist}
                  >
                    <button onClick={() => handleAddToCart(product.id)}>
                      <AiOutlineShoppingCart className="text-2xl" />
                    </button>
                  </Item>
                ))}
              </div>
            )}
            <div className="flex flex-col items-center gap-4 justify-center">
              <AiOutlineHeart className="text-8xl" />
              <PageTitle className={'text-5xl'}>My wishlist</PageTitle>
              {wishlist.length === 0 && (
                <p className="font-semibold">There is no items to show</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Wishlist;
