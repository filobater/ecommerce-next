import React from 'react';
import LabelInput from './LabelInput';
import { Field } from 'formik';

const InputText = ({ label, type, name }) => {
  return (
    <div>
      <LabelInput>{label}</LabelInput>

      <Field
        type={type}
        name={name}
        className="!border-[#9BA4B5] w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border  !shadow-sm rounded-lg text-base mb-2"
      />
    </div>
  );
};

export default InputText;
