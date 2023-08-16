import React from 'react';

const PageTitle = ({ children, className }) => {
  return <h1 className={`font-bold text-2xl mb-4 ${className}`}>{children}</h1>;
};

export default PageTitle;
