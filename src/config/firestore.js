import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJ-7oKXhRQqYB8nVMnb7z6ne-sOi034_0",
  authDomain: "msu-iit-watermonitoringsystem.firebaseapp.com",
  projectId: "msu-iit-watermonitoringsystem",
  storageBucket: "msu-iit-watermonitoringsystem.appspot.com",
  messagingSenderId: "289051512949",
  appId: "1:289051512949:web:a812eca549e1084ddd683c",
  measurementId: "G-HFG2RFKLJV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
