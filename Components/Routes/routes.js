import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import navigationStrings from '../Navigation/NavigationStrings/navigationStrings'
import { SignUp } from '../../Screens'

const Stack = createNativeStackNavigator()

export default function routes() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name= {navigationStrings.SIGNUP} component={SignUp} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}