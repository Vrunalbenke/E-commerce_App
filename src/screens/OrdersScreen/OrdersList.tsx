import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../components/CustomHeader';
import font from '../../Constants/fonts';
import color from '../../Constants/colors';
import {OrdersListNavigationProp} from '../../navigation/type';
import {getOrderDetail} from '../../redux/Slice/orderSlice';

const OrdersList = ({navigation}: OrdersListNavigationProp) => {
  const orderList = useAppSelector(state => state.Order.orderList);
  console.log(orderList, '23452342345');

  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.Auth.AccessToken);

  async function ProductDetails(orderID: number) {
    try {
      await dispatch(getOrderDetail({orderID, accessToken})).unwrap();
      console.log('OrderDetails Suuuccccesss!!!!');
    } catch (error) {
      console.log(error);
    }
  }

  function commafy(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 4) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 4) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }

  return (
    <SafeAreaView style={{flex: 1, height: '100%', backgroundColor: '#325f88'}}>
      <View style={styles.headerConatianer}>
        <TouchableOpacity
          style={styles.IconContainer}
          onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back-outline" size={30} color={'#fff'} />
        </TouchableOpacity>
        <CustomHeader
          style={{
            paddingTop: 6,
            fontSize: 30,
            fontFamily: font.BebasNB,
            color: '#fff',
          }}
          headerContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 10,
          }}
          headerTitle="Orders"
        />
        <View style={styles.headerRightConatianer}>
          {/* <TouchableOpacity style={styles.IconContainer}>
            <Ionicons name="search" size={30} />
          </TouchableOpacity> */}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 10,
          backgroundColor: '#fff',
          paddingHorizontal: 10,
          // paddingVertical:10
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {orderList.data.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: color.offWhite,
                  marginVertical: 10,
                  // padding:10,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: 10,
                  borderRadius: 10,
                }}>
                <Image
                  source={require('../../assets/images/orderList.jpg')}
                  style={{
                    height: 100,
                    width: 100,
                    resizeMode: 'stretch',
                    backgroundColor: 'lightblue',
                  }}
                />
                <View>
                  <Text style={{fontSize: 25, fontWeight: '700',color:'#000'}}>
                    Order ID - #{item.id}
                  </Text>
                  <Text style={{fontSize: 18,color:'#000'}}>
                    Price: ₹{commafy(item.cost)}
                  </Text>
                </View>
                
                <TouchableOpacity
                  style={{alignSelf: 'flex-end',}}
                  onPress={() => {
                    ProductDetails(item.id);
                    navigation.navigate('OrdersDetail', {
                      orderID: item.id,
                      orderDate: item.created,
                    });
                  }}>
                  <Ionicons
                    name="chevron-forward-sharp"
                    size={30}
                    color={'#000'}
                    style={{paddingBottom: 10}}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrdersList;

const styles = StyleSheet.create({
  headerConatianer: {
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  IconContainer: {
    padding: 10,
  },
  headerRightConatianer: {
    flexDirection: 'row',
    paddingRight: 30,
  },
});
