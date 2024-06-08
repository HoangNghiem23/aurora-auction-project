// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcF25IQ0dxAMw7tpKxzuhAqC-QNdxDhX8",
  authDomain: "aurora-auction-e6371.firebaseapp.com",
  projectId: "aurora-auction-e6371",
  storageBucket: "aurora-auction-e6371.appspot.com",
  messagingSenderId: "314628629716",
  appId: "1:314628629716:web:6cea333f57afc6d1f2c741",
  measurementId: "G-T38V1CC9WR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider()
export { auth, googleProvider };
