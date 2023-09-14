import {StyleSheet} from 'react-native';




export const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#ececec',
    },
    loginContainer: {
      flex: 1,
      padding: 10,
    },
    MidArea: {
      height: '15%',
    },
    greeting: {
      fontFamily: 'Roboto Condensed',
      fontWeight: '500',
      fontSize: 24,
      // letterSpacing: 1,
    },
    loginActionText: {
      fontSize: 16,
      color: '#666464',
    },
    ForgetPassContainer:{
      alignSelf:'flex-end'
    },
    ForgetPass:{
      fontFamily:'Roboto Condensed',
      color:'#454444',
      fontSize:18
    },
    LoginBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginTop: 30,
    },
  });