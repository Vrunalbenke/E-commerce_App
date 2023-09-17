import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from '../screens/OnboardingScreen/OnBoarding';
import Login from '../screens/LoginScreen/Login';
import Signup from '../screens/SignupScreen/Signup';
import {RootStackParamList} from './type';
import Home from '../screens/HomeScreen/Home';
import {useAppSelector} from '../redux/store';
import {MMKV} from 'react-native-mmkv';
import ForgotPassword from '../screens/ForgotPasswordScreen/ForgotPassword';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {

  const Storage = new MMKV();
  const LoginData = useAppSelector(state => state.Auth.AuthData);
  console.log('LoginData Printed for Navigation.tsx', LoginData);

  const isAuthenticated = () => {
    console.log('User Onboarded Value',Storage.getBoolean('UserOnboardData'))

    if (!Storage.getBoolean('UserOnboardData')) {
      Storage.set('UserOnboardData', true);
      console.log(
        'User Onboarded Successfully',
        Storage.getBoolean('UserOnboardData'),
      );
      return -1;
    }
    else if(LoginData.length !== 0) {
      return 1
    }
    return 0;
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName= {isAuthenticated() === -1 ? "OnBoarding" : isAuthenticated() === 0? "Login":'Home'}>
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
          name="Home"
          component={Home}
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
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
