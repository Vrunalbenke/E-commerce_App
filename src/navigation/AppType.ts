import { DrawerScreenProps } from "@react-navigation/drawer";

type RootStackParamListApp = {

    Home:undefined
    Drawer:undefined
    Cart:undefined
    ProductList:undefined
    ProductDetail:undefined
}


export type HomeNavigatonProp = DrawerScreenProps<RootStackParamListApp,'Home'>;

export type CartNavigatonProp = DrawerScreenProps<RootStackParamListApp,'Cart'>;

export type ProductListNavigatonProp = DrawerScreenProps<RootStackParamListApp,'ProductList'>;

export type ProductDetailNavigatonProp = DrawerScreenProps<RootStackParamListApp,'ProductDetail'>;