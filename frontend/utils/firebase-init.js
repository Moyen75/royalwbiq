// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBD1U_H0BSIzqTjuX3ff2LBqMPy8ka2ldM",
    authDomain: "royalwbiq-01.firebaseapp.com",
    projectId: "royalwbiq-01",
    storageBucket: "royalwbiq-01.appspot.com",
    messagingSenderId: "140344021130",
    appId: "1:140344021130:web:1d0f409fd32e5480785d73",
    measurementId: "G-HHL4BRH9EC"
};

// Initialize Firebase
const initializeAuthentication = () => initializeApp(firebaseConfig);
export default initializeAuthentication;
// const analytics = getAnalytics(app);