
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { RootStackParamList } from './type';
import OnBoarding from '../screens/OnboardingScreen/OnBoarding';
import Login from '../screens/LoginScreen/Login';
import Signup from '../screens/SignupScreen/Signup';
import ForgotPassword from '../screens/ForgotPasswordScreen/ForgotPassword';
import AppStack from './AppStack';


const RootStack = createNativeStackNavigator<RootStackParamList>();


const AuthStack = ({route}:any) => {
  return (
    <RootStack.Navigator initialRouteName = {route}>
        <RootStack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="AppStack"
          component={AppStack}
          options={{
            headerShown: false,
          }}
        />

        <RootStack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
      </RootStack.Navigator>
  )
}

export default AuthStack