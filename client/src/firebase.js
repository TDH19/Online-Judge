// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "online-judge-93e6e.firebaseapp.com",
  projectId: "online-judge-93e6e",
  storageBucket: "online-judge-93e6e.firebasestorage.app",
  messagingSenderId: "840109604914",
  appId: "1:840109604914:web:541b6f1d3592600f37bc2b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);