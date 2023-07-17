import React from 'react';

const LabelInput = ({ children }) => {
  return (
    <label className="font-medium capitalize text-gray-800">{children}</label>
  );
};

export default LabelInput;
