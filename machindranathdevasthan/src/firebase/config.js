// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJLO53KhCYAdELHwgCMo8IydEYqQOv8Q8",
  authDomain: "shri-machindranath-devasthan.firebaseapp.com",
  projectId: "shri-machindranath-devasthan",
  storageBucket: "shri-machindranath-devasthan.firebasestorage.app",
  messagingSenderId: "915967098043",
  appId: "1:915967098043:web:c7a2a8420c819cbd953d9e",
  measurementId: "G-DKFZN4EMEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app, "asia-south1");


if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export { db, functions };