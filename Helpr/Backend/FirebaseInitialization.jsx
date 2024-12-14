// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm6hx1yGUIV8A-Pm5IIVfK77rmO42XRe8",
  authDomain: "helpr-4f71a.firebaseapp.com",
  projectId: "helpr-4f71a",
  storageBucket: "helpr-4f71a.firebasestorage.app",
  messagingSenderId: "301982994557",
  appId: "1:301982994557:web:22e7f9670c8ab494f8e114",
  measurementId: "G-HN3GQB4LYQ"
};

// Initialize Firebase, Firebase Authentication and Firestore
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
