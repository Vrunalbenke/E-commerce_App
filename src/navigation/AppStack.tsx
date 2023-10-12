import React from 'react';
import {DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer';
import {AppStackpNavigatonProp, RootStackParamList} from './type';
import Home from '../screens/HomeScreen/Home';
import CustomDrawer from '../components/CustomDrawer';
import Cart from '../screens/CartScreen/Cart';
import Category from '../screens/CategoryScreen/Category';
import ProductDetail from '../screens/ProductDetailScreen/ProductDetail';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Orders from '../screens/OrdersScreen/Orders';
import AddressList from '../screens/AddressScreen/AddressList';
import NewAddress from '../screens/AddressScreen/NewAddress';
import Profile from '../screens/ProfileScreen/Profile';
import EditProfile from '../screens/ProfileScreen/EditProfile';
import ChangePassword from '../screens/ForgotPasswordScreen/ChangePassword';
import OrdersList from '../screens/OrdersScreen/OrdersList';
import OrdersDetail from '../screens/OrdersScreen/OrdersDetail';
import FullCategory from '../screens/CategoryScreen/FullCategory';
import Blank from '../screens/Blank';

const RootDrawer = createDrawerNavigator<RootStackParamList>();
const color = '#000';

const AppStack = ({navigation}: AppStackpNavigatonProp) => {
  return (
    <RootDrawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#000',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#000000',
        drawerLabelStyle: {marginLeft: -25, fontSize: 15},
        // overlayColor:'transparent'
      }}>

      <RootDrawer.Screen name="Home" component={Home} />
      <RootDrawer.Screen name="Cart" component={Cart} />

      <RootDrawer.Screen name="Category" component={Category} />

      <RootDrawer.Screen name="FullCategory" component={FullCategory} />

      <RootDrawer.Screen name="ProductDetail" component={ProductDetail} />
      <RootDrawer.Screen name="Orders" component={Orders} />

      <RootDrawer.Screen name="OrdersList" component={OrdersList} />

      <RootDrawer.Screen name="OrdersDetail" component={OrdersDetail} />

      <RootDrawer.Screen name="Profile" component={Profile} />

      <RootDrawer.Screen name="EditProfile" component={EditProfile} />
      <RootDrawer.Screen name="AddressList" component={AddressList} />
      <RootDrawer.Screen name="NewAddress" component={NewAddress} />
      <RootDrawer.Screen name="ChangePassword" component={ChangePassword} />
    </RootDrawer.Navigator>
  );
};

export default AppStack;
