'use client';
import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputPassword from '@/app/components/Inputs/InputPassword';
import InputText from '@/app/components/Inputs/InputText';
import { auth } from '@/app/firebase/firebaseConfig';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { AuthContext } from '@/app/context/AuthContext';

const SignupPage = () => {
  const router = useRouter();

  const { AuthUser, user: userContext } = useContext(AuthContext);

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

  if (user) {
    AuthUser(user.user);
  }

  if (userContext) {
    // just for now until i make the cart page
    router.push('/');
    return <div>Redirecting home...</div>;
  }

  return (
    <div className="w-full">
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
                {error && <div className="text-red-500">{error.message}</div>}

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
