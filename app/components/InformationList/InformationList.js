import React from 'react';

const InformationList = ({ children }) => {
  return (
    <ul className="flex items-center justify-between gap-4 border-b pb-8">
      <li>Product details</li>
      <li>Price</li>
      {children}
      <li>Actions</li>
    </ul>
  );
};

export default InformationList;
