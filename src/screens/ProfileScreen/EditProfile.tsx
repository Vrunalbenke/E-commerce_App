import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {EditProfileNavigationProp} from '../../navigation/type';
import {TextInput} from 'react-native-gesture-handler';
import CustomHeader from '../../components/CustomHeader';
import font from '../../Constants/fonts';
import {Calendar} from 'react-native-calendars';
import CustomButton from '../../components/CustomButton';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getUserDetail, updateUserDetail} from '../../redux/Slice/userSlice';

const EditProfile = ({navigation}: EditProfileNavigationProp) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.Auth.AccessToken);
  const UserStoreData = useAppSelector(state => state.Auth.AuthData)
  console.log(UserStoreData.email,'*&^%$%^&*&^%$%^&')
  const [modal, showModal] = useState(false);
  const [date, setDate] = useState('');
  const currentDate = new Date();
  console.log(
    currentDate.getDate(),
    ' ',
    currentDate.getMonth(),
    ' ',
    currentDate.getFullYear(),
  );
  const eligibleDate = `${
    currentDate.getFullYear() - 16
  }-${currentDate.getMonth()}-${currentDate.getDate()}`;
  console.log(eligibleDate);

  const [input, setInput] = useState({
    email: UserStoreData.email,
    first_name: UserStoreData.first_name,
    last_name: UserStoreData.last_name,
    dob: '',
    phone_no: UserStoreData.phone_no,
  });

  const [error, setError] = useState({
    email: '',
    first_name: '',
    last_name: '',
    dob: '',
    phone_no: '',
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

    if (input.email.trim() === '') {
      handleError('email', 'Please input email');
      valid = false;
    } else if (
      !input.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      handleError('email', 'Please input valid email');
      valid = false;
    }

    if (!input.first_name || !input.last_name) {
      handleError('first_name', 'Please input name');
      valid = false;
    } else if (
      !input.first_name.match(/^[A-Za-z\s'-]+$/) ||
      !input.last_name.match(/^[A-Za-z\s'-]+$/)
    ) {
      handleError('first_name', 'Please input valid name');
      valid = false;
    }

    if (!input.phone_no) {
      handleError('phone_no', 'Please input Phone number');
      valid = false;
    }
    //   else if (!input.phone_no.match(/^\d{10}$/)) {
    //     handleError('phone', 'Please input valid Phone number');
    //     valid = false;
    //   }

    if (!input.dob) {
      handleError('dob', 'Please input Date of birth');
      valid = false;
    }

    if (valid) {
      loggedIN();
    }
  }

  async function loggedIN() {
    const formData = new FormData();
    formData.append('first_name', input.first_name);
    formData.append('last_name', input.last_name);
    formData.append('email', input.email);
    formData.append('dob', input.dob);
    formData.append('profile_pic', '');
    formData.append('phone_no', input.phone_no);
    console.log(formData);
    try {
      await dispatch(updateUserDetail({formData, accessToken})).unwrap();
      await dispatch(getUserDetail(accessToken)).unwrap();
      console.log('Update detail successfully');
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
        <CustomHeader
          style={{
            // paddingTop: 6,
            fontSize: 30,
            fontFamily: font.BebasNB,
          }}
          headerContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 10,
          }}
          headerTitle="Edit Profile"
        />
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Ionicons name="create-outline" size={29} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 10,
        }}>
        <View style={styles.LabelInputContainer}>
          <Text style={styles.Label}>Email Address</Text>
          {error.email && <Text style={styles.error}>{error.email}</Text>}
          <TextInput
            style={styles.InputFeild}
            placeholder="abc123@gmail.com"
            autoCorrect={false}
            value={input.email}
            onChangeText={(text: string) =>
              handleOnChange('email', text.toLowerCase())
            }
            onFocus={() => handleError('email', '')}
          />
        </View>

        <View style={styles.LabelInputContainer}>
          <Text style={styles.Label}>Full Name</Text>
          {error.first_name && (
            <Text style={styles.error}>{error.first_name}</Text>
          )}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              style={[styles.InputFeild, {width: '45%'}]}
              placeholder="first name"
              autoCorrect={false}
              value={input.first_name}
              onChangeText={(text: string) =>
                handleOnChange('first_name', text)
              }
              onFocus={() => handleError('first_name', '')}
            />
            <TextInput
              style={[styles.InputFeild, {width: '45%'}]}
              placeholder="last name"
              autoCorrect={false}
              value={input.last_name}
              onChangeText={(text: string) => handleOnChange('last_name', text)}
              onFocus={() => handleError('last_name', '')}
            />
          </View>
        </View>

        <View style={styles.LabelInputContainer}>
          <Text style={styles.Label}>Date of Birth</Text>
          {error.dob && <Text style={styles.error}>{error.dob}</Text>}
          <TouchableOpacity onPress={() => showModal(!modal)}>
            <TextInput
              style={[styles.InputFeild, {width: '50%'}]}
              placeholder="dd-mm-year"
              onFocus={() => showModal(!modal)}
              value={date}
              // onChangeText={(text:string)=>handleOnChange('dob',text)}
              // onFocus={() => handleError('dob', '')}
            />
            <Modal visible={modal} style={{width: '70%', height: 'auto'}}>
              <Calendar
                style={{
                  borderRadius: 10,
                  margin: 40,
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                  shadowColor: '#000',
                  shadowOpacity: 0.9,
                }}
                onDayPress={date => {
                  // console.log(date.)
                  const selectDate = `${date.day}-${date.month}-${date.year}`;
                  setDate(selectDate);
                  handleOnChange('dob', selectDate);
                  showModal(!modal);
                }}
                initialDate={eligibleDate}
                minDate=""
                maxDate={eligibleDate}
              />
            </Modal>
          </TouchableOpacity>
        </View>

        <View style={styles.LabelInputContainer}>
          <Text style={styles.Label}>Phone number</Text>
          {error.phone_no && <Text style={styles.error}>{error.phone_no}</Text>}
          <TextInput
            style={styles.InputFeild}
            placeholder="9875678987"
            maxLength={10}
            autoCorrect={false}
            value={input.phone_no}
            onChangeText={(text: string) => handleOnChange('phone_no', text)}
            onFocus={() => handleError('phone_no', '')}
          />
        </View>

        <View style={{marginTop: 20}}>
          <CustomButton onPress={validate} BtnName="Save Changes" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  headerConatianer: {
    // backgroundColor:'#d4d1d1',
    // padding: 10,
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
