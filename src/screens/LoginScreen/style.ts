import {Dimensions, StyleSheet} from 'react-native';
import color from '../../Constants/colors';
import font from '../../Constants/fonts';

const {width,height} = Dimensions.get('screen')

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#325f88',
  },
  loginContainer: {
    flex: 1,
    // padding: 10,
  },
  MainContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    padding: 10,
    backgroundColor: '#fff',
  },
  MidArea: {
    height: '15%',
  },
  greeting: {
    fontFamily: font.RobotoC,
    fontWeight: '700',
    fontSize: 24,
    color: '#000',
  },
  loginActionText: {
    fontSize: 16,
    color: color.offBlack,
  },
  ForgetPassContainer: {
    alignSelf: 'flex-end',
  },
  ForgetPass: {
    fontFamily: font.RobotoC,
    color: color.offBlack,
    fontSize: 18,
  },
  LoginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:100
  },
  Loader:{
    width:width*0.15,
    height:width*0.15,
    // width:30,
    // height:30
  }
});
