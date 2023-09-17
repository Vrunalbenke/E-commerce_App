import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomInputField from '../../components/CustomInputField';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import {styles} from './style';
import {LoginNavigatonProp} from '../../navigation/type';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { loginUser } from '../../redux/Slice/registerSlice';
import Toast from 'react-native-simple-toast';

const Login = ({navigation}: LoginNavigatonProp) => {

  const dispatch = useAppDispatch();
  const LoginDataFromAPI = useAppSelector(state => (state.Auth.AuthData))
  const [inputs,setInputs] = useState({
    email:'',
    password:''
  })

  const [errors,setErrors] = useState({
    email:'',
    password:''
  })


  function NavigateSignup() {
    navigation.navigate('Signup');
  }

  function handleOnChange(input:string,text:string | null){
    console.log(text)
    setInputs(prevState => ({...prevState,[input]:text}))
  }

  function handleError(input:string,errorMessage:string){
      setErrors(prevState => ({...prevState,[input]:errorMessage}))
  }


  function handleForgotPassword(){
    navigation.navigate('ForgotPassword')
  }
  function validate(){
    let valid = true

    if(inputs.email.trim() === ''){
      handleError('email','Please input email')
      valid = false
    }

    if(inputs.password.trim() === ''){
      handleError('email','Please input password')
      valid = false
    }

    if(valid){
      loggedIN()
    }
  }
   
  async function loggedIN(){
    const formData = new FormData();
    formData.append('email',inputs.email)
    formData.append('password',inputs.password)
    try{
      const data = await dispatch(loginUser(formData)).unwrap();
      console.log("Login Data:--",data)
      navigation.navigate('Home')
    }
    catch{
      console.log('Error is catched',LoginDataFromAPI)
      const toastErrMsg:string = LoginDataFromAPI[0];
      Toast.showWithGravity(toastErrMsg,Toast.SHORT,Toast.CENTER)
    }
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
          onChangeText={(text:string)=>handleOnChange('email',text.toLowerCase())}
          error={errors.email}
        />

        <CustomInputField
          label="Password"
          placeholder="***********"
          secureTextEntry={true}
          icon={true}
          onChangeText={(text:string)=>handleOnChange('password',text)}
          error={errors.password}
        />
        <TouchableOpacity style={styles.ForgetPassContainer} onPress={handleForgotPassword}>
          <Text style={styles.ForgetPass}>Forgot Password?</Text>
        </TouchableOpacity>


        <View style={styles.LoginBtn}>
          <CustomButton
            BtnName="Login"
            onPress={validate}
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
