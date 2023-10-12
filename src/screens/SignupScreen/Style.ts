import {StyleSheet} from 'react-native';
import color from '../../Constants/colors';
import font from '../../Constants/fonts';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#325f88',
  },
  parentContainer: {
    flex: 1,
    // height:'100%',
    backgroundColor: '#325f88',
  },
  headerConatianer: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  IconContainer: {
    padding: 10,
  },
  headerRightConatianer: {
    flexDirection: 'row',
  },
  MainContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  MidArea: {
    height: '10%',
  },
  greeting: {
    fontFamily: font.RobotoC,
    fontWeight: '600',
    fontSize: 24,
    // letterSpacing: 1,
    color: '#000',
  },
  SignActionText: {
    fontSize: 16,
    color: color.offBlack,
  },
  bottomArea: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 12,
    paddingBottom: 20,
    // backgroundColor:'lightblue'
  },

  TCContainer: {
    flexDirection: 'row',
    flexShrink: 1,
  },
  TCText: {
    // flex:1,
    flexShrink: 1,
    // flexWrap:'wrap',
    fontSize: 15,
    // color:'#898686'
    color: color.offBlack,
  },

  SignupBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    // marginBottom:40,
  },
  BackIcon: {
    position: 'absolute',
    top: 25,
    left: 10,
    // backgroundColor:'#fff',
    // padding:10,
    // borderRadius:20
  },
});
