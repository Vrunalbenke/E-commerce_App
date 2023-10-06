import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {logout} from '../redux/Slice/registerSlice';
import {CustomDrawerNavigationProp} from '../navigation/type';
import color from '../../src/Constants/colors';
import font from '../../src/Constants/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {EmptyData} from '../redux/Slice/addressSlice';
import {DrawerActions} from '@react-navigation/native';

const CustomDrawer = (
  props: React.ComponentProps<typeof DrawerItemList>,
  {navigation}: CustomDrawerNavigationProp,
) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.Auth.AccessToken);
  const UserData = useAppSelector(state => state.User.user.data);
  
  const [cfmLogout, setCfmLogout] = useState(false);
  const [icon, setIcon] = useState('chevron-down-outline');
  const [ddMenu, setDDMenu] = useState(false);
  const [pressed, setPressed] = useState({
    Home: true,
    Category: false,
    Profile: false,
    Orders: false,
    Cart: false,
  });

  const categoryName = [
    {name: 'Table', icon: 'table-bar', route: 1},
    {name: 'Chair', icon: 'chair-alt', route: 2},
    {name: 'Sofa', icon: 'chair', route: 3},
    {name: 'Bed', icon: 'king-bed', route: 4},
  ];

  function LogoutUser() {
    console.log('Logged out');
    // dispatch(logout(AuthData.length))
    dispatch(logout(undefined));
    dispatch(EmptyData([]));
    console.log('Home data,AuthData is Popped:--😋#😋', accessToken);
    props.navigation.closeDrawer();
    props.navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    });
  }

  function CategoryRoute(id: number) {
    // console.log(id);
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
    <View style={{flex: 1, backgroundColor: color.offWhite}}>
      {/* <DrawerContentScrollView {...props}> */}
      {/* <ImageBackground
          source={require('../assets/images/DrawerImagesBG1.jpg')}
          resizeMode={'cover'}
          style={styles.BGImage}>
            {UserData ?
            <Image
          source={{uri:UserData?.user_data.profile_pic}}
          style={styles.UserImage}
        />:
        <Image
        source={require('../assets/images/UserImage.jpg')}
        style={styles.UserImage}
        />
      } */}

      <View style={styles.BGImage}>
        {UserData ? (
          <Image
            source={{uri: UserData?.user_data.profile_pic}}
            style={styles.UserImage}
          />
        ) : (
          <Image
            source={require('../assets/images/UserImage.jpg')}
            style={styles.UserImage}
          />
        )}
        <Text style={{color: color.white, fontSize: 20}}>Vrunal Benke</Text>
      </View>
      <Text></Text>

      {/* </ImageBackground> */}

      {/* ************HOME*********** */}
      <View
        style={
          pressed.Home
            ? [
                styles.CategoryDDM,
                {backgroundColor: '#325f88', borderRadius: 10},
              ]
            : styles.CategoryDDM
        }>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Home');
            setPressed({
              Home: true,
              Category: false,
              Profile: false,
              Orders: false,
              Cart: false,
            });
          }}
          style={styles.DDMTOPicon}>
          <View style={styles.CategoryDDMLeftContainer}>
            <MaterialIcons
              name="home"
              size={30}
              style={pressed.Home ? {color: 'white'} : {color: '#325f88'}}
            />
            <Text
              style={
                pressed.Home
                  ? {color: 'white', fontSize: 18}
                  : {color: 'black', fontSize: 18}
              }>
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
            setPressed({
              Home: false,
              Category: true,
              Profile: false,
              Orders: false,
              Cart: false,
            });
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
        style={
          pressed.Profile
            ? [
                styles.CategoryDDM,
                {backgroundColor: '#325f88', borderRadius: 10},
              ]
            : styles.CategoryDDM
        }>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Profile');
            setPressed({
              Home: false,
              Category: false,
              Profile: true,
              Orders: false,
              Cart: false,
            });
          }}
          style={styles.DDMTOPicon}>
          <View style={styles.CategoryDDMLeftContainer}>
            <MaterialIcons
              name="person"
              size={30}
              style={pressed.Profile ? {color: 'white'} : {color: '#325f88'}}
            />

            <Text
              style={
                pressed.Profile
                  ? {color: 'white', fontSize: 18}
                  : {color: 'black', fontSize: 18}
              }>
              Profile
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ************CARTS*********** */}
      <View
        style={
          pressed.Cart
            ? [
                styles.CategoryDDM,
                {backgroundColor: '#325f88', borderRadius: 10},
              ]
            : styles.CategoryDDM
        }>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Cart');
            setPressed({
              Home: false,
              Category: false,
              Profile: false,
              Orders: false,
              Cart: true,
            });
          }}
          style={styles.DDMTOPicon}>
          <View style={styles.CategoryDDMLeftContainer}>
            <MaterialIcons
              name="shopping-cart"
              size={30}
              style={pressed.Cart ? {color: 'white'} : {color: '#325f88'}}
            />
            <Text
              style={
                pressed.Cart
                  ? {color: 'white', fontSize: 18}
                  : {color: 'black', fontSize: 18}
              }>
              Cart
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ************ORDERS*********** */}
      <View
        style={
          pressed.Orders
            ? [
                styles.CategoryDDM,
                {backgroundColor: '#325f88', borderRadius: 10},
              ]
            : [styles.CategoryDDM]
        }>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('OrdersList');
            setPressed({
              Home: false,
              Category: false,
              Profile: false,
              Orders: true,
              Cart: false,
            });
          }}
          style={styles.DDMTOPicon}>
          <View style={styles.CategoryDDMLeftContainer}>
            <MaterialIcons
              name="shopping-bag"
              size={30}
              style={pressed.Orders ? {color: 'white'} : {color: '#325f88'}}
            />
            <Text
              style={
                pressed.Orders
                  ? {color: 'white', fontSize: 18}
                  : {color: 'black', fontSize: 18}
              }>
              Orders
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.CategoryDDM}>
        <TouchableOpacity
          onPress={() => {
            // props.navigation.dispatch(DrawerActions.closeDrawer());
            setCfmLogout(true);
          }}>
          <View style={styles.CategoryDDMLeftContainer}>
            <MaterialIcons name="logout" size={30} color={'red'} />
            <Text
              style={{
                fontSize: 18,
                fontFamily: font.RobotoC,
                // marginLeft: 5,
                color: 'red',
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* </DrawerContentScrollView> */}
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
      {/* <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: color.offBlack,
        }}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: font.RobotoC,
                marginLeft: 5,
              }}>
              Refer a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={LogoutUser} style={{paddingVertical: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons name="logout" size={25} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: font.RobotoC,
                marginLeft: 5,
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  BGImage: {
    padding: 20,
    // width:'120%',
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#455e77',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 10,
  },
  UserImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // alignSelf: 'center',
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
    // borderRadius: 5,
  },
  DDMTOPicon: {
    paddingRight: 10,
    // borderRadius: 5,
  },
  modalContainer: {
    position: 'absolute',
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for modal
    justifyContent: 'center',
    alignItems: 'center',
    top: '40%',
    left: '15%',
    borderRadius: 10,
    width:330
  },
});
