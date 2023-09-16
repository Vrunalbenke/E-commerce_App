import {NativeStackScreenProps} from "@react-navigation/native-stack";



export type RootStackParamList = {
    OnBoarding : undefined
    Login : undefined
    Signup : undefined
    Home:undefined
}

export type OnBoardingNavigatonProp = NativeStackScreenProps<RootStackParamList,'OnBoarding'>;

export type LoginNavigatonProp = NativeStackScreenProps<RootStackParamList,'Login'>;

export type SignupNavigatonProp = NativeStackScreenProps<RootStackParamList,'Signup'>;

export type HomeNavigatonProp = NativeStackScreenProps<RootStackParamList,'Home'>;