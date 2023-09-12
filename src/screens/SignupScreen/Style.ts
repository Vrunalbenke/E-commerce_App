import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#ececec',
    },
    signupContainer: {
      flex: 1,
      paddingHorizontal: 10,
      paddingBottom:160,
    },
    MidArea: {
      height: '15%',

    },
    greeting: {
      fontFamily: 'Roboto Condensed',
      fontWeight: '500',
      fontSize: 24,
      letterSpacing: 1,
    },
    loginActionText: {
      fontSize: 16,
      color: '#666464',
    },
    bottomArea:{
        // paddingHorizontal:10,
        // padding:10,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        gap:12,
        // backgroundColor:'lightblue'
    },
    CheckBox:{
    },
    TCContainer:{
        flexDirection:'row',
        flexShrink:1,
    },
    TCText:{
        // flex:1,
        flexShrink:1,
        // flexWrap:'wrap',
        fontSize:15,
        color:'#898686'
    },
    

    SignupBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginTop: 20,
      // marginBottom:40,
    },
  });