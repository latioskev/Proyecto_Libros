// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK5V4zBeGKo2T_PPhjon58u4a-uR4csHw",
  authDomain: "micomidafavorita-a0fb4.firebaseapp.com",
  projectId: "micomidafavorita-a0fb4",
  storageBucket: "micomidafavorita-a0fb4.firebasestorage.app",
  messagingSenderId: "106284510501",
  appId: "1:106284510501:web:6d480cd77a231d0fff7ecc",
  measurementId: "G-9MBVEBS5D1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);