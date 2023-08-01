'use client';
import FeaturedProducts from './layout/FeaturedProducts/FeaturedProducts';

const styleBg = {
  backgroundImage: 'url(/assets/bg.jpg)',
  backgroundSize: 'cover',
  height: '90vh',
};

export default function Home() {
  return (
    <>
      <div style={styleBg} className="flex items-center px-14 rounded-md">
        <h1 className="text-white font-bold text-6xl">Store</h1>
      </div>

      <FeaturedProducts />
    </>
  );
}
