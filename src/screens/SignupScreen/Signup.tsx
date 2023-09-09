import { StyleSheet,SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import { styles } from './Style'
import CustomHeader from '../../components/CustomHeader'
import CustomInputField from '../../components/CustomInputField'
import CheckBox from '@react-native-community/checkbox'
import CustomButton from '../../components/CustomButton'

const Signup = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.signupContainer}>
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
          <Text style={styles.greeting}>Sign Up</Text>
          <Text style={styles.loginActionText}>
            Create an new account
          </Text>
        </View>


        <CustomInputField
          label="User Name"
          placeholder="Vrunal Benke"
          secureTextEntry={true}
          deCaptialize={(value: string) => {
            return value.toLowerCase();
          }}
          textInputStyle={{
            fontSize: 18,
            fontFamily: 'Roboto Condensed',
            borderRadius: 10,
            paddingLeft: 10,
            // marginBottom: 15,
            height: 35,
            width:'85%'
          }}
          labelStyle={{
            fontSize: 20,
            fontFamily: 'Roboto Condensed',
            fontWeight: '500',
            paddingLeft: 10,
            letterSpacing: 1,
          }}
        />

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
            // marginBottom: 15,
            height: 35,
            width:'85%'
          }}
          labelStyle={{
            fontSize: 20,
            fontFamily: 'Roboto Condensed',
            fontWeight: '500',
            paddingLeft: 10,
            letterSpacing: 1,
          }}
        />

        <CustomInputField
          label="Password"
          placeholder="***********"
          secureTextEntry={true}
          deCaptialize={(value: string) => {
            return value.toLowerCase();
          }}
          Icon='eye-off'
          Icon2='eye'
          textInputStyle={{
            fontSize: 18,
            fontFamily: 'Roboto Condensed',
            borderRadius: 10,
            paddingLeft: 10,
            // marginBottom: 15,
            height: 35,
            width:'85%'
          }}
          labelStyle={{
            fontSize: 20,
            fontFamily: 'Roboto Condensed',
            fontWeight: '500',
            paddingLeft: 10,
            letterSpacing: 1,
          }}
        />

        <CustomInputField
          label="Confirm Password"
          placeholder="***********"
          secureTextEntry={true}
          deCaptialize={(value: string) => {
            return value.toLowerCase();
          }}
          Icon='eye-off'
          Icon2='eye'
          textInputStyle={{
            fontSize: 18,
            fontFamily: 'Roboto Condensed',
            borderRadius: 10,
            paddingLeft: 10,
            // marginBottom: 15,
            height: 35,
            width:'85%'
          }}
          labelStyle={{
            fontSize: 20,
            fontFamily: 'Roboto Condensed',
            fontWeight: '500',
            paddingLeft: 10,
            letterSpacing: 1,
          }}
        />


        <View style ={styles.bottomArea}>
            <View style={styles.CheckBox}>
                <CheckBox  
                lineWidth={1}
                boxType={'square'} 
                onCheckColor='#fff'
                onFillColor='#000'
                onTintColor='#000'
                animationDuration={0.3}
                onAnimationType={'stroke'}
                offAnimationType={'stroke'}
                />
            </View>
            <View style={styles.TCContainer}>
            <Text style={styles.TCText} >By creating an account you have to agree with our terms & conditions</Text>
            </View>
        </View>

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
          </View>
      </View>
    </SafeAreaView>
  )
}

export default Signup
