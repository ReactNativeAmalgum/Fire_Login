// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firestore from '@react-native-firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { getFirestore,query, getDocs, collection, where, addDoc} from 'firebase/firestore'
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useState } from "react";
import navigationStrings from "../../Components/Navigation/NavigationStrings/navigationStrings";
import { useNavigation } from "@react-navigation/native";

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
// GoogleSignin.configure({
//   webClientId:'953200599505-qus3aeelfe3ig7k5of5o4ku5to3sjhvi.apps.googleusercontent.com',
// });

const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export const  signInWithGoogle = async({navigation}) =>{
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  try {

    const res = await signInWithPopup(auth, googleProvider)
    const user =  res.user;
    const q = query(collection(db,"users"), where("uid", "==", user.uid ))
    const docs = await getDocs(q);
    if(docs.docs.lenght === 0){
      await addDoc(collection(db, "users"),{
        uid:user.uid,
        diaplayName: user.displayName,
        authProvider: "google",
        name:user.email,
      })

    }
    if(user)       navigation.navigate(navigationStrings.WELCOME)
  } catch (error) {
    alert(error)
  }
}

//----------------------------------------------------------------------

