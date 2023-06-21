import {View, Text, StyleSheet, Image,ImageBackground} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen-hooks';
export default function Addgif() {
  return (

      <Image
        style={[styles.circle,]}
        source={require('../../Components/Assets/Images/moon.gif')}
      />
  );
}

const styles = StyleSheet.create({
  circle: {
    width: wp('26%'),
    height: hp('13%'),
    borderRadius: 100,
    backgroundColor: 'yellow',
  },
});
