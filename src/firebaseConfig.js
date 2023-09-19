// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAK4uzjEROwSepfCfy6tJIIynFiQTl9Qss",
    authDomain: "snapandsync.firebaseapp.com",
    projectId: "snapandsync",
    storageBucket: "snapandsync.appspot.com",
    messagingSenderId: "819927252550",
    appId: "1:819927252550:web:0033e26a3d1f334d6dd447",
    measurementId: "G-1LL1H9G2WD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);