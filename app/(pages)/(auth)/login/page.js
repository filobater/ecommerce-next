'use client';
import { useContext, useEffect } from 'react';
import { Button, Divider, message } from 'antd';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputPassword from '@/app/components/Inputs/InputPassword';
import InputText from '@/app/components/Inputs/InputText';

import GoogleBtn from '@/app/components/Buttons/GoogleBtn/GoogleBtn';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/firebaseConfig';
import { AuthContext } from '@/app/context/AuthContext';
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';

const LoginPage = () => {
  const router = useRouter();
  // message success when he logged in
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Your are logged in',
      onClose: () => router.push('/'),
      duration: 0.6,
    });
  };

  const errorAuth = () => {
    messageApi.open({
      type: 'error',
      content: error.message,
      duration: 2,
    });
  };

  const { AuthUser, user: userContext } = useContext(AuthContext);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required('Your Email'),
    password: Yup.string().required('Type your password'),
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth);

  const onSubmit = (values, { resetForm }) => {
    signInWithEmailAndPassword(values.email, values.password);
    resetForm();
  };

  const handleLogin = (user) => {
    AuthUser(user);
  };

  useEffect(() => {
    if (user) {
      success();
    }

    if (user) {
      handleLogin(user.user);
    }
    if (userGoogle) {
      handleLogin(userGoogle.user);
    }
  }, [user]);

  if (error) {
    errorAuth();
  }

  return (
    <main className="w-full flex gap-4 flex-col-reverse py-16 px-4">
      {contextHolder}
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="w-full max-w-lg space-y-8 px-4  text-gray-600 sm:px-0">
          <div>
            <div className="mt-5 space-y-2">
              <p className="text-black text-lg">
                You don't have an account?{' '}
                <Link className="font-semibold underline" href="/signup">
                  Signup
                </Link>
              </p>
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Login
              </h3>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formikProps) => (
              <Form className="space-y-5">
                <InputText name={'email'} type={'email'} label={'Email'} />
                <ErrorMessage
                  name="email"
                  className="text-red-500 !m-0"
                  component="div"
                />

                <InputPassword name={'password'} label={'password'} />
                <ErrorMessage
                  name="password"
                  className="text-red-500 !m-0"
                  component="div"
                />

                <button
                  type="submit"
                  className="w-full px-4 py-2 border border-black text-white hover:text-black font-medium bg-[#000000] hover:bg-[#fff] active:bg-[#fff] rounded-lg duration-150"
                >
                  {loading ? 'Login...' : 'Login'}
                </button>
              </Form>
            )}
          </Formik>
          <Divider
            className="!text-black !text-base"
            style={{ borderBlockStart: '0 #a0a0a0' }}
            plain
          >
            or
          </Divider>
          <GoogleBtn handleClick={() => signInWithGoogle()} />
          {errorGoogle && (
            <div className="text-red-500 mt-2">{errorGoogle.message}</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
