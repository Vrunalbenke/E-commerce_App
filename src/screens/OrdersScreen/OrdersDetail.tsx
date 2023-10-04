import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../Constants/colors';
import font from '../../Constants/fonts';
import {OrdersDetailNavigationProp} from '../../navigation/type';
import CustomHeader from '../../components/CustomHeader';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import CustomRating from '../../components/CustomRating';

const OrdersDetail = ({route, navigation}: OrdersDetailNavigationProp) => {


  const ProductDetailData = useAppSelector(state => state.Order.orderDetail);
  console.log(ProductDetailData,'**********')
  function commafy(num: number) {
    var str = num.toString().split('.');
    if (str[0].length >= 4) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 4) {
      str[1] = str[1].replace(/(\d{2})/g, '$1 ');
    }
    return str.join('.');
  }
  const [productRatings, setProductRatings] = useState({});

  function handleRatingChange(productName: string, rated: number) {
    setProductRatings((prevRatings) => ({
      ...prevRatings,
      [productName]: rated,
    }));
  }

  return (
    <SafeAreaView style={{flex: 1, height: '100%', backgroundColor: '#325f88'}}>
      <View style={styles.headerContianer}>
        <TouchableOpacity
          style={styles.IconContainer}
          onPress={() => navigation.navigate('OrdersList')}>
          <Ionicons name="arrow-back-sharp" size={30} color={'#fff'} />
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
          headerTitle={`Order ID: #${ProductDetailData.id}`}
        />
        <View style={styles.headerRightContianer}>
          {/* <TouchableOpacity
        style={styles.IconContainer}
        onPress={() => navigation.navigate('Cart')}>
        <Ionicons name="cart" size={30}color={'#fff'}/>
      </TouchableOpacity> */}
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingVertical: 30,
          backgroundColor: '#fff',
          paddingBottom:550,
          paddingHorizontal: 10,
          
        }}>
        <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:25,fontWeight:'700',paddingBottom:20,}}>Order on: <Text>{route.params.orderDate}</Text></Text>
        </View>
        <View style={{backgroundColor: color.offWhite, padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            <Text style={{fontSize: 22, color: '#325f88', fontWeight: '600'}}>
              Products
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 10,
              }}>
              <Text style={{fontSize: 22, color: '#325f88', fontWeight: '600'}}>
                Quantity
              </Text>
              <Text style={{fontSize: 22, color: '#325f88', fontWeight: '600'}}>
                Price
              </Text>
            </View>
          </View>

          {ProductDetailData.order_details.map((item, index) => {
            return (
              <View
              key={index}
                style={{
                  width: '100%',
                  backgroundColor: color.offWhite,
                  //   padding: 10,
                }}>
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                  }}>
                  <Text style={{fontSize: 20,width:250}}>
                    {index + 1}. {item.prod_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '30%',
                      gap: 10,
                    }}>
                    <Text style={{fontSize: 18}}>{item.quantity}</Text>
                    <Text style={{fontSize: 18}}>
                      {commafy(item.total * item.quantity)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            <Text style={{fontSize: 20}}>Total</Text>
            <Text style={{color: 'darkgreen', fontSize: 18}}>
              ₹{commafy(ProductDetailData.cost)}
            </Text>
          </View>
        </View>
        {ProductDetailData.order_details.map((item, index) => {
          return (
            <View key={index} style={{marginVertical: 10,flexDirection:'row',gap:10,backgroundColor:color.offWhite,borderRadius:10}}>
              <Image
                source={{uri: item.prod_image}}
                style={{width: 100, height: 100}}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.productName}>{item.prod_name}</Text>
                <Text style={styles.productPrice}>Price: ₹{commafy(item.total)}</Text>
                <View>
                  <Text>Rate this product:</Text>
                  <View style={{ flexDirection: 'row' }}>
                  <CustomRating 
                  setState={(rated) => handleRatingChange(item.prod_name, rated)}
                    ProductID={(item.product_id).toString()}
                    rating={productRatings[item.prod_name] || 0}/>
                    </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>      
    </SafeAreaView>
  );
};

export default OrdersDetail;

const styles = StyleSheet.create({
  headerContianer: {
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  IconContainer: {
    padding: 10,
  },
  headerRightContianer: {
    flexDirection: 'row',
    paddingRight: 30,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 25,
    fontWeight: 'bold',
    padding:10
  },
  productPrice: {
    fontSize: 20,
    color: '#4a4949',
  },
});
