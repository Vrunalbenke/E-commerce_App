import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../components/CustomHeader';
import font from '../../Constants/fonts';
import {ForgotPasswordNavigationProp} from '../../navigation/type';
import CustomInputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import {useAppDispatch} from '../../redux/store';
import {getPassword} from '../../redux/Slice/passwordSlice';

const ForgotPassword = ({navigation}: ForgotPasswordNavigationProp) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleOnChange(text: string) {
    console.log(text);
    setEmail(text);
  }

  function handleError(errorMessage: string) {
    setError(errorMessage);
  }

  function validate() {
    let valid = true;

    if (email.trim() === '') {
      handleError('Please input email');
      valid = false;
    }
    if (valid) {
      forgotPass();
    }
  }

  async function forgotPass() {
    try {
      await dispatch(getPassword(email)).unwrap();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerConatianer}>
        <TouchableOpacity
          style={styles.IconContainer}
          onPress={() => navigation.navigate('Login')}>
          <Ionicons name="arrow-back-outline" size={30} />
        </TouchableOpacity>
        {/* <CustomHeader
          style={{
            paddingTop: 6,
            fontSize: 30,
            fontFamily: font.BebasNB,
          }}
          headerContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 10,
          }}
          headerTitle="Forget Password"
        /> */}
        {/* <View style={styles.headerRightConatianer}>
          <TouchableOpacity style={styles.IconContainer}>
            <Ionicons name="search" size={30} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.IconContainer} onPress={()=> navigation.navigate('Cart')}>
            <Ionicons name="cart" size={30} />
          </TouchableOpacity>
        </View> */}
      </View>

      {/* <View></View> */}
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
        <Image
          source={require('../../assets/images/ForgotPassword.png')}
          style={{width: 300, height: 300}}
        />
        <View>
          <View style={{alignItems: 'flex-start'}}>
            <Text style={{fontSize: 45, fontWeight: 'bold', color: '#263238'}}>
              Forgot{' '}
            </Text>
            <Text style={{fontSize: 45, fontWeight: 'bold', color: '#263238'}}>
              Password?
            </Text>
            <Text style={{fontSize: 20, fontWeight: '500', color: '#263238'}}>
              Enter the email address associated
            </Text>
            <Text style={{fontSize: 20, fontWeight: '500', color: '#263238'}}>
              with your account.
            </Text>
            <CustomInputField
              label="Email"
              placeholder="vrunalbenke@gmail.com"
              secureTextEntry={false}
              icon={false}
              onChangeText={(text: string) =>
                handleOnChange(text.toLowerCase())
              }
              error={error}
            />
            <CustomButton BtnName="Login" onPress={validate} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  headerConatianer: {
    flexDirection: 'row',
    // backgroundColor: '#f4f4f4',
    // backgroundColor: '#d4d1d1',
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  IconContainer: {
    padding: 10,
  },
  headerRightConatianer: {
    flexDirection: 'row',
  },
});
