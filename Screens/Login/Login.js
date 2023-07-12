import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen-hooks';
import navigationStrings from '../../Components/Navigation/NavigationStrings/navigationStrings';
import Addgif from '../../Components/Assets/Reg Comps/Addgif';
import {
  Fb,
  Google,
  GoogleSignIn,
  LinkedIn,
  getCurrentUserInfo,
  googleSign,
} from '../../Components/Assets/Reg Comps/LogoBtn';
import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';

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
GoogleSignin.configure({
  webClientId:'953200599505-qus3aeelfe3ig7k5of5o4ku5to3sjhvi.apps.googleusercontent.com',
});
export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const [emailErrText, setEmailErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const [state, setState] = useState()
  const [gettingLoginStatus,setGettingLoginStatus] = useState(true)

  const loginUser = async () => {
    setErrortext('');
    if (!(email && userPassword)) {
      setEmailErr(true);
      setPasswordErr(true);
      setEmailErrText('Enter your email');
      setPasswordErrText('Enter your password');
      return;
    }
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setPasswordErr(false);
      setEmailErr(true);
      setEmailErrText('Enter Valid Email');
      return;
    }

    setEmailErr(false);
    setPasswordErr(false);

    try {
      auth()
        .signInWithEmailAndPassword(email, userPassword)
        .then(user => {
          console.log(user);
          // If server response message same as Data Matched
          if (user) navigation.navigate(navigationStrings.WELCOME);
        })
        .catch(error => {
          console.log(error);
          if (error.code === 'auth/invalid-email') return setErrortext("Invalide email")
          else if (error.code === 'auth/user-not-found')
            setErrortext('No User Found');
          else {
            setErrortext('Please check your email id or password');
          }
        });
    } catch (error) {
      setErrortext(error.message)
    }
  };
  const getCurrentUserInfo = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      // Set User Info if user is already signed in
      _getCurrentUserInfo();
    } else {
      alert('Please Login');
    }
    setGettingLoginStatus(false);
  };
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.gif}>
            <Addgif />
          </View>
          <Text style={styles.welcome}>Welcome Back</Text>
          <View style={[styles.inputStyle, {justifyContent: 'space-evenly'}]}>
            <TextInput
              placeholder="Email address"
              style={[styles.txtInput, {borderWidth: 1, borderRadius: 10}]}
              onChangeText={userEmail => setEmail(userEmail)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {emailErr !=" " ? (
              <Text style={styles.errText}>{emailErrText}</Text>
            ) : null}
            <TextInput
              placeholder="Password"
              style={[styles.txtInput, {borderWidth: 1, borderRadius: 10}]}
              onChangeText={userPassword => setUserPassword(userPassword)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            {passwordErr ? (
              <Text style={styles.errText}>{passwordErrText}</Text>
            ) : null}
            <Text
              style={styles.forgetTxt}
              onPress={() =>
                navigation.navigate(navigationStrings.FORGOTPASSWORD)
              }>
              Forget password?
            </Text>
          </View>
          <View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
          </View>

          <TouchableOpacity style={styles.signUpbtnDir} onPress={loginUser}>
            <Text style={styles.SignUpBtnTxt}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.AlAcc}>
            Don't have an account?{' '}
            <Text
              onPress={() => navigation.navigate(navigationStrings.SIGNUP)}
              style={styles.login}>
              Register
            </Text>
          </Text>
          <View style={styles.logoPos} />
          {/* logo desiginin part */}
          <View style={styles.logoDirection}>
            <Fb />
            <Google onPress={getCurrentUserInfo}/>
            <LinkedIn />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    // width: wp('100%'),
    height: hp('100%'),
    // padding:16
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    marginVertical:hp('20%')
  },
  circle: {
    width: wp('25%'),
    height: hp('13%'),
    borderRadius: 100,
    backgroundColor: 'yellow',
  },
  txtInput: {
    width: wp('75%'),
    backgroundColor: '#F0F0F0',
    margin: 5,
    borderColor: '#F0F0F0',
  },
  errText: {
    color: 'red',
    fontSize: 12,
    // fontFamily: fontFamily.regular,
    // marginTop: 8,
    marginLeft: 10,
  },
  inputStyle: {
    marginVertical: hp('35%'),
    position: 'absolute',
  },
  logoPos: {
    borderWidth: 0.2,
    width: wp('75%'),
    marginVertical: hp('78%'),
  },
  logoDirection: {
    marginVertical: hp('80%'),
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  signUpbtnDir: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7D3CFF',
    borderRadius: 75,
    marginVertical: hp('65%'),
    width: wp('75%'),
    padding: 10,
    position: 'absolute',
  },
  SignUpBtnTxt: {
    fontSize: 24,
    fontWeight: '900',
    color: 'black',
  },
  forgetTxt: {
    marginVertical: hp('20%'),
    left: 200,
    fontWeight: 'bold',
    position: 'absolute',
    color: 'black',
  },
  welcome: {
    marginVertical: hp('27%'),
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    position: 'absolute',
  },
  gif: {
    alignItems: 'center',
    marginVertical: hp('10%'),
    // borderRadius: 160,
    backgroundColor: 'green',
    position: 'absolute',
  },
  AlAcc: {
    marginVertical: hp('74%'),
    color: 'black',
    position: 'absolute',
  },
  login: {
    fontWeight: '900',
    color: 'black',
  },

});
