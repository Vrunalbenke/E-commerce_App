import {DrawerItemList, DrawerScreenProps} from '@react-navigation/drawer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Signup: undefined;
  Home: undefined;
  Drawer: undefined;
  Cart: undefined;
  Category: {product_category_id: number};
  ProductDetail: undefined;
  AppStack: undefined;
  CustomDrawer: {props: React.ComponentProps<typeof DrawerItemList>};
  Orders: undefined;
  OrdersList: undefined;
  OrdersDetail: {orderID:number,orderDate:string};
  AddressList: undefined;
  NewAddress: undefined;
  Profile: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
};

export type OnBoardingNavigatonProp = NativeStackScreenProps<
  RootStackParamList,
  'OnBoarding'
>;

export type LoginNavigatonProp = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

export type SignupNavigatonProp = NativeStackScreenProps<
  RootStackParamList,
  'Signup'
>;

export type AppStackpNavigatonProp = NativeStackScreenProps<
  RootStackParamList,
  'AppStack'
>;

export type HomeNavigatonProp = DrawerScreenProps<RootStackParamList, 'Home'>;

export type CartNavigatonProp = DrawerScreenProps<RootStackParamList, 'Cart'>;

export type CategoryNavigatonProp = DrawerScreenProps<
  RootStackParamList,
  'Category'
>;

export type ProductDetailNavigatonProp = DrawerScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

export type ForgotPasswordNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>;

export type ChangePasswordNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'ChangePassword'
>;

export type CustomDrawerNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'CustomDrawer'
>;

export type OrdersNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Orders'
>;

export type OrdersDetailNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'OrdersDetail'
>;

export type OrdersListNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'OrdersList'
>;

export type AddressListNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'AddressList'
>;

export type NewAddressNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'NewAddress'
>;

export type ProfileNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;

export type EditProfileNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'EditProfile'
>;
