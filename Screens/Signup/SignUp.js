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

import Addgif from '../../Components/Assets/Reg Comps/Addgif';
import {Fb, Google, LinkedIn} from '../../Components/Assets/Reg Comps/LogoBtn';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen-hooks';
import navigationStrings from '../../Components/Navigation/NavigationStrings/navigationStrings';
import auth from '@react-native-firebase/auth';
import { signInWithGoogle } from '../../src/config/firebase';

export default function SignUp({navigation}) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [errortext, setErrortext] = useState('');
  const [userPassword, setUserPassword] = useState(true);
  const [confPass, setConfPass] = useState(true);
  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) return alert('Please fill Name');
    if (!userEmail) return alert('Please fill Email');
    if (!userPassword) return alert('Please fill Address');

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
        } else {
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
            <TextInput
              placeholder="Email address"
              onChangeText={userEmail => setUserEmail(userEmail)}
              keyboardType="email-address"
              style={[styles.txtInput, {borderWidth: 1, borderRadius: 10}]}
            />
            <TextInput
              placeholder="Password"
              value={userPassword}
              onChangeText={userPassword => setUserPassword(userPassword)}
              style={[styles.txtInput, {borderWidth: 1, borderRadius: 10}]}
            />
            <TextInput
              placeholder="Confirm Password"
              value={confPass}
              onChangeText={confPass => setConfPass(confPass)}
              style={[styles.txtInput, {borderWidth: 1, borderRadius: 10}]}
            />
          </View>
          <Text
            style={styles.forgetTxt}
            onPress={() =>
              navigation.navigate(navigationStrings.FORGOTPASSWORD)
            }>
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
            <Google onPress={signInWithGoogle} />
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
    margin: 10,
    borderColor: '#F0F0F0',
  },
  inputStyle: {
    marginVertical: hp('14'),
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
    fontSize: 22,
    fontWeight: '900',
    color: 'black',
  },
  forgetTxt: {
    marginVertical: hp('53.5%'),
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
