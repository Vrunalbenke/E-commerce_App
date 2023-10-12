import {
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Tooltip} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {ProfileNavigationProp} from '../../navigation/type';
import {logout} from '../../redux/Slice/registerSlice';
import {EmptyData} from '../../redux/Slice/addressSlice';
import font from '../../Constants/fonts';
import {CoinName, MemberShip} from '../../Constants/string';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('screen');

const Profile = ({navigation}: ProfileNavigationProp) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.Auth.AccessToken);
  const UserData = useAppSelector(state => state.User?.user?.data);
  const totalOrders = useAppSelector(state => state.Order?.orderList);
  const address = useAppSelector(state => state.Address?.address);
  const [open, setOpen] = useState(false);
  const [cfmLogout, setCfmLogout] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const CalNeoCoin = useCallback(() =>{
    const neocoins = totalOrders.data?.reduce((acc, curr) => {
      return (acc = acc + curr.cost);
    }, 0);
    console.log(neocoins, '💸💵💸💸💸');
    return Math.floor(neocoins * 0.1);
  },[totalOrders?.data])

  function LogoutUser() {
    setIsloading(true);
    console.log('Logged out');
    setCfmLogout(false);
    dispatch(logout(undefined));
    dispatch(EmptyData([]));
    console.log('Home data,AuthData is Popped:--😋#😋', accessToken);
    setTimeout(() => {
      setIsloading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }, 1500);
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#325f88'}}>
      <View style={styles.headerContianer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons
            name="arrow-back-outline"
            size={29}
            style={{color: '#ffffff'}}
          />
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
          headerTitle="Profile"
        />
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Ionicons
            name="create-outline"
            size={29}
            style={{color: '#ffffff'}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          //   paddingTop: 10,
          position: 'relative',
        }}>
        <View style={{alignItems: 'flex-end'}}>
          <View
            style={{
              alignItems: 'center',
              borderTopRightRadius: 10,
              backgroundColor: '#3498DB',
              borderBottomLeftRadius: 10,
            }}>
            <Text style={{padding: 4, color: '#ffffff', fontSize: 18}}>
              {MemberShip} member
            </Text>
          </View>
        </View>

        <View style={styles.SecondContainer}>
          <View>
            {UserData?.user_data?.profile_pic ? (
              <Image
                source={{uri: UserData?.user_data?.profile_pic}}
                style={{width: 120, height: 120, borderRadius: 60}}
              />
            ) : (
              <Image
                source={require('../../assets/images/UserImage.jpg')}
                style={{width: 120, height: 120, borderRadius: 60}}
              />
            )}
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              // backgroundColor:'pink',
              height: 120,
              width: '60%',
            }}>
            <Text style={styles.name}>
              {UserData?.user_data?.first_name} {UserData?.user_data?.last_name}
            </Text>

            <View style={{flexDirection:'row'}}>
              
              {address?.length > 0 && (
                <Text style={[styles.member, {}]}>
                    <Text style={{fontWeight:'600',fontSize:18,color:'#000'}}>Address: </Text>
                    <Text style={[styles.member, {}]}>
                      {address[0]?.streetAddress},{address[0]?.city}-
                      {address[0]?.postalCode},{address[0]?.state},
                      {address[0]?.country}
                    </Text>
                </Text>
                )}
              
            </View>
          </View>
        </View>
        <View style={styles.thirdContiner}>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Ionicons name="call-outline" size={25} color={'#3498db'} />
            <Text style={{fontSize: 18, color: '#000', fontWeight: '500'}}>
              {UserData?.user_data?.phone_no}
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Ionicons name="mail-outline" size={25} color={'#3498db'} />
            <Text style={{fontSize: 18, color: '#000', fontWeight: '500'}}>
              {UserData?.user_data?.email}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginVertical: 15,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#6b6666',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '50%',
              padding: 10,
              borderColor: '#6b6666',
              borderRightWidth: 1,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', gap: 8}}>
              <Image
                source={require('../../assets/images/Neocoins.png')}
                style={{width: 30, height: 30}}
              />
              <Text style={{fontSize: 20, color: '#000'}}>{CalNeoCoin()}</Text>
            </View>
            <View
              style={{
                paddingLeft: 10,
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'flex-end',
                gap: 2,
              }}>
              <Text style={{fontSize: 18, color: '#000000'}}>{CoinName}</Text>
              <Tooltip
                visible={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                backgroundColor={'#325f88'}
                width={300}
                height={60}
                containerStyle={{padding: 5}}
                popover={
                  <>
                    <Text style={{color: '#ffffff'}}>
                      Get {CoinName}: Earn 10% of your order's{' '}
                    </Text>
                    <Text style={{color: '#ffffff'}}>
                      worth in {CoinName}, which you can use on{' '}
                    </Text>
                    <Text style={{color: '#ffffff'}}>your next purchase!</Text>
                  </>
                }>
                <Ionicons name="information-circle-outline" size={18} />
              </Tooltip>
            </View>
          </View>
          <View
            style={{
              width: '50%',
              padding: 10,
              borderColor: '#6b6666',
              borderRightWidth: 1,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', gap: 8}}>
              <Text style={{fontSize: 20, color: '#000'}}>
                {totalOrders?.data?.length}
              </Text>
            </View>
            <View style={{marginTop: 5}}>
              <Text style={{fontSize: 18, color: '#000000'}}>Orders</Text>
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 20, gap: 20}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 20,
            }}
            onPress={() => navigation.navigate('ChangePassword')}>
            <MaterialIcons name="key" size={30} color={'#3498DB'} />
            <Text style={{fontSize: 20, color: '#000'}}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 20,
            }}
            onPress={() => navigation.navigate('AddressList')}>
            <MaterialIcons name="location-on" size={30} color={'#3498DB'} />
            <Text style={{fontSize: 20, color: '#000'}}>Address list</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 20,
            }}>
            <MaterialIcons name="settings" size={30} color={'#3498DB'} />
            <Text style={{fontSize: 20, color: '#000'}}>Setting</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 20,
            }}
            onPress={() => setCfmLogout(true)}>
            <MaterialIcons name="logout" size={30} color={'red'} />
            <Text style={{fontSize: 20, color: 'red'}}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={cfmLogout} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.Modal}>
            <Text style={{fontSize: 20, color: '#fff', marginBottom: 30}}>
              Are you sure you want to log out?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={() => setCfmLogout(false)}>
                <Text style={{fontSize: 18, color: '#000'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={LogoutUser}>
                <Text style={{fontSize: 18, color: '#000'}}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    </SafeAreaView>

    // <View>
    //   <Text style={{fontSize: 30}}>Profile</Text>
    // </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headerContianer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SecondContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20,
    // backgroundColor:'yellow',
    width: '100%',
  },
  name: {
    fontSize: 26,
    fontWeight: '600',
    color: '#000',
  },
  member: {
    // paddingLeft: 10,
    fontSize: 16,
    color: '#000',
    // flex:1,
    flexWrap:'wrap'
  },
  thirdContiner: {
    paddingHorizontal: 20,
    gap: 15,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  Modal: {
    width: '85%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    borderRadius: 10,
  },
  Loader: {
    width: width * 0.15,
    height: width * 0.15,
  },
});
