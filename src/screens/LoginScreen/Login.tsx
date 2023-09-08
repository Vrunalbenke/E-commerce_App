import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomInputField from '../../components/CustomInputField';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';

const Login = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.loginContainer}>
        <CustomHeader
          style={{
            fontSize: 50,
            fontFamily: 'Bebas Neue Bold',
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
          
          style={{
            fontSize: 18,
            fontFamily: 'Roboto Condensed',
            borderRadius: 10,
            paddingLeft: 10,
            marginBottom: 25,
            height: 35,
            borderBottomWidth: 1,
            borderBottomColor: '#b1afaf',
          }}
          deCaptialize = {((value:string) =>{
             return value.toLowerCase()
          })}
        />
        <CustomInputField
          label="Password"
          placeholder="*********"
          secureTextEntry={true}
          style={{
            fontSize: 20,
            fontFamily: 'Roboto Condensed',
            borderRadius: 10,
            paddingLeft: 10,
            margin: 0,
            height: 35,
            borderBottomWidth: 1,
            borderBottomColor: '#b1afaf',
          }}
        />
        <View style={styles.LoginBtn}>
          <CustomButton
            style={{
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
            BtnName="Login in"
          />
          
          <Text style = {{marginVertical:10,fontSize:17}}>or</Text>
          
          <CustomButton
            style={{
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
            onPress={() => console.log('abc')}
            BtnName="Sign up"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ececec',
  },
  loginContainer: {
    flex: 1,
    padding: 10,
  },
  MidArea: {
    height: '15%',
  },
  greeting: {
    fontFamily: 'Roboto Condensed',
    fontWeight: '600',
    fontSize: 24,
    letterSpacing: 1.2,
  },
  loginActionText: {
    fontSize: 16,
    color: '#666464',
  },
  LoginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
});
