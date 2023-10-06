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
  Category: {product_category_id: number,backRoute:string};
  ProductDetail: {backRoute:string,product_category_id:number};
  AppStack: undefined;
  CustomDrawer: {props: React.ComponentProps<typeof DrawerItemList>};
  Orders: undefined;
  OrdersList: undefined;
  OrdersDetail: {orderID:number,orderDate:string};
  AddressList: undefined;
  NewAddress: {
    place:string,
    streetAddress : string,
    city: string,
    postalCode : string,
    state : string,
    country : string,
    btnName:string,
    index:number
  };
  Profile: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  FullCategory: undefined;
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

export type FullCategoryNavigatonProp = DrawerScreenProps<
  RootStackParamList,
  'FullCategory'
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
