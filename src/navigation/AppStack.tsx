import React from 'react'
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import { AppStackpNavigatonProp, RootStackParamList } from './type';
import Home from '../screens/HomeScreen/Home';
import CustomDrawer from '../components/CustomDrawer'
import Cart from '../screens/CartScreen/Cart';
import Category from '../screens/CategoryScreen/Category';
import ProductDetail from '../screens/ProductDetailScreen/ProductDetail';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useAppDispatch, useAppSelector } from '../redux/store';
import { logout } from '../redux/Slice/registerSlice';

const RootDrawer= createDrawerNavigator<RootStackParamList>();
const color = '#000'

const AppStack = ({navigation}:AppStackpNavigatonProp) => {
  // const dispatch = useAppDispatch();
  // const data = useAppSelector(state => state.Auth.AuthData);
  
  // function LogoutUser() {
  //   console.log('Logged');
  //   // dispatch(logout(AuthData.length))
  //   dispatch(logout(undefined));
  //   console.log('Home data,AuthData is Popped:--😋#😋', data);
  //   navigation.navigate('Login')
  // }
  return (
    <RootDrawer.Navigator 
    initialRouteName='Home' 
    drawerContent={(props) => <CustomDrawer {...props}/>}  
    screenOptions={{headerShown:false,
      drawerActiveBackgroundColor:'#000',
      drawerActiveTintColor:'#fff',
      drawerInactiveTintColor:'#000000',
    drawerLabelStyle:{marginLeft:-25,fontSize:15},
    }}>
        <RootDrawer.Screen name='Home' component={Home} options={{
          drawerIcon:({color}) =>(
            <Ionicons name='home-outline' size={22} color={color} />
          )
        }}/>
        <RootDrawer.Screen name='Cart' component={Cart} options={{
          drawerIcon:({color}) =>(
            <Ionicons name='cart-outline' size={22} color={color} />
          )
        }}/>
        <RootDrawer.Screen name='Category' component={Category} options={{
          drawerIcon:({color}) =>(
            <Ionicons name='grid-outline' size={22} color={color} />
          )
        }}/>
        <RootDrawer.Screen name='ProductDetail' component={ProductDetail} options={{
          drawerIcon:({color}) =>(
            <Ionicons name='home' size={22} color={color} />
          )
        }}/>
    </RootDrawer.Navigator>
  )
}

export default AppStack