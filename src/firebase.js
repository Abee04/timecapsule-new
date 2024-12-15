// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyCH9o2TNWvdWVp5J30C-wQfwpuHoOwIkxw",
    authDomain: "timecapsule-2af4b.firebaseapp.com",
    projectId: "timecapsule-2af4b",
    storageBucket: "timecapsule-2af4b.firebasestorage.app",
    messagingSenderId: "715356646583",
    appId: "1:715356646583:web:4a15e954a42202edb37132",
    measurementId: "G-WDL6Z4VSHH"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const googleProvider = new GoogleAuthProvider();
  
  export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
  export const logout = () => signOut(auth);