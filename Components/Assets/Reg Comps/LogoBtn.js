import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
  } from 'react-native-responsive-screen-hooks';
  import auth from "@react-native-firebase/auth";
  
import { googleLogin } from '../../../src/config/firebase';

  const GoogleSignIn = async() =>{
    try {
      await googleLogin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await googleLogin.signIn()
      setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

export const Fb = () =>{
   return(
    <TouchableOpacity
    onPress={() => Alert.alert('FB Login')}

    style={[
      styles.logoCircle,
      {alignItems: 'center', justifyContent: 'center'},
    ]}>
    <Image source={require('../../../Components/Assets/Images/fb.png')} />
  </TouchableOpacity>
   )
}
export const Google= () =>{
    return(
        <TouchableOpacity
          onPress={GoogleSignIn}

        style={[
          styles.logoCircle,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <Image source={require('../../../Components/Assets/Images/g.png')} />
      </TouchableOpacity>
    )
 }
 export const LinkedIn= () =>{
    return(
        <TouchableOpacity
        onPress={() => Alert.alert('Go to login page')}

        style={[
          styles.logoCircle,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
       <Image style={styles.logoCircle} source={require('../../../Components/Assets/Images/link.png')}/>
      </TouchableOpacity>
    )
 }

const styles = StyleSheet.create({
    logoCircle: {
        width: wp('15%'),
        height: hp('7%'),
        borderRadius: 100,
        padding:10,
        margin:10,
        justifyContent:'space-between',
        backgroundColor: '#ffff',
      },
})