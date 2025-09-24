// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdkj1B9FUCD5eJ90yuXJ6IjnAsiPHTLnw",
  authDomain: "bluepill-83f64.firebaseapp.com",
  projectId: "bluepill-83f64",
  storageBucket: "bluepill-83f64.firebasestorage.app",
  messagingSenderId: "744012556579",
  appId: "1:744012556579:web:7628324c3011e9485d0496",
  measurementId: "G-60VZENPYM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
