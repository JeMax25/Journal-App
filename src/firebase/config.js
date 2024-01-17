// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtGuLDdVGnnuta7P13tGDdnj1HyOyAFjk",
  authDomain: "journal-app-50ee7.firebaseapp.com",
  projectId: "journal-app-50ee7",
  storageBucket: "journal-app-50ee7.appspot.com",
  messagingSenderId: "502305564860",
  appId: "1:502305564860:web:dd4c42d5c770df19e1c8b9"
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth( FireBaseApp );
export const FireStoreDB = getFirestore( FireBaseApp );