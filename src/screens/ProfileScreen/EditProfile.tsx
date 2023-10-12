import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Modal,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {EditProfileNavigationProp} from '../../navigation/type';
import CustomHeader from '../../components/CustomHeader';
import font from '../../Constants/fonts';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../../components/CustomButton';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getUserDetail, updateUserDetail} from '../../redux/Slice/userSlice';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Button,
  PaperProvider,
  Dialog,
  Portal,
  Avatar,
} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {LoginDataType ,user_dataType} from './type';

const {width, height} = Dimensions.get('screen');

const EditProfile = ({navigation}: EditProfileNavigationProp) => {
  const dispatch = useAppDispatch();
  const accessToken:string = useAppSelector(state => state.Auth.AccessToken);
  const UserStoreData:LoginDataType = useAppSelector(state => state.Auth.AuthData);
  const UserData:user_dataType = useAppSelector(state => state.User.user);
  const [modal, showModal] = useState(false);
  const [optionModal, setOptionModal] = useState(false);
  const [date, setDate] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [isLoading, setIsloading] = useState(false);
  const currentDate = new Date();

  const eligibleDate = `${
    currentDate.getFullYear() - 16
  }-${currentDate.getMonth()}-${currentDate.getDate()}`;
  console.log(eligibleDate);

  const [input, setInput] = useState({
    email: UserStoreData.email,
    first_name: UserStoreData.first_name,
    last_name: UserStoreData.last_name,
    dob: UserStoreData.dob,
    phone_no: UserStoreData.phone_no,
    profile_pic: UserData.profile_pic,
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
    setIsloading(true);
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
    } else if (!input.phone_no.match(/^\d{10}$/)) {
      handleError('phone', 'Please input valid Phone number');
      valid = false;
    }

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
    formData.append('profile_pic', input.profile_pic);
    formData.append('phone_no', input.phone_no);
    console.log(formData);
    try {
      await dispatch(updateUserDetail({formData, accessToken})).unwrap();
      await dispatch(getUserDetail(accessToken)).unwrap();

      setTimeout(() => {
        setIsloading(false);
        navigation.navigate('Profile');
        console.log('Update detail successfully');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handlePhotoUpload = async () => {
    showDialog();
    console.log('async upload');
  };

  function SelectImage() {
    console.log('first');
    hideDialog();
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      console.log(image);

      handleOnChange('profile_pic', `data:image/jpg;base64,${image.data}`);
    });
  }

  function ClickImage() {
    hideDialog();
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      console.log(image.path);
      handleOnChange('profile_pic', `data:image/jpg;base64,${image.data}`);
    });
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#325f88'}}>
      <PaperProvider>
        <Portal>
          <Dialog style={styles.Modal} visible={visible} onDismiss={hideDialog}>
            <Dialog.Title style={styles.ModalTitle}>Upload Image </Dialog.Title>

            {Platform.OS === 'android' ? (
              <Dialog.Content
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity
                  onPress={SelectImage}
                  style={{gap: 10, alignItems: 'center'}}>
                  <Avatar.Image
                    size={80}
                    source={require('../../assets/images/AndroidCameraLogo.png')}
                  />
                  <Text style={{fontSize: 18, fontWeight: '600'}}>
                    Select Image
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={ClickImage}
                  style={{gap: 10, alignItems: 'center'}}>
                  <Avatar.Image
                    size={80}
                    source={require('../../assets/images/Android_Photos_Logo.jpeg')}
                  />
                  <Text style={{fontSize: 18, fontWeight: '600'}}>
                    Open Camera
                  </Text>
                </TouchableOpacity>
              </Dialog.Content>
            ) : (
              <Dialog.Content
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity
                  onPress={SelectImage}
                  style={{gap: 10, alignItems: 'center'}}>
                  <Avatar.Image
                    size={80}
                    source={require('../../assets/images/ApplePhotosLogo.png')}
                  />
                  <Text style={{fontSize: 18, fontWeight: '600'}}>
                    Select Photo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={ClickImage}
                  style={{gap: 10, alignItems: 'center'}}>
                  <Avatar.Image
                    size={80}
                    source={require('../../assets/images/Iphone_Camera_Logo.png')}
                  />
                  <Text style={{fontSize: 18, fontWeight: '600'}}>
                    Open Camera
                  </Text>
                </TouchableOpacity>
              </Dialog.Content>
            )}
            <Dialog.Actions
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={hideDialog}
                style={{
                  backgroundColor: '#325f88',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 8,
                }}>
                <Text style={{fontSize: 20, fontWeight: '600', color: '#fff'}}>
                  Close
                </Text>
              </TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View style={styles.headerConatianer}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="arrow-back-outline" size={29} color={'#fff'} />
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
            headerTitle="Edit Profile"
          />
          <View></View>
        </View>

        <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 10,
            position: 'relative',
          }}>
          <View style={styles.EditImage}>
            {!input.profile_pic ? (
              <Image
                source={require('../../assets/images/UserImage.jpg')}
                style={{width: 120, height: 120, borderRadius: 60}}
              />
            ) : (
              <Image
                source={{uri: input.profile_pic}}
                style={{width: 120, height: 120, borderRadius: 60}}
              />
            )}

            <TouchableOpacity
              onPress={() => {
                console.log('first');
                handlePhotoUpload();
                // setOptionModal(!optionModal);
              }}>
              <MaterialIcons name="edit" size={25} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
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
                onChangeText={(text: string) =>
                  handleOnChange('last_name', text)
                }
                onFocus={() => handleError('last_name', '')}
              />
            </View>
          </View>

          <View style={styles.LabelInputContainer}>
            <Text style={styles.Label}>Date of Birth</Text>
            {error.dob && <Text style={styles.error}>{error.dob}</Text>}
            <TouchableOpacity onPress={() => showModal(!modal)} style={{width: '50%'}}>
              <TextInput
                style={[styles.InputFeild, {width: '100%'}]}
                placeholder="dd-mm-year"
                onFocus={() => showModal(!modal)}
                value={input.dob}
              />
              <DatePicker
                modal
                mode="date"
                open={modal}
                date={new Date()}
                theme="dark"
                maximumDate={new Date(eligibleDate)}
                onConfirm={date => {
                  console.log(date, '🚧🚧🚧🚧🚧🚧');
                  const selectDate = `${date.getDate()}-${
                    date.getMonth() + 1
                  }-${date.getFullYear()}`;
                  console.log(selectDate, '🚧🚧🚧🚧🚧🚧');
                  showModal(!modal);
                  handleOnChange('dob', selectDate);
                }}
                onCancel={() => {
                  showModal(!modal);
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.LabelInputContainer}>
            <Text style={styles.Label}>Phone number</Text>
            {error.phone_no && (
              <Text style={styles.error}>{error.phone_no}</Text>
            )}
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

          <View style={{marginTop: 20,marginBottom:20}}>
            <CustomButton onPress={validate} BtnName="Save Changes" />
          </View>
        </ScrollView>
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
      </PaperProvider>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  headerConatianer: {
    // backgroundColor:'#d4d1d1',
    padding: 10,
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  LabelInputContainer: {
    margin: 10,
    gap: 10,
  },
  Label: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
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
  EditImage: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    left: 40,
    bottom: 0,
  },
  PhotosORCamera: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionContainer: {
    width: 200,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  ModalImage: {
    height: 50,
    width: 50,
  },
  optionText: {
    fontSize: 12,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 20,
  },
  cancelButtonText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  Modal: {
    backgroundColor: '#fff',
  },
  ModalTitle: {
    alignSelf: 'center',
  },
  ModalBtn: {
    borderRadius: 10,
    // borderWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 16,
    paddingHorizontal: 85,
    backgroundColor: '#325f88',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  Loader: {
    width: width * 0.15,
    height: width * 0.15,
  },
});
