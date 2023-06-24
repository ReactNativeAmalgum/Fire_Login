import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen-hooks';

export default function Welcome() {
  const logOut = async () => {
    try {
      await firebase.auth.signOut();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        resizeMode="cover"
        source={require('../../Components/Assets/Images/bg.png')}>
        <TouchableOpacity style={{left: wp('80%')}}>
          <Image
            style={styles.logOut}
            source={require('../../Components/Assets/Images/logOut.png')}
          />
        </TouchableOpacity>
        <ImageBackground
          imageStyle={{borderRadius: 10}}
          source={require('../../Components/Assets/Images/wlcmBg.jpg')}
          style={styles.tmpView}>
          <View style={styles.dispData}>
            <Text style={styles.dataFont}>Your name: </Text>
            <Text style={styles.dataFont}>Your email address:</Text>
          </View>
        </ImageBackground>
      </ImageBackground>
      <View style={styles.gif}>
        <Image
          style={[styles.circle]}
          source={require('../../Components/Assets/Images/moon.gif')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    width: wp('100%'),
    height: hp('100%'),
  },
  bgImage: {
    width: wp('100%'),
    height: hp('50%'),
  },
  tmpView: {
    width: wp('90%'),
    height: hp('100%'),
    margin: 20,
    padding: 10,
    marginVertical: hp('20%'),
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
    resizeMode: 'centre',
  },
  gif: {
    alignItems: 'center',
    marginVertical: hp('10%'),
    marginHorizontal: wp('50%'),
    backgroundColor: 'green',
    position: 'absolute',
  },

  circle: {
    position: 'absolute',
    // width: wp('30%'),
    // height: hp('14.5%'),
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: 'yellow',
  },
  dispData: {
    justifyContent: 'center',
    marginVertical: hp('20%'),
    alignItems: 'center',
  },
  dataFont: {
    fontSize: 24,
  },
  logOut: {
    // marginHorizontal: wp('80%'),
    width: wp('10%'),
    height: hp('5%'),
    marginVertical: hp('2%'),
    marginHorizontal: wp('5%'),
  },
});
