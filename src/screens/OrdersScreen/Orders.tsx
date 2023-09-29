import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {OrdersNavigationProp} from '../../navigation/type';
import CustomHeader from '../../components/CustomHeader';
import font from '../../Constants/fonts';
import CustomDeliveryAddress from '../../components/CustomDeliveryAddress';

const Orders = ({navigation}: OrdersNavigationProp) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#d4d1d1'}}>
      <View style={styles.headerConatianer}>
        <View style={styles.headerFirstContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="arrow-back-outline" size={29} />
          </TouchableOpacity>
          <CustomHeader
            style={{
              fontSize: 25,
              fontFamily: font.BebasNB,
            }}
            headerContainerStyle={{
              // height: '25%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            headerTitle="Checkout(1/3)"
          />
          <View style={{width: 20}}></View>
        </View>
        <View style={styles.headerSecondContainer}>
            <View style={styles.ButtonContainer}>
                <View style={styles.ButtonInnerContainer}>
                  <MaterialIcons name='radio-button-checked' size={25}/>
                  <Text>- - - - - - - - -</Text>
                </View>
                <View style={styles.ButtonInnerContainer}>
                  <MaterialIcons name='radio-button-checked' size={25}/>
                  <Text>- - - - - - - - -</Text>
                </View>
                <View style={styles.ButtonInnerContainer}>
                  <MaterialIcons name='radio-button-checked' size={25}/>
                </View>
            </View>
            <View style={styles.firstButtonInnerContainer}>
            <Text>Delivery Address</Text>
            <Text style={{paddingRight:15}}>Payment</Text>
            <Text>Order Placed</Text>
            </View>
        </View>
      </View>

      <View style={styles.MainContainer}>
        <CustomDeliveryAddress/>
      </View>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  headerConatianer: {
    // backgroundColor:'#d4d1d1',
    padding: 5,
    // margin: 0,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'flex-start',
  },
  headerFirstContainer: {
    paddingTop:5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:'100%',
    paddingBottom:10
  },
  headerSecondContainer:{
    // flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  ButtonContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  ButtonInnerContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:7
  },
  firstButtonInnerContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-end',
    gap:30
  },
  MainContainer:{
    flex:1,
    backgroundColor:'#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding:10
  }
});
