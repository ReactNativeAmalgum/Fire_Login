import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import navigationStrings from '../Navigation/NavigationStrings/navigationStrings';
import {ForgotPass, Login, SignUp} from '../../Screens';

const Stack = createNativeStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}

        >
        <Stack.Screen name={navigationStrings.SIGNUP} component={SignUp} />
        <Stack.Screen name={navigationStrings.LOGIN} component={Login} />
        <Stack.Screen
          name={navigationStrings.FORGOTPASSWORD}
          component={ForgotPass}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
