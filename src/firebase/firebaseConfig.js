import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9hdcFQXD_8VvCbrvuD5VcYkyDipuhlMc",
  authDomain: "unsplashapp-932bd.firebaseapp.com",
  projectId: "unsplashapp-932bd",
  storageBucket: "unsplashapp-932bd.firebasestorage.app",
  messagingSenderId: "328509105211",
  appId: "1:328509105211:web:23034a934d4c431206a81e",
  measurementId: "G-SYVNQER6BG"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
export default app;
export const googleProvider = new GoogleAuthProvider();
