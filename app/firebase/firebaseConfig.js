// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getStorage } from "@firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt8XJCDOF9rFr5-LjNte2YaxwPQUdlDlY",
  authDomain: "store-ecommerce-ee2e9.firebaseapp.com",
  projectId: "store-ecommerce-ee2e9",
  storageBucket: "store-ecommerce-ee2e9.appspot.com",
  messagingSenderId: "530894029687",
  appId: "1:530894029687:web:3f585f4c381eea896a5772",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
