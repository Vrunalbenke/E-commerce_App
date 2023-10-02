import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const CustomPlacedOrder = () => {
  const [animation, setAnimation] = useState(true);
  const navigation = useNavigation();
  setTimeout(() => {
    setAnimation(false);
  }, 7000);
  return (
    <View style={{flex: 1, width: '100%'}}>
      {animation ? (
        <View style={styles.LottieStyle}>
          <LottieView
            style={styles.Completed}
            source={require('../assets/Lottie-JSON/OrderedSuccess.json')}
            autoPlay
            loop={false}
          />
        </View>
      ) : (
        <View style={styles.firstContainer}>
          <Image
            source={require('../assets/images/OrderImage.jpg')}
            style={styles.OrderImage}
          />
          <Text style={styles.headerText}>Order Placed Successfully</Text>
          <Text style={styles.subtitleText}>
            Congratulation! Your order has been placed.
          </Text>
          <Text style={styles.subtitleText}>
            You can track your order number
          </Text>
          <View style={styles.BtnContainer}>
            <TouchableOpacity style={styles.TOPContainer} onPress={()=> navigation.navigate('Home') }>
              <Text style={{color:'#ffffff',fontSize:18}}>Continue Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.TOPContainer}>
              <Text style={{color:'#ffffff',fontSize:18}}>Track Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CustomPlacedOrder;

const styles = StyleSheet.create({
  LottieStyle: {
    position: 'absolute',
    flex: 1,
    // backgroundColor:'pink',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  Completed: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  firstContainer: {
    padding: 10,
    flex:1
  },
  headerText: {
    fontSize: 23,
    fontWeight: '700',
    color: '#325f88',
  },
  subtitleText: {
    fontSize: 16,
  },
  OrderImage: {
    width: 300,
    height: 300,
  },
  BtnContainer: {
    position:'absolute',
    bottom:20,
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%'
  },
  TOPContainer: {
    padding:10,
    backgroundColor:'#1A3851',
    borderRadius:5
  },
});
