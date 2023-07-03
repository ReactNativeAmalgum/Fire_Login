import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen-hooks';
import auth from "@react-native-firebase/auth";
import navigationStrings from '../../Components/Navigation/NavigationStrings/navigationStrings';
import { signOut } from '@firebase/auth';

export default function Welcome({navigation}) {
  const [user, setUser] = useState(' ')
  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure? You want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirm",
          onPress: () => {
            auth()
              .signOut()
              .then(() => navigation.replace("Auth"))
              .catch((error) => {
                console.log(error);
                if (error.code === "auth/no-current-user")
                  navigation.replace("Auth");
                else alert(error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() =>{
    const sub = auth().onAuthStateChanged((user)=>{
      console.log("user", JSON.stringify(user))
      setUser(user)
    })
    return sub;
  })
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        resizeMode="cover"
        source={require('../../Components/Assets/Images/bg.png')}>
        <TouchableOpacity style={{left: wp('80%')}}
          onPress={logout}
        >
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
            <Text style={styles.dataFont}>{user.displayName} </Text>
            <Text style={styles.dataFont}>{user.email}</Text>
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
    marginVertical: hp('7%'),
    // alignItems: 'center',
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
