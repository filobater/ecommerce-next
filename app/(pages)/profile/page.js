'use client';
import { useContext, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Avatar, message, Button, Modal } from 'antd';
import InputText from '@/app/components/Inputs/InputText';
import InputPassword from '@/app/components/Inputs/InputPassword';
import { AuthContext } from '@/app/context/AuthContext';
import { auth } from '@/app/firebase/firebaseConfig';
import {
  useUpdateEmail,
  useUpdateProfile,
  useUpdatePassword,
  useDeleteUser,
} from 'react-firebase-hooks/auth';
import { UserOutlined } from '@ant-design/icons';
import { onAuthStateChanged } from 'firebase/auth';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { storage } from '@/app/firebase/firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import Cookies from 'js-cookie';

const Profile = () => {
  const { user, AuthUser } = useContext(AuthContext);
  const [image, setImage] = useState({ preview: '', raw: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // update profile is for updating the name and the photo

  const [updateProfile, updatingProfile, errorUpdatingProfile] =
    useUpdateProfile(auth);

  const [updateEmail, updatingEmail, errorUpdatingEmail] = useUpdateEmail(auth);

  const [updatePassword, updating, errorUpdatingPassword] =
    useUpdatePassword(auth);

  const [messageApi, contextHolder] = message.useMessage();

  const successMsg = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
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

  const [deleteUser, deleting, errorDeletingUser] = useDeleteUser(auth);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const success = await deleteUser();
    if (success) {
      AuthUser(null);

      Cookies.remove('user');

      router.push('/');
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  // setting uploading function for the image to firebase

  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const storageRef = ref(storage, user?.uid + '.png');

  const upload = async () => {
    const selectedFile = image.raw;
    if (selectedFile) {
      await uploadFile(storageRef, selectedFile, {
        contentType: 'image/jpeg',
      });
    }
  };

  const initialValues = {
    email: user?.email,
    displayName: user?.displayName,
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email(),
    displayName: Yup.string().min(3, ' Must be more than 2 characters'),
    password: Yup.string().min(6, 'Must be 6 characters or more'),
  });

  const updateInformation = async (updateFunc, updateFuncArgs) => {
    const successUpdateInformation = await updateFunc(updateFuncArgs);
    if (successUpdateInformation) {
      onAuthStateChanged(auth, (user) => {
        AuthUser(user);
      });
      successMsg('Updated!');
    }
  };

  const onSubmit = async (values) => {
    const displayName = values.displayName;

    if (image.raw) {
      upload();
      const photoURL = await getDownloadURL(storageRef);
      updateInformation(updateProfile, { photoURL });
    }

    //update profile
    if (displayName !== initialValues.displayName) {
      updateInformation(updateProfile, { displayName });
    }

    const email = values.email;
    if (email !== initialValues.email) {
      updateInformation(updateEmail, email);
    }

    const password = values.password;

    if (password) {
      updateInformation(updatePassword, password);
    }
  };

  if (errorUpdatingEmail) errorUpdating(errorUpdatingEmail.message);
  if (errorUpdatingProfile) errorUpdating(errorUpdatingProfile.message);
  if (errorUpdatingPassword) errorUpdating(errorUpdatingPassword.message);
  if (errorDeletingUser) errorUpdating(errorDeletingUser.message);

  return (
    <div className="mt-20 p-8 flex-1">
      {contextHolder}
      <h1 className="capitalize font-bold text-3xl text-gray-700 m-auto ">
        profile
      </h1>
      <div className="flex mt-8 flex-col lg:flex-row gap-[7rem] justify-center ">
        <div className="flex flex-col items-center gap-2 ">
          {user?.photoURL && (
            <Image
              src={user.photoURL}
              className="w-16 h-16 rounded-full"
              alt="profile img"
              width={100}
              height={100}
            />
          )}

          {!user?.photoURL && <Avatar size={70} icon={<UserOutlined />} />}

          <h2 className="capitalize font-bold text-2xl w-max text-gray-700">
            {user?.displayName ? user?.displayName : 'your name'}
          </h2>
          <div className="flex items-center">
            <label
              htmlFor="photo-upload"
              className="mr-4 text-gray-700 font-semibold transition-all duration-300  cursor-pointer"
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

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Form className="space-y-5 ">
              <div className="flex items-center gap-y-5 gap-x-6 [&>*]:w-full flex-wrap md:flex-nowrap">
                <div>
                  <InputText
                    type={'text'}
                    label={'Name'}
                    name={'displayName'}
                  />
                  <ErrorMessage
                    name="displayName"
                    className="text-red-500"
                    component="div"
                  />
                </div>
                <div>
                  <InputText
                    type={'email'}
                    label={'email address'}
                    name={'email'}
                  />
                  <ErrorMessage
                    name="email"
                    className="text-red-500"
                    component="div"
                  />
                </div>
              </div>
              <div className="flex items-center gap-y-5 gap-x-6 [&>*]:w-full flex-wrap md:flex-nowrap "></div>
              <div>
                <InputPassword label={'update password'} name={'password'} />

                <ErrorMessage
                  name="password"
                  className="text-red-500"
                  component="div"
                />
              </div>
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

      <div className="flex justify-end">
        <Button type="primary" danger size="large" onClick={showModal}>
          Delete profile
        </Button>
      </div>
      <Modal
        title="Delete profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={[
          <Button
            key="cancel"
            size="large"
            className="py-2 px-3 text-sm font-medium !text-gray-800 bg-white rounded-lg border !border-gray-600 hover:!bg-gray-100  focus:!outline-none  focus:z-10    "
            onClick={handleCancel}
          >
            {' '}
            No, cancel
          </Button>,
          <Button
            key="ok"
            size="large"
            className="py-2 px-3 text-sm font-medium text-center !text-white !bg-red-600 rounded-lg hover:!bg-red-700 focus:!outline-none focus:!ring-red-300 "
            type="primary"
            onClick={handleOk}
          >
            Yes, Iam sure
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete your profile?</p>
      </Modal>
    </div>
  );
};

export default Profile;
