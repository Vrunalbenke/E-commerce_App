import {
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Tooltip} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {ProfileNavigationProp} from '../../navigation/type';
import { logout } from '../../redux/Slice/registerSlice';
import { EmptyData } from '../../redux/Slice/addressSlice';
import font from '../../Constants/fonts'
import { CoinName, MemberShip } from '../../Constants/string';

const Profile = ({navigation}: ProfileNavigationProp) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.Auth.AccessToken);
  const UserData = useAppSelector(state => state.User.user.data);
  const totalOrders = useAppSelector(state => state.Order.orderList)
  console.log(totalOrders.data,'⛅️⛅️⛅️⛅️⛅️⛅️⛅️⛅️⛅️⛅️')
  const address = useAppSelector(state => state.Address.address)
  const [open, setOpen] = useState(false);
  const [cfmLogout, setCfmLogout] = useState(false);
  function CalNeoCoin(){
     const neocoins = totalOrders.data.reduce((acc,curr)=>{
        return acc = acc+curr.cost
    },0)
    console.log(neocoins,'💸💵💸💸💸')
    return Math.floor(neocoins*0.1)
  }

  function LogoutUser() {
    console.log('Logged out');
    // dispatch(logout(AuthData.length))
    dispatch(logout(undefined));
    dispatch(EmptyData([]))
    console.log('Home data,AuthData is Popped:--😋#😋', accessToken);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    })
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#325f88'}}>
      <View style={styles.headerContianer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={29} style={{color:'#ffffff'}}/>
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
          <Ionicons name="create-outline" size={29} style={{color:'#ffffff'}} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        //   paddingTop: 10,
          position:'relative'
        }}>
            <View style={{alignItems:'flex-end'}}>
            <View style={{alignItems:'center',borderTopRightRadius:10,backgroundColor:'#3498DB',borderBottomLeftRadius:10}}>
                <Text style={{padding:4,color:'#ffffff',fontSize:18}}>{MemberShip} member</Text>
                </View>
            </View>
            
        <View style={styles.SecondContainer}>
          <View>
            {UserData?.user_data.profile_pic ? (
              <Image
              // source={require('../../assets/images/UserImage.jpg')}
              source={{uri:UserData?.user_data.profile_pic}}
              style={{width: 120, height: 120, borderRadius: 60}}
            />
            ) : (
              <Image
              source={require('../../assets/images/UserImage.jpg')}
              style={{width: 120, height: 120, borderRadius: 60}}
              />
            )}
          
          {/* <TouchableOpacity onPress={()=>console.log('I was clicked')}>
          <MaterialIcons name='edit' size={25} style={styles.editIcon}/>
          </TouchableOpacity> */}
          </View>
          
          <View style={{
            // backgroundColor:'pink'
          }}>
            <Text style={styles.name}>
              {UserData?.user_data.first_name} {UserData?.user_data.last_name}
            </Text>
            {address.length > 0 && 
            <View>
              <Text style={[styles.member,{width:250}]}>{address[0]?.streetAddress},{address[0]?.city}-{address[0]?.postalCode},{address[0]?.state},{address[0]?.country}</Text>
              {/* <Text style={styles.member}></Text>
              <Text style={styles.member}></Text> */}
            </View>}
          </View>
        </View>
        <View style={styles.thirdContiner}>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Ionicons name="call-outline" size={25} color={'#3498db'} />
            <Text style={{fontSize: 18,color:'#000'}}>{UserData?.user_data.phone_no}</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Ionicons name="mail-outline" size={25} color={'#3498db'}/>
            <Text style={{fontSize: 18,color:'#000'}}>{UserData?.user_data.email}</Text>
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
              {/* <Text style={{fontSize: 20}}>{Math.floor(Math.random()*1000)}</Text> */}
              <Text style={{fontSize: 20,color:'#000'}}>{CalNeoCoin()}</Text>
            </View>
            <View
              style={{
                paddingLeft: 10,
                marginTop: 5,
                flexDirection: 'row',
                // backgroundColor: 'pink',
                alignItems: 'flex-end',
                gap: 2,
              }}>
              <Text style={{fontSize: 18, color: '#000000'}}>{CoinName}</Text>
              <Tooltip
                visible={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                // ModalComponent={Modal}
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
              <Text style={{fontSize: 20,color:'#000'}}>{totalOrders?.data.length}</Text>
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
            onPress={()=> navigation.navigate('ChangePassword')}
            >
            <MaterialIcons name="key" size={30} color={'#3498DB'}  />
            <Text style={{fontSize: 20,color:'#000'}}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 20,
            }}
            onPress={()=> navigation.navigate('AddressList')}
            >
            <MaterialIcons name="location-on" size={30} color={'#3498DB'} />
            <Text style={{fontSize: 20,color:'#000'}}>Address list</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 20,
            }}>
            <MaterialIcons name="settings" size={30} color={'#3498DB'}  />
            <Text style={{fontSize: 20,color:'#000'}}>Setting</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 20,
            }}
            onPress={()=> setCfmLogout(true)}
            >
            <MaterialIcons name="logout" size={30} color={'red'} />
            <Text style={{fontSize: 20, color: 'red'}}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
      {cfmLogout && (
        <View style={styles.modalContainer}>
          <View
            style={{
              backgroundColor: '#3498DB',
              padding: 20,
              borderRadius: 10,
              
            }}>
            <Text style={{fontSize: 20,color:"#fff",marginBottom:30}}>
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
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headerContianer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  SecondContainer: {
    padding: 10,
    // height:'100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20,
    // backgroundColor:'yellow'
  },
  name: {
    fontSize: 26,
    color:'#000'
  },
  member: {
    paddingLeft: 10,
    // width:200,
    fontSize:16,
    color:'#000'
  },
  thirdContiner: {
    paddingHorizontal: 20,
    // flexDirection:'row'
    gap: 15,
  },
  editIcon: {
    // backgroundColor: '#ccc',
    // color:'#d42e2e',
    position: 'absolute',
    right: 0,
    bottom: 0,
   },
   modalContainer: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for modal
    justifyContent: 'center',
    alignItems: 'center',
    top: '40%',
    left: '10%',
    borderRadius: 10,
  },
   
});
