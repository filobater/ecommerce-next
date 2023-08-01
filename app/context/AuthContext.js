'use client';

import { createContext, useState, useEffect } from 'react';

import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';
import Cookies from 'js-cookie';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  // firebase function
  const [signOut, loading, error] = useSignOut(auth);

  // alerts from ant design

  const [messageApi, contextHolder] = message.useMessage();
  const successMessage = () => {
    messageApi.open({
      type: 'success',
      content: 'Logged out!',
    });
  };

  useEffect(() => {
    const storedUser = Cookies.get('user');
    // const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const AuthUser = (user) => {
    setUser(user);
    Cookies.set('user', JSON.stringify(user));
    // localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    const success = await signOut();
    if (success) {
      successMessage();
    }
    setUser(null);
    Cookies.remove('user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ AuthUser, user, logout }}>
      {contextHolder}
      {children}
    </AuthContext.Provider>
  );
};
