// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import firestore from '@react-native-firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useState} from 'react';
import navigationStrings from '../../Components/Navigation/NavigationStrings/navigationStrings';
import {useNavigation} from '@react-navigation/native';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAWt3rXUsujbeUVOqWCY09844VhKUOqKRo',
  authDomain: 'firelogin-1cc9d.firebaseapp.com',
  databaseURL:
    'https://firelogin-1cc9d-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'firelogin-1cc9d',
  storageBucket: 'firelogin-1cc9d.appspot.com',
  messagingSenderId: '953200599505',
  appId: '1:953200599505:web:496029c92b3f44a80080f0',
  measurementId: 'G-TB0BDTDV2F',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
GoogleSignin.configure({
  webClientId:'953200599505-qus3aeelfe3ig7k5of5o4ku5to3sjhvi.apps.googleusercontent.com',
});

const auth = getAuth(app);
const db = getFirestore(app);

// const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async ({navigation}) => {
  try {
    const res = await signInWithPopup(auth, GoogleAuthProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.lenght === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        diaplayName: user.displayName,
        authProvider: 'google',
        name: user.email,
      });
    }
    if (user) navigation.navigate(navigationStrings.WELCOME);
  } catch (error) {
    alert(error);
  }
};

//----------------------------------------------------------------------

// GoogleSignin.configure({
//   scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//   webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
//   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   hostedDomain: '', // specifies a hosted domain restriction
//   forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//   accountName: '', // [Android] specifies an account name on the device that should be used
//   iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
//   openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//   profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
// });

export const GoogleSignIn = async () => {
  const [state, setState] = useState();
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    setState({userInfo: userInfo, loggedIn: true});
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      alert(error);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      alert(error);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      alert(error);
    } else {
      alert('Some otherr error happened!');
    }
  }
};
