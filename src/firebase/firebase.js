// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxXp3qH6qJaBrvqINVXT4WzNZhwy_VZ1k",
  authDomain: "thefarsan-46c99.firebaseapp.com",
  projectId: "thefarsan-46c99",
  storageBucket: "thefarsan-46c99.appspot.com",
  messagingSenderId: "944003868370",
  appId: "1:944003868370:web:3bd9e42e18e8ce6a17af0b",
  measurementId: "G-6Q9P3356G8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export { db, auth };
