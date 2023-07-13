'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ThumbnailSlider = ({ imgs, productName }) => {
  const [sliderData, setSliderData] = useState('');

  useEffect(() => {
    setSliderData(imgs?.at(0));
  }, [imgs]);

  const handleClick = (index) => {
    const slider = imgs[index];
    setSliderData(slider);
  };

  return (
    <div className="flex flex-col justify-center lg:items-start items-center ">
      {sliderData && (
        <Image
          src={sliderData}
          width={500}
          height={500}
          className="mb-5 rounded-lg !h-[400px]"
          alt={`${productName ? productName : 'product image'}`}
        />
      )}
      <div className="flex flex-wrap gap-4 ">
        {imgs?.map((img, i) => (
          <Image
            key={i}
            onClick={() => handleClick(i)}
            src={img}
            width={100}
            height={100}
            alt={`${productName ? productName : 'product image'}`}
            className={`rounded-lg  cursor-pointer md:!w-[100px] md:!h-[100px] w-[70px] !h-[70px] ${
              sliderData === img
                ? 'border-black border-2 opacity-100'
                : ' opacity-50'
            } hover:opacity-100 hover:border-black hover:border-2`}
          />
        ))}
      </div>
    </div>
  );
};

export default ThumbnailSlider;
