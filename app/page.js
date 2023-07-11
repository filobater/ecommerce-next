'use client';
import FeaturedProducts from './layout/FeaturedProducts/FeaturedProducts';
import ProductsCarousel from './components/ProductsCarousel/ProductsCarousel';

// const images = [
//   {
//     src: '/assets/lap.jpg',
//     thumbSrc: '/assets/lap.jpg',
//   },
//   {
//     src: '/assets/mobile.jpg',
//     thumbSrc: '/assets/mobile.jpg',
//   },
//   {
//     src: '/assets/shoes.jpg',
//     thumbSrc: '/assets/shoes.jpg',
//   },
// ];

export default function Home() {
  return (
    <>
      <ProductsCarousel />
      <FeaturedProducts />
    </>
  );
}
