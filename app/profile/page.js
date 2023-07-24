'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import InputText from '../components/Inputs/InputText';

const Profile = () => {
  return (
    <div className="mt-20 p-8 flex-1">
      <h1 className="capitalize font-bold text-3xl text-gray-700 m-auto ">
        profile
      </h1>
      <div className="flex mt-8 flex-col lg:flex-row gap-[7rem] justify-center ">
        <div className="flex flex-col items-center gap-2 ">
          {/* <Image
                    src={file ? file : '/assets/avatar.png'}
                    className="w-16 h-16 rounded-full"
                    alt="profile img"
                    width={100}
                    height={100}
                  /> */}
          <h2 className="capitalize font-bold text-2xl w-max text-gray-700">
            filobater
          </h2>
          <div className="flex items-center">
            <label
              htmlFor="photo-upload"
              className="mr-4 text-[#90a0e2] transition-all duration-300  cursor-pointer"
            >
              Upload Photo
            </label>
            <input
              id="photo-upload"
              type="file"
              className="hidden"
              // onChange={(e) => handleFileChange(e)}
              accept="image/*"
            />
          </div>
        </div>

        <Formik>
          {(formikProps) => (
            <Form className="space-y-5 ">
              <div className="flex items-center gap-y-5 gap-x-6 [&>*]:w-full flex-wrap md:flex-nowrap">
                <InputText type={'text'} label={'Name'} name={'name'} />

                <InputText
                  type={'text'}
                  label={'Phone number'}
                  name={'phoneNumber'}
                />
              </div>
              <div className="flex items-center gap-y-5 gap-x-6 [&>*]:w-full flex-wrap md:flex-nowrap ">
                <InputText
                  type={'email'}
                  label={'email address'}
                  name={'email'}
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 text-white bg-black hover:shadow-lg hover:shadow-black  rounded-lg duration-150  active:shadow-lg"
              >
                Save details
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
