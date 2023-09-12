import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomInputField from '../../components/CustomInputField';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import {styles} from './style';
import {LoginNavigatonProp} from '../../navigation/type';

const Login = ({navigation}: LoginNavigatonProp) => {
  function NavigateSignup() {
    navigation.navigate('Signup');
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.loginContainer}>
        <CustomHeader
          style={{
            fontSize: 50,
            fontFamily: 'Bebas Neue Bold',
          }}
          headerContainerStyle={{
            height: '25%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          headerTitle="NeoSTORE"
        />
        <View style={styles.MidArea}>
          <Text style={styles.greeting}>Welcome !</Text>
          <Text style={styles.loginActionText}>
            please login or sign up to continue our app
          </Text>
        </View>
        <CustomInputField
          label="Email"
          placeholder="vrunalbenke@gmail.com"
          secureTextEntry={true}
          deCaptialize={(value: string) => {
            return value.toLowerCase();
          }}
          textInputStyle={{
            fontSize: 18,
            fontFamily: 'Roboto Condensed',
            borderRadius: 10,
            paddingLeft: 10,
            // marginBottom: 25,
            height: 35,
            width: '85%',
          }}
          labelStyle={{
            fontSize: 20,
            fontFamily: 'Roboto Condensed',
            fontWeight: '400',
            paddingLeft: 10,
            letterSpacing: 1,
          }}
        />
        <CustomInputField
          label="Password"
          placeholder="***********"
          secureTextEntry={true}
          Icon="eye-off"
          Icon2="eye"
          textInputStyle={{
            fontSize: 20,
            fontFamily: 'Roboto Condensed',
            borderRadius: 10,
            paddingLeft: 10,
            margin: 0,
            height: 35,
            width: '85%',
          }}
          labelStyle={{
            fontSize: 20,
            fontFamily: 'Roboto Condensed',
            fontWeight: '400',
            paddingLeft: 10,
            letterSpacing: 1,
          }}
        />
        <TouchableOpacity style={styles.ForgetPassContainer}>
          <Text style={styles.ForgetPass}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.LoginBtn}>
          <CustomButton
            TOPstyle={{
              backgroundColor: '#000',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              width: '95%',
              // padding:10
              //   marginBottom: 20,
            }}
            textStyle={{
              color: '#fff',
              fontSize: 20,
              fontFamily: 'Roboto Condensed Bold',
            }}
            onPress={() => console.log('abc')}
            BtnName="Login"
          />

          <Text style={{marginVertical: 10, fontSize: 17}}>or</Text>

          <CustomButton
            TOPstyle={{
              backgroundColor: '#000',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              width: '95%',
              // padding:10
              marginBottom: 20,
            }}
            textStyle={{
              color: '#fff',
              fontSize: 20,
              fontFamily: 'Roboto Condensed Bold',
            }}
            onPress={NavigateSignup}
            BtnName="Sign up"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
