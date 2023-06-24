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
import Addgif from '../../Components/Assets/Reg Comps/Addgif';
import {Fb, Google, LinkedIn} from '../../Components/Assets/Reg Comps/LogoBtn';

import {firebase} from '../../src/config/firebase'

export default function SignUp({navigation}) {
  const [email, setEmail] = React.useState('')
  const [password, setPassowrd] = React.useState('')
  const loginUser = async (email, password) =>{
    try{
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch(error){
      Alert(error.message)
    }
  }
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
              onChangeText={(email) => setEmail(email)}
              autoCapitalize='none'
              autoCorrect={false}
            />
            <TextInput
              placeholder="Password"
              style={[styles.txtInput, {borderWidth: 1, borderRadius: 10}]}
              onChangeText={(password) => setPassowrd(password)}
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={true}
            />
            <Text
              style={styles.forgetTxt}
              onPress={() =>
                navigation.navigate(navigationStrings.FORGOTPASSWORD)
              }>
              Forget password?
            </Text>
          </View>
          <TouchableOpacity
            style={styles.signUpbtnDir}
            onPress={() => navigation.navigate(navigationStrings.SIGNUP)}>
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
    marginVertical: hp('40%'),
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
    marginVertical: hp('18%'),
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
