// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'; // Import Firestore functions

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

// Initialize Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);  // Initialize Firestore

// Authentication methods
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);

// Firestore functions
export const addEmailSchedule = async (recipientEmail, sendDate, sendTime, message) => {
  try {
    const docRef = await addDoc(collection(db, "scheduledEmails"), {
      recipientEmail,
      sendDate,
      sendTime,
      message,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Function to fetch scheduled emails (optional)
export const fetchScheduledEmails = async () => {
  const querySnapshot = await getDocs(collection(db, "scheduledEmails"));
  const emails = querySnapshot.docs.map(doc => doc.data());
  return emails;
};
