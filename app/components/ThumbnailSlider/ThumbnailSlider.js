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
    <div className="flex flex-col justify-center items-center ">
      <Image
        src={sliderData}
        width={500}
        height={500}
        className="mb-5 rounded-lg "
      />
      <div className="flex gap-4 ">
        {imgs?.map((img, i) => (
          <Image
            key={i}
            onClick={() => handleClick(i)}
            src={img}
            width={100}
            height={100}
            alt={productName + ' ' + i}
            className="rounded-lg  border-black border-2 cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default ThumbnailSlider;
