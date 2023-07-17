'use client';

import { createContext, useState, useEffect } from 'react';

import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signOut, loading, error] = useSignOut(auth);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const AuthUser = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    const success = await signOut();
    if (success) {
      alert('signed out');
    }
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ AuthUser, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
