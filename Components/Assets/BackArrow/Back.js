import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
  } from 'react-native-responsive-screen-hooks';

export default function Back({navigation, route}) {
    const {goBack} = useNavigation();

  return (
    <View>
        <TouchableOpacity  onPress={() => goBack()} >
            <Image style={styles.BackPos} source={require('../Images/back.png')} />
        </TouchableOpacity>
    </View>
  )
}
const styles =  StyleSheet.create({
    BackPos:{
        marginVertical:hp('1%'),
        right:wp('40%'),
        height:40,
        width:40,
        // borderRadius:100
    }
})