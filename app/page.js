'use client';
import FeaturedProducts from './components/layout/FeaturedProducts/FeaturedProducts';
import ProductsCarousel from './components/ProductsCarousel/ProductsCarousel';
import ThumbnailSlider from './components/ThumbnailSlider/ThumbnailSlider';

const images = [
  {
    src: '/assets/lap.jpg',
    thumbSrc: '/assets/lap.jpg',
  },
  {
    src: '/assets/mobile.jpg',
    thumbSrc: '/assets/mobile.jpg',
  },
  {
    src: '/assets/lap.jpg',
    thumbSrc: '/assets/lap.jpg',
  },
];

export default function Home() {
  return (
    <>
      <ProductsCarousel />
      <FeaturedProducts />
    </>
  );
}
