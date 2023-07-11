import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <Link href={`/productDetails/${product.id}`}>
      <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
        {/* Image & actions */}
        <div className="aspect-square rounded-xl bg-gray-100 relative">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={400}
            height={500}
            className="aspect-square object-cover rounded-md"
          />
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className="flex gap-x-6 justify-center">
              {/* <IconButton 
                  onClick={onPreview} 
                  icon={<Expand size={20} className="text-gray-600" />}
                />
                <IconButton
                  onClick={onAddToCart} 
                  icon={<ShoppingCart size={20} className="text-gray-600" />} 
                /> */}
            </div>
          </div>
        </div>
        {/* Description */}
        <div>
          <p className="font-semibold text-lg">{product.title}</p>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
        {/* Price & Reiew */}
        <div className="flex items-center justify-between">
          <p className="text-black flex items-center gap-2">
            <span className="font-semibold">{product.price}$</span>
            <span className="line-through text-gray-500 text-sm">
              {`${Math.round(
                product.price / (1 - product.discountPercentage / 100)
              )}$`}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
