'use client';
import FeaturedProducts from './layout/FeaturedProducts/FeaturedProducts';

const styleBg = {
  backgroundImage: 'url(/assets/bg1-min.jpg)',
  backgroundSize: 'cover',
  height: '90vh',
};

export default function Home() {
  return (
    <>
      <div
        style={styleBg}
        className="flex items-center justify-center rounded-md"
      >
        <h1 className="text-white font-bold text-6xl">Store</h1>
      </div>

      <FeaturedProducts />
    </>
  );
}
