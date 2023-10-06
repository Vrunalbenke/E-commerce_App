import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Carousel from 'react-native-reanimated-carousel';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {placeOrder} from '../redux/Slice/orderSlice';

type CustomPaymentProps = {
  stage: (index: number) => void;
};

const CustomPayment = ({stage}: CustomPaymentProps) => {
  const CartData = useAppSelector(state => state.Cart.CartItem);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.Auth.AccessToken);
  const cartItemsTotal = useAppSelector(state => state.Cart.CartItem.total);
  // console.log(accessToken)
  const Address = useAppSelector(state => state.Address.selectAddress);
  const OrderAddress = `${Address.streetAddress},${Address.city}-${Address.postalCode},${Address.state}-${Address.country}`;
  // console.log(OrderAddress)
  function commafy(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }

  let totalPrice = commafy(CartData.total);
  // console.log(CartData.total)
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState();
  const UPI = [
    require('../assets/images/PaymentCarousel/UPI.png'),
    require('../assets/images/PaymentCarousel/Phonepe.png'),
    require('../assets/images/PaymentCarousel/Gpay.png'),
    require('../assets/images/PaymentCarousel/Paytm.png'),
  ];
  const Wallets = [
    require('../assets/images/PaymentCarousel/Phonepe.png'),
    require('../assets/images/PaymentCarousel/Gpay.png'),
    require('../assets/images/PaymentCarousel/Paytm.png'),
  ];
  const radioData = [
    {
      label: 'UPI',
      value: 'UPI',
      index: 0,
      data: {UPI},
      text: 'Pay by any UPI app',
    },
    {
      label: 'Wallet/Postpaid',
      value: 'Wallet/Postpaid',
      index: 1,
      data: {Wallets},
      text: '',
    },
    {
      label: 'Credit/Debit/ATM Card',
      value: 'Credit/Debit/ATM Card',
      index: 2,
      text: 'Add and secure your card as per RBI guidelines',
    },
    {
      label: 'Net Banking',
      value: 'Net Banking',
      index: 3,
      text: 'This instrument has low success, use UPI or cards for better experience',
    },
    {
      label: 'Cash on Delivery',
      value: 'Cash on Delivery',
      index: 4,
      text: 'Additional ₹100 charges for COD services',
    },
  ];

  async function handlePlacedOrder() {
    try {
      const OrderData = await dispatch(
        placeOrder({OrderAddress, accessToken}),
      ).unwrap();
      // console.log('success!',OrderData)
      stage(3);
    } catch (error) {
      console.log('LOOOOOOOOGGGGGG', error);
    }
  }
  return (
    <View style={{flex: 1}}>
      <View style={styles.firstContainer}>
        <Text style={styles.headerText}>Select a payment method</Text>
      </View>
      <View style={styles.secondContainer}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <RadioForm animation={true}>
            {radioData.map((obj, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <RadioButton
                  labelHorizontal={true}
                  key={i}
                  style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row'}}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      borderWidth={2}
                      isSelected={obj.index === isSelected}
                      buttonInnerColor={'#325f88'}
                      onPress={() => setIsSelected(obj.index)}
                      buttonOuterColor={
                        obj.index === isSelected ? '#325f88' : '#000'
                      }
                      buttonSize={15}
                      buttonOuterSize={25}
                      buttonStyle={{}}
                      // buttonWrapStyle={{marginLeft: 10}}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      // onPress={onPress}
                      labelStyle={{
                        fontSize: 22,
                        fontWeight: '600',
                        paddingTop: 1,
                        color: '#000000',
                      }}
                      labelWrapStyle={{}}
                    />
                  </View>
                  <Text style={{paddingLeft: 40}}>{obj.text}</Text>
                </RadioButton>
                {obj.index < 2 ? (
                  <Carousel
                    loop
                    width={40}
                    height={40}
                    autoPlay={true}
                    data={obj.index === 0 ? UPI : Wallets}
                    scrollAnimationDuration={300}
                    renderItem={({item, index}) => (
                      <View
                        style={{
                          flex: 1,
                          // backgroundColor:'pink',
                          justifyContent: 'center',
                        }}>
                        <Image
                          style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                          }}
                          source={item}
                        />
                      </View>
                    )}
                  />
                ) : (
                  <View></View>
                )}
              </View>
            ))}
          </RadioForm>
        </View>
      </View>
      <TouchableOpacity
        style={styles.NextBtn}
        disabled={isSelected === undefined}
        onPress={handlePlacedOrder}>
        <Text style={{fontSize: 25, color: '#fff'}}>Place Order</Text>
        <Text style={{fontSize: 25, color: '#fff', alignSelf: 'center'}}>
          ₹{commafy(cartItemsTotal)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomPayment;

const styles = StyleSheet.create({
  firstContainer: {
    padding: 10,
  },
  headerText: {
    fontSize: 23,
    fontWeight: '700',
    color: '#000',
  },
  secondContainer: {},
  NextBtn: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: '#1A3851',
    width: '95%',
    borderRadius: 5,
    // alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
});
