// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkioV3DlOIo8mnJqSfFxw0Xkz5-pSVd8Q",
  authDomain: "bookify-d47bc.firebaseapp.com",
  projectId: "bookify-d47bc",
  storageBucket: "bookify-d47bc.appspot.com",
  messagingSenderId: "794487617205",
  appId: "1:794487617205:web:e69bf6ddc19ec8acbb70fc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const provider = new GoogleAuthProvider();




