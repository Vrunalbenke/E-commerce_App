import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './Style';
import CustomHeader from '../../components/CustomHeader';
import CustomInputField from '../../components/CustomInputField';
import CheckBox from '@react-native-community/checkbox';
import CustomButton from '../../components/CustomButton';
import CustomToggleButton from '../../components/CustomToggleButton';
import {SignupNavigatonProp} from '../../navigation/type';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { registerUser } from '../../redux/Slice/registerSlice';
import Toast from 'react-native-simple-toast'

export type errorsProps = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const Signup = ({navigation}: SignupNavigatonProp) => {

const dispatch = useAppDispatch();
const AuthData = useAppSelector(state => {state.Auth.AuthData})

  const [inputs, setInputs] = useState<errorsProps>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    checkBox: false,
    gender: '',
  });

  const [checkBox, setCheckBox] = useState(false);
  const [gender, setGender] = useState<string>('');

  useEffect(() => {}, [gender]);

  function validate() {
    Keyboard.dismiss();
    console.log(gender);
    console.log(checkBox);
    let valid = true;

    if (!inputs.first_name) {
      handleError('first_name', 'Please input Firstname');
      valid = false;
    } else if (!inputs.first_name.match(/^[A-Za-z\s'-]+$/)) {
      handleError('first_name', 'Please input valid Firstname');
      valid = false;
    }

    if (!inputs.last_name) {
      handleError('last_name', 'Please input Lastname');
      valid = false;
    } else if (!inputs.last_name.match(/^[A-Za-z\s'-]+$/)) {
      handleError('last_name', 'Please input valid Lastname');
      valid = false;
    }

    if (!inputs.email) {
      handleError('email', 'Please input email');
      valid = false;
    } else if (
      !inputs.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      handleError('email', 'Please input valid email');
      valid = false;
    }

    if (!inputs.phone) {
      handleError('phone', 'Please input Phone number');
      valid = false;
    } else if (!inputs.phone.match(/^\d{10}$/)) {
      handleError('phone', 'Please input valid Phone number');
      valid = false;
    }

    if (!inputs.password) {
      handleError('password', 'Please input password');
      valid = false;
    } else if (
      !inputs.password.match(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:;<>,.?~])[A-Za-z\d!@#$%^&*()_+{}|:;<>,.?~]{8,}$/,
      )
    ) {
      handleError('password', 'Please input valid password');
      valid = false;
    }

    if (!inputs.confirmPassword) {
      handleError('password', 'Please input Confirm Password');
      valid = false;
    } else if (inputs.password !== inputs.confirmPassword) {
      handleError(
        'confirmPassword',
        "Password and Confirm Password doesn't match",
      );
      valid = false;
    }

    if (!gender) {
      handleError('gender', '*');
      valid = false;
    }

    if (!checkBox) {
      setErrors(prevState => ({...prevState, checkBox: true}));
      valid = false;
    }
    // console.log(valid)
    if (valid) {
      register();
    }
  }

  async function register() {
    let formData = new FormData();

    formData.append('first_name',inputs.first_name)
    formData.append('last_name',inputs.last_name)
    formData.append('email',inputs.email)
    formData.append('password',inputs.password)
    formData.append('confirm_password',inputs.confirmPassword)
    formData.append('gender',gender)
    formData.append('phone_no',inputs.phone)
    
    try{
      const data = await dispatch(registerUser(formData)).unwrap()
      console.log('Success ',data)
      navigation.navigate('Login');
    }
    catch{
      console.log('error is catched!')
    }
  }

  function handleOnChange(text: string, input: string) {
    console.log(text)
    setInputs(preState => ({...preState, [input]: text}));
  }

  function handleError(input: string, errorMessage: string | null) {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  }

  function HandleGender(mf: string) {
    setGender(mf);
    handleError(gender,null)
  }

  function ValidateCheckBox() {
    // console.log(checkBox)
    setCheckBox(!checkBox);
    // console.log(checkBox)
  }

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView bounces={false}>
          <View style={[styles.signupContainer]}>
            <CustomHeader
              style={{
                fontSize: 50,
                fontFamily: 'Bebas Neue Bold',
                // color:"#149953"
              }}
              headerContainerStyle={{
                height: '25%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              headerTitle="NeoSTORE"
            />
            <View style={styles.MidArea}>
              <Text style={styles.greeting}>Register</Text>
              <Text style={styles.loginActionText}>Create an new account</Text>
            </View>

            <CustomInputField
              label="First Name"
              placeholder="Vrunal"
              secureTextEntry={false}
              // errorText = 'Should only contain alphabets'
              icon={false}
              error={errors.first_name}
              onChangeText={(text: string) =>
                handleOnChange(text, 'first_name')
              }
              onFocus={() => handleError('first_name', null)}
            />

            <CustomInputField
              label="Last Name"
              placeholder="Benke"
              secureTextEntry={false}
              // errorText = 'Should only contain alphabets'
              icon={false}
              error={errors.last_name}
              onFocus={() => handleError('last_name', null)}
              onChangeText={(text: string) => handleOnChange(text, 'last_name')}
            />

            <CustomInputField
              label="Email"
              placeholder="vrunalbenke@gmail.com"
              secureTextEntry={false}
              // errorText = 'Enter a valid email address'
              icon={false}
              error={errors.email}
              onFocus={() => handleError('email', null)}
              onChangeText={(text: string) => handleOnChange((text.toLowerCase()), 'email')}

              // regexFuncName={EmailValidator}
            />

            <CustomInputField
              label="Phone Number"
              placeholder="1234567894"
              secureTextEntry={false}
              // errorText = 'Phone number should only contain number'
              keyboardType="numeric"
              maxLength={10}
              icon={false}
              error={errors.phone}
              onFocus={() => handleError('phone', null)}
              onChangeText={(text: string) => handleOnChange(text, 'phone')}
            />

            <CustomInputField
              label="Password"
              placeholder="***********"
              secureTextEntry={true}
              icon={true}
              // errorText = 'Minimuim length 8, minimuim 1 speical charater and 1 Capital Character and number'
              error={errors.password}
              onFocus={() => handleError('password', null)}
              onChangeText={(text: string) => handleOnChange(text, 'password')}
            />

            <CustomInputField
              label="Confirm Password"
              placeholder="***********"
              secureTextEntry={true}
              icon={true}
              error={errors.confirmPassword}
              onFocus={() => handleError('confirmPassword', null)}
              onChangeText={(text: string) =>
                handleOnChange(text, 'confirmPassword')
              }
            />

            <CustomToggleButton
              onPress={HandleGender}
              gender={gender}
              error={errors.gender}
            />
            <View style={[styles.bottomArea]}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: errors.checkBox ? 'red' : 'transparent',
                }}>
                <CheckBox
                  value={checkBox}
                  onValueChange={ValidateCheckBox}
                  lineWidth={1}
                  boxType={'square'}
                  onCheckColor="#fff"
                  onFillColor="#000"
                  onTintColor="#000"
                  animationDuration={0.3}
                  onAnimationType={'stroke'}
                  offAnimationType={'stroke'}
                />
              </View>
              <View style={styles.TCContainer}>
                <Text style={styles.TCText}>
                  By creating an account you have to agree with our terms &
                  conditions
                </Text>
              </View>
            </View>

            <CustomButton onPress={validate} BtnName="Register" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
