import {ImageBackground, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { logout } from '../redux/Slice/registerSlice';
import { CustomDrawerNavigationProp } from '../navigation/type';
import color from '../../src/Constants/colors'
import font from '../../src/Constants/fonts'


const CustomDrawer = (props: React.ComponentProps<typeof DrawerItemList>,{navigation}:CustomDrawerNavigationProp) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.Auth.AuthData);
  
  function LogoutUser() {
    console.log('Logged');
    // dispatch(logout(AuthData.length))
    dispatch(logout(undefined));
    console.log('Home data,AuthData is Popped:--😋#😋', data);
    props.navigation.navigate('Login')
  }

  return (
    <View style={{flex: 1,backgroundColor:color.offWhite ,}}>
      <DrawerContentScrollView
        {...props}
      >
        <ImageBackground
          source={require('../assets/images/DrawerBGImage.jpg')}
          resizeMode={'cover'}
          style={styles.BGImage}>
          <Image source={require('../assets/images/UserImage.jpg')} style={styles.UserImage}/>
          <Text style={{color: color.black}}>Vrunal Benke</Text>
        </ImageBackground>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={{padding: 15, borderTopWidth: 1, borderTopColor: color.offBlack}}>
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
        <TouchableOpacity onPress={LogoutUser} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
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
      </View>
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
  },
  UserImage:{
    width:80,
    height:80,
    borderRadius:40,
    alignSelf:'center'
  },
  BottomContainer:{
    padding:20,
    borderTopWidth:1,
    borderTopColor:color.black,
    flexDirection:'row',
    alignItems:'center'
  },
  BottomContainerText:{
    fontSize:15,
    fontFamily:font.RobotoCB,
    marginLeft:5
  }
});
