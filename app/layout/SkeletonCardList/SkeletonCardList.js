import React from 'react';
import SkeltonCard from '@/app/components/SkeltonCard/SkeltonCard';

const SkeletonCardList = () => {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
    </div>
  );
};

export default SkeletonCardList;
