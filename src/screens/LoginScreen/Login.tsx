import {
  SafeAreaView,
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
          secureTextEntry={false}         
          icon={false}
        />

        <CustomInputField
          label="Password"
          placeholder="***********"
          secureTextEntry={true}
          icon={true}
          
        />
        <TouchableOpacity style={styles.ForgetPassContainer}>
          <Text style={styles.ForgetPass}>Forgot Password?</Text>
        </TouchableOpacity>


        <View style={styles.LoginBtn}>
          <CustomButton
            BtnName="Login"
          />

          <Text style={{marginVertical: 10, fontSize: 17}}>or</Text>

          <CustomButton
            onPress={NavigateSignup}
            BtnName="Sign up"
          />

        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
