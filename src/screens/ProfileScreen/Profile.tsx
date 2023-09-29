import {
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Tooltip} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {ProfileNavigationProp} from '../../navigation/type';

const Profile = ({navigation}: ProfileNavigationProp) => {
  const UserData = useAppSelector(state => state.User.user.data);
  const address = useAppSelector(state => state.Address.address)
  console.log(address[0],'23456765432')
  console.log(UserData, '##############');
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#d4d1d1'}}>
      <View style={styles.headerConatianer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={29} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Ionicons name="create-outline" size={29} />
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
            <View style={{alignItems:'center',borderTopRightRadius:10,backgroundColor:'#000000'}}>
                <Text style={{padding:4,color:'#ffffff',fontSize:18}}>Neoplus member</Text>
                </View>
            </View>
            
        <View style={styles.SecondContainer}>
          <View>
          <Image
            source={require('../../assets/images/UserImage.jpg')}
            style={{width: 120, height: 120, borderRadius: 60}}
          />
          {/* <TouchableOpacity onPress={()=>console.log('I was clicked')}>
          <MaterialIcons name='edit' size={25} style={styles.editIcon}/>
          </TouchableOpacity> */}
          </View>
          
          <View>
            <Text style={styles.name}>
              {UserData?.user_data.first_name} {UserData?.user_data.last_name}
            </Text>
            <Text style={[styles.member,{width:210}]}>{address[0]?.streetAddress},</Text>
            <Text style={styles.member}>{address[0]?.city}-{address[0]?.postalCode},</Text>
            <Text style={styles.member}>{address[0]?.state},{address[0]?.country}</Text>
          </View>
        </View>
        <View style={styles.thirdContiner}>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Ionicons name="call-outline" size={25} />
            <Text style={{fontSize: 18}}>{UserData?.user_data.phone_no}</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Ionicons name="mail-outline" size={25} />
            <Text style={{fontSize: 18}}>{UserData?.user_data.email}</Text>
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
              <Text style={{fontSize: 20}}>0</Text>
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
              <Text style={{fontSize: 18, color: '#302f2f'}}>NeoCoins</Text>
              <Tooltip
                visible={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                // ModalComponent={Modal}
                backgroundColor={'#000000'}
                width={300}
                height={60}
                containerStyle={{padding: 5}}
                popover={
                  <>
                    <Text style={{color: '#ffffff'}}>
                      "Get NeoCoins: Earn 10% of your order's{' '}
                    </Text>
                    <Text style={{color: '#ffffff'}}>
                      worth in NeoCoins, which you can use on{' '}
                    </Text>
                    <Text style={{color: '#ffffff'}}>your next purchase!"</Text>
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
              <Text style={{fontSize: 20}}>{UserData?.total_orders}</Text>
            </View>
            <View style={{marginTop: 5}}>
              <Text style={{fontSize: 18, color: '#302f2f'}}>Orders</Text>
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
            <MaterialIcons name="key" size={30} />
            <Text style={{fontSize: 20}}>Change Password</Text>
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
            <MaterialIcons name="location-on" size={30} />
            <Text style={{fontSize: 20}}>Address list</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 20,
            }}>
            <MaterialIcons name="settings" size={30} />
            <Text style={{fontSize: 20}}>Setting</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 20,
            }}>
            <MaterialIcons name="logout" size={30} color={'red'} />
            <Text style={{fontSize: 20, color: 'red'}}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headerConatianer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SecondContainer: {
    padding: 20,
    // height:'100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20,
  },
  name: {
    fontSize: 26,
  },
  member: {
    paddingLeft: 10,
    // width:200,
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
   }
   
});
