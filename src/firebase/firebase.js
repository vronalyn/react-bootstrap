import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

export { db, auth, app, storage };
