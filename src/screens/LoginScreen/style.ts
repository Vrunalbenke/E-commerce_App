import {StyleSheet} from 'react-native';
import color from '../../Constants/colors'
import font from '../../Constants/fonts'



export const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: color.offWhite,
    },
    loginContainer: {
      flex: 1,
      padding: 10,
    },
    MidArea: {
      height: '15%',
    },
    greeting: {
      fontFamily: font.RobotoC,
      fontWeight: '600',
      fontSize: 24,
      // letterSpacing: 1,
      color:'#000'
    },
    loginActionText: {
      fontSize: 16,
      color: color.offBlack,
    },
    ForgetPassContainer:{
      alignSelf:'flex-end'
    },
    ForgetPass:{
      fontFamily:font.RobotoC,
      color:color.offBlack,
      fontSize:18
    },
    LoginBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginTop: 30,
    },
  });