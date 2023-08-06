'use client';
import { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputPassword from '@/app/components/Inputs/InputPassword';
import InputText from '@/app/components/Inputs/InputText';
import { auth } from '@/app/firebase/firebaseConfig';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { AuthContext } from '@/app/context/AuthContext';
import { message } from 'antd';

const SignupPage = () => {
  const router = useRouter();

  const { AuthUser, user: userContext } = useContext(AuthContext);
  // after the user make the login request
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

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required('Your Email'),
    password: Yup.string().required('Type your password'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Required'),
  });

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (values, { resetForm }) => {
    createUserWithEmailAndPassword(values.email, values.password);
    resetForm();
  };

  useEffect(() => {
    if (user) {
      success();
    }

    if (user) {
      AuthUser(user.user);
    }
  }, [user]);

  if (error) {
    errorAuth();
  }

  return (
    <div className="w-full">
      {contextHolder}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl space-y-8 px-4  text-gray-600 sm:px-0">
          <div className="mt-5 space-y-2">
            <p className="text-black text-lg">
              Already have an account?{' '}
              <Link className="font-semibold underline" href="/login">
                Login
              </Link>
            </p>
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Signup
            </h3>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formikProps) => (
              <Form className="space-y-5">
                <div className=" grid sm:grid-cols-2 grid-cols-1 items-baseline gap-4">
                  <div>
                    <InputText name={'email'} type={'email'} label={'Email'} />
                    <ErrorMessage
                      name="email"
                      className="text-red-500 "
                      component="div"
                    />
                  </div>
                  <div>
                    <InputPassword name={'password'} label={'Password'} />
                    <ErrorMessage
                      name="password"
                      className="text-red-500 "
                      component="div"
                    />
                  </div>
                  <div>
                    <InputPassword
                      name={'confirmPassword'}
                      label={'Confirm password'}
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      className="text-red-500 "
                      component="div"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 border border-black text-white hover:text-black font-medium bg-[#000000] hover:bg-[#fff] active:bg-[#fff] rounded-lg duration-150"
                >
                  {loading ? 'Signup...' : 'Signup'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
