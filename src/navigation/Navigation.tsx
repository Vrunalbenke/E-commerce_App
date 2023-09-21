import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './type';
import {useAppSelector} from '../redux/store';
import {MMKV} from 'react-native-mmkv';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { loginUser } from '../redux/Slice/registerSlice';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const Storage = new MMKV();
  const LoginData = useAppSelector(state => state.Auth.AuthData);
  console.log('LoginData Printed for Navigation.tsx', LoginData);

  const isAuthenticated = (): string => {
    console.log('User Onboarded Value', Storage.getBoolean('UserOnboardData'));

    if (!Storage.getBoolean('UserOnboardData')) {
      Storage.set('UserOnboardData', true);
      console.log(
        'User Onboarded Successfully',
        Storage.getBoolean('UserOnboardData'),
      );
      return 'OnBoarding';
    }
    else if(LoginData){
      return 'AppStack'
    }
    return 'Login';
  };

  return (
    <NavigationContainer>
      {/* {LoginData ? 
      (<AppStack />)
      :
      (<AuthStack route={isAuthenticated()}/>)
      } */}
      <AuthStack route={isAuthenticated()}/>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
