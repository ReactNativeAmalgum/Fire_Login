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
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen-hooks';
import Addgif from './Addgif';

export default function SignUp() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View
          style={{
            marginVertical: hp('10%'),
            borderRadius: 160,
            backgroundColor: 'green',
            position: 'absolute',
          }}>
          <Addgif />
        </View>
        <Text
          style={{
            marginVertical: hp('27%'),
            fontSize: 24,
            fontWeight: 'bold',
            color: 'black',
            position: 'absolute',
          }}>
          Welcome Back
        </Text>
        <View style={[styles.inputStyle, {justifyContent: 'space-evenly'}]}>
          <TextInput
            placeholder="Email address"
            style={[styles.txtInput, {borderWidth: 1, borderRadius: 10}]}
          />
          <TextInput
            placeholder="Password"
            style={[styles.txtInput, {borderWidth: 1, borderRadius: 10}]}
          />
          <Text
            style={{
              marginVertical: hp('18%'),
              left: 200,
              fontWeight: 'bold',
              position: 'absolute',
              color: 'black',
            }}
            onPress={() => Alert.alert('Forget Password')}>
            Forget password?
          </Text>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#7D3CFF',
            borderRadius: 75,
            marginVertical: hp('65%'),
            width: wp('75%'),
            padding: 10,
            position: 'absolute',
          }}
          onPress={() => Alert.alert('This is a sign up button')}>
          <Text style={{fontSize: 24, fontWeight: '900', color: 'black'}}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            marginVertical: hp('74%'),
            color: 'black',
            position: 'absolute',
          }}>
          Already have an account?{' '}
          <Text
            onPress={() => Alert.alert('Go to login page')}
            style={{fontWeight: '900', color: 'black'}}>
            Login
          </Text>
        </Text>
        <View
          style={{
            borderWidth: 0.2,
            width: wp('75%'),
            marginVertical: hp('78%'),
          }}
        />
        {/* logo desiginin part */}
        <View style={{marginVertical: hp('80%'), position: 'absolute',flexDirection:'row',flexWrap:'wrap', justifyContent:'space-between'}}>
          <TouchableOpacity
            onPress={() => Alert.alert('Go to login page')}

            style={[
              styles.logoCircle,
              {alignItems: 'center', justifyContent: 'center'},
            ]}>
            <Text
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
              }}>
              F
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => Alert.alert('Go to login page')}

          style={[
            styles.logoCircle,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <Text
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
            }}>
            F
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => Alert.alert('Go to login page')}

        style={[
          styles.logoCircle,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <Text
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
          }}>
          F
        </Text>
      </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  logoCircle: {
    width: wp('15%'),
    height: hp('7%'),
    borderRadius: 100,
    padding:10,
    margin:10,
    justifyContent:'space-between',
    backgroundColor: 'pink',
  },
});
