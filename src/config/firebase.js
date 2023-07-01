// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWt3rXUsujbeUVOqWCY09844VhKUOqKRo",
  authDomain: "firelogin-1cc9d.firebaseapp.com",
  databaseURL: "https://firelogin-1cc9d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "firelogin-1cc9d",
  storageBucket: "firelogin-1cc9d.appspot.com",
  messagingSenderId: "953200599505",
  appId: "1:953200599505:web:496029c92b3f44a80080f0",
  measurementId: "G-TB0BDTDV2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);