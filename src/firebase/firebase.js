import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "prototypedemo-c7373.firebaseapp.com",
  projectId: "prototypedemo-c7373",
  storageBucket: "prototypedemo-c7373.appspot.com",
  messagingSenderId: "161927163964",
  appId: "1:161927163964:web:0d8c7aaf29355ae66a5339",
  measurementId: "G-NRR8H6DWRH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

export { db, auth, app, storage };
