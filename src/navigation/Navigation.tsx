import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../screens/OnboardingScreen/OnBoarding';
import Login from '../screens/LoginScreen/Login';
import Signup from '../screens/SignupScreen/Signup';
import { RootStackParamList } from './type';
import Home from '../screens/HomeScreen/Home';
import { useAppSelector } from '../redux/store';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    const OnBoardingData = useAppSelector(state => (state.Auth.AuthData))
  return (
    <NavigationContainer>
        <RootStack.Navigator>
            <RootStack.Screen name='OnBoarding' component={OnBoarding} options={{
                headerShown:false
            }}/>
            <RootStack.Screen name='Login' component={Login} options={{
                headerShown:false
            }}/>
            <RootStack.Screen name='Signup' component={Signup} options={{
                headerShown:false
            }}/>
            <RootStack.Screen name='Home' component={Home} options={{
                headerShown:false
            }}/>
        </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})