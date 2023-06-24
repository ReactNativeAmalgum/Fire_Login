
import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import navigationStrings from '../Navigation/NavigationStrings/navigationStrings'
import { ForgotPass, Login, SignUp, SplashScreen, Welcome } from '../../Screens'

const Stack = createNativeStackNavigator();

const Auth = () =>{
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name= {navigationStrings.SPLASHSCREEN} component={SplashScreen} />

    <Stack.Screen name ={navigationStrings.SIGNUP} component={SignUp} />
    <Stack.Screen name= {navigationStrings.LOGIN} component={Login} />
    <Stack.Screen name= {navigationStrings.FORGOTPASSWORD} component={ForgotPass} />
    </Stack.Navigator>
  )
}
export default function Route() {
  return (
    <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false}} >
        <Stack.Screen name= {navigationStrings.AUTH} component={Auth} />
        <Stack.Screen name= {navigationStrings.WELCOME} component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}