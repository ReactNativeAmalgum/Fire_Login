// firebase config key setup
import firebase from 'firebase/compat/app';
import 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";

// yoour web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyAWt3rXUsujbeUVOqWCY09844VhKUOqKRo',
  authDomain: 'firelogin-1cc9d.firebaseapp.com',
  projectId: 'firelogin-1cc9d',
  storageBucket: 'firelogin-1cc9d.appspot.com',
  messagingSenderId: '953200599505',
  appId: '1:953200599505:web:7339857ab8851d5d0080f0',
  measurementId: 'G-4HGFPN5QSZ',
};


if (! firebase.app.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase};
export const auth = getAuth(app);
