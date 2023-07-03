import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
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

import auth from '@react-native-firebase/auth';
import {Fb, Google, LinkedIn} from '../../Components/Assets/Reg Comps/LogoBtn';

export default function SignUp({navigation}) {
  // states for storing details of users
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showCpassword, setShowCpassword] = useState(true);

  // states for errors
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [cpasswordErr, setCpasswordErr] = useState(false);

  const [nameErrText, setNameErrText] = useState('');
  const [emailErrText, setEmailErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const [cpasswordErrText, setCpasswordErrText] = useState('');
  const [errorText, setErrortext] = useState('');

  const onShowCPassword = () => {
    setShowCpassword(!showCpassword);
  };

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // signup button
  const handleSubmitButton = () => {
    // condition for empty fields
    setErrortext('');
    if (!(userName.length && userPassword.length && userPassword.length && confPass.length)) {
      setNameErr(true);
      setEmailErr(true);
      setPasswordErr(true);
      setCpasswordErr(true);
      setEmailErrText('Enter your Email');
      setNameErrText('Enter your Username');
      setPasswordErrText('Enter your userPassword');
      setCpasswordErrText('Enter your userPassword again');
      return;
    }
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(userEmail) === false) {
      setNameErr(false);
      setPasswordErr(false);
      setCpasswordErr(false);
      setEmailErr(true);
      setEmailErrText('Enter Valid Email');
      return;
    }

    if (userPassword !== confPass) {
      setNameErr(false);
      setEmailErr(false);
      setPasswordErr(false);
      setCpasswordErr(true);
      setCpasswordErrText('Password does not match');
      return;
    }

    setNameErr(false);
    setEmailErr(false);
    setPasswordErr(false);
    setCpasswordErr(false);

    auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(user => {
        console.log('Registration Successful. Please Login to proceed');
        console.log(user);
        if (user) {
          auth()
            .currentUser.updateProfile({
              displayName: userName,
              photoURL: 'https://aboutreact.com/profile.png',
            })
            .then(navigation.navigate(navigationStrings.WELCOME))
            .catch(error => {
              alert(error);
              console.error(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          setErrortext('That email address is already in use!');
        }else if(error.code === 'auth/weak-password') {
          passwordErr('The given password is invalid')          
        }
         else {
          setErrortext(error.message);
        }
      });
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Register</Text>
          <Text style={styles.Ca}>Create your new account</Text>
          <View style={[styles.inputStyle, {justifyContent: 'space-evenly'}]}>
            <TextInput
              placeholder="Full Name"
              onChangeText={userName => setUserName(userName)}
              style={[styles.txtInput, {borderWidth: 1, borderRadius: 10}]}
            />
            {nameErr !="" ? <Text style={styles.errText}>{nameErrText}</Text> : null}
            <TextInput
              placeholder="Email address"
              onChangeText={userEmail => setUserEmail(userEmail)}
              keyboardType={'email-address'}
              style={[styles.txtInput, {borderWidth: 1, borderRadius: 10}]}
            />
            {emailErr !="" ? (
              <Text style={styles.errText}>{emailErrText}</Text>
            ) : null}
            <TextInput
              placeholder="Password"
              value={userPassword}
              onChangeText={userPassword => setUserPassword(userPassword)}
              style={[styles.txtInput, {borderWidth: 1, borderRadius: 10}]}
            />
            {passwordErr !="" ? (
              <Text style={styles.errText}>{passwordErrText}</Text>
            ) : null}

            <TextInput
              placeholder="Confirm Password"
              value={confPass}
              onChangeText={confPass => setConfPass(confPass)}
              style={[styles.txtInput, {borderWidth: 1, borderRadius: 10}]}
            />
            {cpasswordErr !="" ? (
              <Text style={styles.errText}>{cpasswordErrText}{}</Text>
            ) : null}
          </View>
          <Text style={styles.forgetTxt}>
            By signing up you’ve agree to{' '}
            <Text style={styles.services}>
              Our Terms of Use And Privacy Notice
            </Text>
          </Text>
          <TouchableOpacity
            style={styles.signUpbtnDir}
            onPress={handleSubmitButton}>
            <Text style={styles.SignUpBtnTxt}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.AlAcc}>
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate(navigationStrings.LOGIN)}
              style={styles.login}>
              Login
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
  textDanger: {
    color: '#dc3545',
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
    padding: 10,
    margin: 5,
    borderColor: '#F0F0F0',
  },
  inputStyle: {
    marginVertical: hp('14'),
    position: 'absolute',
  },
  errText: {
    color: 'red',
    fontSize: 12,

    // fontFamily: fontFamily.regular,
    top: 0.5,
    // marginTop: 0.1,
    marginLeft: 10,
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
    fontSize: 22,
    fontWeight: '900',
    color: 'black',
  },
  forgetTxt: {
    marginVertical: hp('59.5%'),
    // right: wp(''),
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    width: wp('75%'),
    fontWeight: 'bold',
    position: 'absolute',
  },
  services: {
    color: 'black',
  },
  welcome: {
    marginVertical: hp('3%'),
    fontSize: 25,
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
  Ca: {
    marginVertical: hp('8%'),
    position: 'absolute',
  },
});
