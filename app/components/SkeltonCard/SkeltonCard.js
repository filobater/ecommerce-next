import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeltonCard = () => {
  return (
    <div>
      <Skeleton count={1} className="aspect-square object-cover rounded-md" />
      <Skeleton count={3} />
    </div>
  );
};

export default SkeltonCard;
