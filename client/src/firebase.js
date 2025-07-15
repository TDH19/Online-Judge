// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "online-judge-e724f.firebaseapp.com",
  projectId: "online-judge-e724f",
  storageBucket: "online-judge-e724f.firebasestorage.app",
  messagingSenderId: "266191754873",
  appId: "1:266191754873:web:808f57ab20fc466e2fe6a8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);