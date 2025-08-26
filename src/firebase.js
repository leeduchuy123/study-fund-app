import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD27cdgJ1yOLt78p9L1rXbf4pJA4IV89-E",
    authDomain: "study-fund-49981.firebaseapp.com",
    projectId: "study-fund-49981",
    storageBucket: "study-fund-49981.firebasestorage.app",
    messagingSenderId: "61870480570",
    appId: "1:61870480570:web:ffe55144c772a27ef53683"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)