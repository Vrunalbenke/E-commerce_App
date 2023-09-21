import {StyleSheet} from 'react-native';
import color from '../../Constants/colors'
import font from '../../Constants/fonts'

export const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: color.offWhite,
    },
    signupContainer: {
      flex: 1,
      paddingHorizontal: 10,
      paddingBottom:180,
    },
    MidArea: {
      height: '10%',

    },
    greeting: {
      fontFamily: font.RobotoC,
      fontWeight: '500',
      fontSize: 24,
      // letterSpacing: 1,
    },
    SignActionText: {
      fontSize: 16,
      color: color.offBlack,
    },
    bottomArea:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        gap:12,
        paddingBottom:20,
        // backgroundColor:'lightblue'
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
        // color:'#898686'
        color:color.offBlack,
    },
    

    SignupBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginTop: 20,
      // marginBottom:40,
    },
  });