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
} from '../../Components/Assets/Reg Comps/LogoBtn';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const [emailErrText, setEmailErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');

  const loginUser = async () => {
    setErrortext('');
    if (!(email.length && password.length)) {
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
            <Google />
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
