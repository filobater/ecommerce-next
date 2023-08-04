'use client';
import { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import InputText from '../components/Inputs/InputText';
import { AuthContext } from '../context/AuthContext';
import InputPassword from '../components/Inputs/InputPassword';
import Image from 'next/image';
import { auth } from '@/app/firebase/firebaseConfig';
import { useUpdateEmail, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Avatar, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  const [image, setImage] = useState({ preview: '', raw: '' });

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const [updateProfile, updatingProfile, errorUpdatingProfile] =
    useUpdateProfile(auth);
  const [updateEmail, updatingEmail, errorUpdatingEmail] = useUpdateEmail(auth);

  const [messageApi, contextHolder] = message.useMessage();

  const successUpdating = () => {
    messageApi.open({
      type: 'success',
      content: 'updated',
      duration: 0.5,
    });
  };
  const errorUpdating = (errorMsg) => {
    messageApi.open({
      type: 'error',
      content: errorMsg,
      duration: 2,
    });
  };

  const { user, AuthUser } = useContext(AuthContext);

  const userData = user?.providerData[0];

  const initialValues = {
    email: user?.email,
    displayName: userData?.displayName,
  };

  const updateInformation = async (updateFunc, updateFuncArgs) => {
    const successUpdateUpdateInformation = await updateFunc(updateFuncArgs);
    if (successUpdateUpdateInformation) {
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        AuthUser(user);
      });
      successUpdating();
    }
  };

  const onSubmit = (values) => {
    // const formData = new FormData();
    // formData.append('photoURL', image.preview);

    const displayName = values.displayName;
    //update profile
    if (displayName !== initialValues.displayName) {
      updateInformation(updateProfile, { displayName });
    }

    const email = values.email;
    if (email !== initialValues.email) {
      updateInformation(updateEmail, email);
    }
  };

  if (errorUpdatingEmail) errorUpdating(errorUpdatingEmail.message);
  if (errorUpdatingProfile) errorUpdating(errorUpdatingProfile.message);

  return (
    <div className="mt-20 p-8 flex-1">
      {contextHolder}
      <h1 className="capitalize font-bold text-3xl text-gray-700 m-auto ">
        profile
      </h1>
      <div className="flex mt-8 flex-col lg:flex-row gap-[7rem] justify-center ">
        <div className="flex flex-col items-center gap-2 ">
          {/* <Image
            src={image.preview ? image.preview : ''}
            className="w-16 h-16 rounded-full"
            alt="profile img"
            width={100}
            height={100}
          /> */}

          <Avatar size={70} icon={<UserOutlined />} />
          <h2 className="capitalize font-bold text-2xl w-max text-gray-700">
            {userData?.displayName ? userData?.displayName : 'your name'}
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
              onChange={(e) => handleFileChange(e)}
              accept="image/*"
            />
          </div>
        </div>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formikProps) => (
            <Form className="space-y-5 ">
              <div className="flex items-center gap-y-5 gap-x-6 [&>*]:w-full flex-wrap md:flex-nowrap">
                <InputText type={'text'} label={'Name'} name={'displayName'} />
                <InputText
                  type={'email'}
                  label={'email address'}
                  name={'email'}
                />
              </div>
              <div className="flex items-center gap-y-5 gap-x-6 [&>*]:w-full flex-wrap md:flex-nowrap "></div>
              <InputPassword label={'update password'} name={'password'} />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-black hover:shadow-lg hover:shadow-black  rounded-lg duration-150  active:shadow-lg"
              >
                {updatingProfile ? 'Save details...' : 'Save details'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
