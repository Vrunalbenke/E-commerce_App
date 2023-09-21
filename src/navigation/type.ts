import { DrawerItemList, DrawerScreenProps } from "@react-navigation/drawer";
import {NativeStackScreenProps} from "@react-navigation/native-stack";



export type RootStackParamList = {
    OnBoarding : undefined
    Login : undefined
    Signup : undefined
    Home:undefined
    ForgotPassword:undefined
    Drawer:undefined
    Cart:undefined
    Category:{product_category_id : number}
    ProductDetail:{ProductDetailData: {}}
    AppStack :undefined
    CustomDrawer:{props:React.ComponentProps<typeof DrawerItemList>}
}

export type OnBoardingNavigatonProp = NativeStackScreenProps<RootStackParamList,'OnBoarding'>;

export type LoginNavigatonProp = NativeStackScreenProps<RootStackParamList,'Login'>;

export type SignupNavigatonProp = NativeStackScreenProps<RootStackParamList,'Signup'>;

export type AppStackpNavigatonProp = NativeStackScreenProps<RootStackParamList,'AppStack'>;

export type HomeNavigatonProp = DrawerScreenProps<RootStackParamList,'Home'>;

export type CartNavigatonProp = DrawerScreenProps<RootStackParamList,'Cart'>;

export type CategoryNavigatonProp = DrawerScreenProps<RootStackParamList,'Category'>;

export type ProductDetailNavigatonProp = DrawerScreenProps<RootStackParamList,'ProductDetail'>;

export type ForgotPasswordNavigationProp = NativeStackScreenProps<RootStackParamList,'ForgotPassword'>;

export type CustomDrawerNavigationProp = NativeStackScreenProps<RootStackParamList,'CustomDrawer'>;



// export 