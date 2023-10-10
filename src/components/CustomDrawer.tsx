import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {logout} from '../redux/Slice/registerSlice';
import color from '../../src/Constants/colors';
import font from '../../src/Constants/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {EmptyData} from '../redux/Slice/addressSlice';
import LottieView from 'lottie-react-native';
import { getOrderList } from '../redux/Slice/orderSlice';


// props: React.ComponentProps<typeof DrawerItemList>,
// {navigation}: CustomDrawerNavigationProp,

const {width,height} = Dimensions.get('screen')
const CustomDrawer = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.Auth.AccessToken);
  const UserData = useAppSelector(state => state.User.user.data);

  const [cfmLogout, setCfmLogout] = useState(false);
  const [isLoading,setIsloading] = useState(false)
  const [icon, setIcon] = useState('chevron-down-outline');
  const [ddMenu, setDDMenu] = useState(false);

  const categoryName = [
    {name: 'Table', icon: 'table-bar', route: 1},
    {name: 'Chair', icon: 'chair-alt', route: 2},
    {name: 'Sofa', icon: 'chair', route: 3},
    {name: 'Bed', icon: 'king-bed', route: 4},
  ];

  async function getOrderListAndDetail() {
    try {
      await dispatch(getOrderList({accessToken})).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  async function LogoutUser() {
    setCfmLogout(false)
    setIsloading(true)
    console.log('Logged out');
    dispatch(logout([]));
    dispatch(EmptyData([]));
    console.log('Home data,AuthData is Popped:--😋#😋', accessToken);
    props.navigation.closeDrawer();
    setTimeout(() => {
      setIsloading(false)
      props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
          },
        ],
      });
    }, 2000);
  }

  function CategoryRoute(id: number) {
    props.navigation.navigate('Category', {
      product_category_id: id,
      route: 'Home',
    });

    setDDMenu(!ddMenu);
    if (ddMenu === true) {
      setIcon('chevron-forward-outline');
    } else {
      setIcon('chevron-down-outline');
    }
  }

  function DropDownMenu() {
    setDDMenu(!ddMenu);
    if (ddMenu === true) {
      setIcon('chevron-forward-outline');
    } else {
      setIcon('chevron-down-outline');
    }
  }
  return (
    <View
      style={{flex: 1, backgroundColor: color.offWhite, position: 'relative'}}>

      <View style={styles.BGImage}>
        {UserData ? (
          <Image
            source={{uri: UserData?.user_data?.profile_pic}}
            style={styles.UserImage}
          />
        ) : (
          <Image
            source={require('../assets/images/UserImage.jpg')}
            style={styles.UserImage}
          />
        )}
        
        <View style={{
          // alignItems:'center'
        }}>
          <Text style={{color: color.white, fontSize: 22,fontWeight:'600'}}>{UserData?.user_data.first_name} {UserData?.user_data.last_name}</Text>
        <Text style={{color: color.white, fontSize: 16}}>{UserData?.user_data?.phone_no}</Text>
        <Text style={{color: color.white, fontSize: 16}}>{UserData?.user_data?.email}</Text>
        </View>
      </View>

      {/* ************HOME*********** */}
      <View
        style={styles.CategoryDDM}
        >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Home');
            
          }}
          style={styles.DDMTOPicon}>
          <View style={styles.CategoryDDMLeftContainer}>
            <MaterialIcons
              name="home"
              size={30}
              style={{color: '#325f88'}}
            />
            <Text
              
              style={{color:'#000',fontSize: 18}}
              >
              Home
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ************CATEGORY*********** */}
      <View style={styles.CategoryDDM}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('FullCategory');
            
          }}
          style={styles.DDMTOPicon}>
          <View style={styles.CategoryDDMLeftContainer}>
            <MaterialIcons name="category" size={30} color={'#325f88'} />
            <Text style={{fontSize: 18, color: '#000'}}>Category</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={DropDownMenu}
          style={[styles.DDMTOPicon, {width: 100, alignItems: 'flex-end'}]}>
          <Ionicons name={icon} size={25} color={'#325f88'} />
        </TouchableOpacity>
      </View>
      <View style={{marginLeft: 30}}>
        {ddMenu &&
          categoryName.map((element, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{flexDirection: 'row', gap: 10, padding: 10}}
                onPress={() => CategoryRoute(element.route)}>
                <MaterialIcons name={element.icon} size={28} color={'#000'} />
                <Text style={{fontSize: 18, color: '#000'}}>
                  {element.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>

      {/* ************PROFILE*********** */}
      <View
        style={styles.CategoryDDM}
        >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Profile');
          }}
          style={styles.DDMTOPicon}>
          <View style={styles.CategoryDDMLeftContainer}>
            <MaterialIcons
              name="person"
              size={30}
              style={{color: '#325f88'}}
            />

            <Text
              
              style={{
                color:'#000',
                fontSize:18
              }}
              >
              Profile
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ************CARTS*********** */}
      <View
        style={styles.CategoryDDM}
        >
        <TouchableOpacity
          onPress={() => {
            getOrderListAndDetail();
            props.navigation.navigate('Cart');
            
          }}
          style={styles.DDMTOPicon}>
          <View style={styles.CategoryDDMLeftContainer}>
            <MaterialIcons
              name="shopping-cart"
              size={30}
              style={{color: '#325f88'}}
            />
            <Text
              style={{color:'#000',fontSize:18}}
              >
              Cart
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ************ORDERS*********** */}
      <View
        style={styles.CategoryDDM}
        >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('OrdersList');
          }}
          style={styles.DDMTOPicon}>
          <View style={styles.CategoryDDMLeftContainer}>
            <MaterialIcons
              name="shopping-bag"
              size={30}
              style={{color: '#325f88'}}
            />
            <Text
              style={{color:'#000',fontSize:18}}
              >
              Orders
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.CategoryDDM}>
        <TouchableOpacity
          onPress={() => {
            setCfmLogout(true);
          }}>
          <View style={styles.CategoryDDMLeftContainer}>
            <MaterialIcons name="logout" size={30} color={'red'} />
            <Text
              style={{
                fontSize: 18,
                fontFamily: font.RobotoC,
                color: 'red',
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {cfmLogout && (
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
        
      )}
      <Modal visible={isLoading} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <LottieView
          style={styles.Loader}
          source={require('../assets/Lottie-JSON/logoutLoader.json')}
          autoPlay
          loop
          />
        </View>
      </Modal>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  BGImage: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal:20,
    width:'100%',
    height: 220,
    resizeMode: 'contain',
    backgroundColor: '#325f88',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 10,
  },
  UserImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  BottomContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: color.black,
    flexDirection: 'row',
    alignItems: 'center',
  },
  BottomContainerText: {
    fontSize: 15,
    fontFamily: font.RobotoCB,
    marginLeft: 5,
  },
  CategoryDDM: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 3,
    borderRadius: 5,
  },
  CategoryDDMLeftContainer: {
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  DDMTOPicon: {
    paddingRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:100
  },
  Modal:{
    width:"80%",
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    borderRadius: 10,
  },
  Loader:{
    width:width*0.15,
    height:width*0.15,
  }
});
