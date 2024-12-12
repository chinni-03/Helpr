// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm6hx1yGUIV8A-Pm5IIVfK77rmO42XRe8",
  authDomain: "helpr-4f71a.firebaseapp.com",
  projectId: "helpr-4f71a",
  storageBucket: "helpr-4f71a.firebasestorage.app",
  messagingSenderId: "301982994557",
  appId: "1:301982994557:web:22e7f9670c8ab494f8e114",
  measurementId: "G-HN3GQB4LYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);