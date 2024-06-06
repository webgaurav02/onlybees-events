// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAG0RNiU6NaS_XFd0HzGDTgZV-1TzMUgxw",
    authDomain: "onlybees-events.firebaseapp.com",
    projectId: "onlybees-events",
    storageBucket: "onlybees-events.appspot.com",
    messagingSenderId: "447887789649",
    appId: "1:447887789649:web:e22f5e74da05fb2a097270",
    measurementId: "G-6E5WCHLBT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);