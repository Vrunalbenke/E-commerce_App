import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ChangePasswordNavigationProp} from '../../navigation/type';
import CustomButton from '../../components/CustomButton';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { changePassword } from '../../redux/Slice/passwordSlice';
import CustomHeader from '../../components/CustomHeader';
import font from '../../Constants/fonts'
import LottieView from 'lottie-react-native';

const {width,height} = Dimensions.get('screen')
const ChangePassword = ({navigation}: ChangePasswordNavigationProp) => {
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector(state => state.Auth.AccessToken);
    const [isLoading,setIsloading] = useState(false)

  const [input, setInput] = useState({
    old_password: '',
    password: '',
    confirm_password: '',
  });

  const [error, setError] = useState({
    old_password: '',
    password: '',
    confirm_password: '',
  });

  function handleOnChange(input: string, text: string | null) {
    console.log(text);
    setInput(prevState => ({...prevState, [input]: text}));
  }

  function handleError(input: string, errorMessage: string) {
    setError(prevState => ({...prevState, [input]: errorMessage}));
  }

  function validate() {
    let valid = true;
    setIsloading(true)

    if (!input.old_password) {
        handleError('old_password', 'Please input password');
        valid = false;
      } else if (
        !input.old_password.match(
          /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:;<>,.?~])[A-Za-z\d!@#$%^&*()_+{}|:;<>,.?~]{8,}$/,
        )
      ) {
        handleError('old_password', 'Please input valid password');
        valid = false;
      }
    if (!input.password) {
      handleError('password', 'Please input password');
      valid = false;
    } else if (
      !input.password.match(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:;<>,.?~])[A-Za-z\d!@#$%^&*()_+{}|:;<>,.?~]{8,}$/,
      )
    ) {
      handleError('password', 'Please input valid password');
      valid = false;
    }

    if (!input.confirm_password) {
      handleError('password', 'Please input Confirm Password');
      valid = false;
    } else if (input.password !== input.confirm_password) {
      handleError(
        'confirm_password',
        "Password and Confirm Password doesn't match",
      );
      valid = false;
    }

    if (valid) {
      loggedIN();
    }
  }

  async function loggedIN() {
    const formData = new FormData();
    formData.append('old_password', input.old_password);
    formData.append('password', input.password);
    formData.append('confirm_password', input.confirm_password);
    console.log(formData);
    try {
        await dispatch(changePassword({formData, accessToken})).unwrap();
        // await dispatch(getUserDetail(accessToken)).unwrap();
        setIsloading(false)
      console.log('Change password successfully');
      navigation.navigate('Profile');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#325f88'}}>
      <View style={styles.headerContianer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="arrow-back-outline" size={29} color={'#fff'}/>
        </TouchableOpacity>
        <CustomHeader
          style={{
            // paddingTop: 6,
            fontSize: 30,
            fontFamily: font.BebasNB,
            color: '#fff',
          }}
          headerContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 10,
          }}
          headerTitle="Change Password"
        />
        <View></View>
      </View>

      <View style={styles.MainContainer}>
        {/* <Image 
        source={require('../../assets/images/ResetPassword.png')}
        style={{width:300,height:300}}
        /> */}
        <View style={{paddingTop:10}}>
          {/* <Text style={{fontSize: 45, fontWeight: 'bold',   color:'#325f88'}}>
            Change Password
          </Text> */}
          <Text style={{fontSize: 20, fontWeight: '600', color: '#263238'}}>
          Remeber to change your password every 3 months. Keep your digital space finely tuned and protected!" 🔧🔐💻
          </Text>
          <View style={{marginTop: 10}}>
            <View style={styles.LabelInputContainer}>
              <Text style={styles.Label}>Old password</Text>
              {error.old_password && (
                <Text style={styles.error}>{error.old_password}</Text>
              )}
              <TextInput
                style={styles.InputFeild}
                placeholder="abc123@gmail.com"
                autoCorrect={false}
                value={input.old_password}
                onChangeText={(text: string) =>
                  handleOnChange('old_password', text)
                }
                onFocus={() => handleError('old_password', '')}
              />
            </View>

            <View style={styles.LabelInputContainer}>
              <Text style={styles.Label}>Password</Text>
              {error.password && (
                <Text style={styles.error}>{error.password}</Text>
              )}
              <TextInput
                style={styles.InputFeild}
                placeholder="abc123@gmail.com"
                autoCorrect={false}
                value={input.password}
                onChangeText={(text: string) =>
                  handleOnChange('password', text)
                }
                onFocus={() => handleError('password', '')}
              />
            </View>

            <View style={styles.LabelInputContainer}>
              <Text style={styles.Label}>Confirm password</Text>
              {error.confirm_password && (
                <Text style={styles.error}>{error.confirm_password}</Text>
              )}
              <TextInput
                style={styles.InputFeild}
                placeholder="abc123@gmail.com"
                autoCorrect={false}
                value={input.confirm_password}
                onChangeText={(text: string) =>
                  handleOnChange('confirm_password', text)
                }
                onFocus={() => handleError('confirm_password', '')}
              />
            </View>

            <View style={{marginTop: 20}}>
              <CustomButton onPress={validate} BtnName="Change Password" />
            </View>
          </View>
        </View>
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
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  headerContianer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    padding: 10,
  },
  LabelInputContainer: {
    margin: 10,
    gap: 10,
    
  },
  Label: {
    fontSize: 20,
  },
  InputFeild: {
    backgroundColor: '#f4f3f3',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  error: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:100
  },
  Loader:{
    width:width*0.15,
    height:width*0.15,
  }
});
