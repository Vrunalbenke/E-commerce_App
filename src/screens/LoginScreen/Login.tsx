import {SafeAreaView, Text, TouchableOpacity, View,Modal,Dimensions} from 'react-native';
import React, {useState} from 'react';
import CustomInputField from '../../components/CustomInputField';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import {styles} from './style';
import {LoginNavigatonProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {loginUser} from '../../redux/Slice/registerSlice';
import Toast from 'react-native-simple-toast';
import font from '../../Constants/fonts';
import {AppName} from '../../Constants/string';
import LottieView from 'lottie-react-native';



const Login = ({navigation}: LoginNavigatonProp) => {
  const dispatch = useAppDispatch();
  const LoginDataFromAPI = useAppSelector(state => state.Auth.AuthData);
  const [isLoading,setIsloading] = useState(false)
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  function NavigateSignup() {
    navigation.navigate('Signup');
  }

  function handleOnChange(input: string, text: string | null) {
    console.log(text);
    setInputs(prevState => ({...prevState, [input]: text}));
  }

  function handleError(input: string, errorMessage: string) {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  }

  function handleForgotPassword() {
    navigation.navigate('ForgotPassword');
  }
  function validate() {
    let valid = true;
    setIsloading(true)
    if (inputs.email.trim() === '') {
      handleError('email', 'Email required');
      valid = false;
    }

    if (inputs.password.trim() === '') {
      handleError('password', 'Password required');
      valid = false;
    }

    if (valid) {
      loggedIN();
    }
  }

  async function loggedIN() {
    const formData = new FormData();
    formData.append('email', inputs.email);
    formData.append('password', inputs.password);
    try {
      const data = await dispatch(loginUser(formData)).unwrap();
      console.log('Login Data:--', data);
      setIsloading(false)
      navigation.navigate('AppStack');
    } catch {
      console.log('Error is catched', LoginDataFromAPI);
      setIsloading(false)
      const toastErrMsg: string = LoginDataFromAPI[0];
      Toast.showWithGravity(toastErrMsg, Toast.SHORT, Toast.CENTER);
      
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.loginContainer}>
      <Modal visible={isLoading} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <LottieView
          style={styles.Loader}
          source={require('../../assets/Lottie-JSON/logoutLoader.json')}
          autoPlay
          loop
          />
        </View>
      </Modal>
        <CustomHeader
          style={{
            fontSize: 50,
            fontFamily: font.BebasNB,
            color: '#fff',
          }}
          headerContainerStyle={{
            height: '25%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          headerTitle={AppName}
        />

        <View style={styles.MainContainer}>
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
            onChangeText={(text: string) =>
              handleOnChange('email', text.toLowerCase())
            }
            error={errors.email}
          />

          <CustomInputField
            label="Password"
            placeholder="***********"
            secureTextEntry={true}
            icon={true}
            onChangeText={(text: string) => handleOnChange('password', text)}
            error={errors.password}
          />
          <TouchableOpacity
            style={styles.ForgetPassContainer}
            onPress={handleForgotPassword}>
            <Text style={styles.ForgetPass}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.LoginBtn}>
            <CustomButton BtnName="Login" onPress={validate} />

            <Text style={{marginVertical: 10, fontSize: 17}}>or</Text>

            <CustomButton onPress={NavigateSignup} BtnName="Sign up" />
          </View>
        </View>
      </View>
      
    </SafeAreaView>
  );
};

export default Login;
