import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ChangePasswordNavigationProp} from '../../navigation/type';
import CustomButton from '../../components/CustomButton';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { changePassword } from '../../redux/Slice/passwordSlice';

const ChangePassword = ({navigation}: ChangePasswordNavigationProp) => {
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector(state => state.Auth.AccessToken);
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
      console.log('Change password successfully');
      navigation.navigate('Profile');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#d4d1d1'}}>
      <View style={styles.headerConatianer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="arrow-back-outline" size={29} />
        </TouchableOpacity>
      </View>

      <View style={styles.MainContainer}>
        {/* <Image 
        source={require('../../assets/images/ResetPassword.png')}
        style={{width:300,height:300}}
        /> */}
        <View>
          <Text style={{fontSize: 45, fontWeight: 'bold', color: '#263238'}}>
            Change Password
          </Text>
          <Text style={{fontSize: 18, fontWeight: '500', color: '#263238'}}>
          Much like we sharpen our tools every week for precision, remember to sharpen your online security by changing your password every 3 months. Keep your digital space finely tuned and protected!" 🔧🔐💻
          </Text>
          <View style={{marginTop: 20}}>
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
              <CustomButton onPress={validate} BtnName="Save Changes" />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  headerConatianer: {
    // backgroundColor:'#d4d1d1',
    padding: 5,
    margin: 0,
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
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  error: {
    color: 'red',
  },
});
