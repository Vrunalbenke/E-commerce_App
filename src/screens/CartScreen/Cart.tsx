import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {
  deleteItem,
  editCartItem,
  getCartItem,
} from '../../redux/Slice/cartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../Constants/colors';
import font from '../../Constants/fonts';
import CustomHeader from '../../components/CustomHeader';
import {CartNavigatonProp} from '../../navigation/type';

interface productProps extends itemProps {
  cost: number;
  id: number;
  name: string;
  product_category: string;
  product_images: string;
  sub_total: number;
}

type itemProps = {
  id: number;
  product: productProps;
  quantity: number;
};

const {width,height} = Dimensions.get('screen')

const Cart = ({navigation}: CartNavigatonProp) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.Auth.AccessToken);
  const cartItems = useAppSelector(state => state.Cart.CartItem.data);
  const cartItemsTotal = useAppSelector(state => state.Cart.CartItem.total);
  const editStatus = useAppSelector(state => state.Cart.EditStatus);
  const deletedItem = useAppSelector(state => state.Cart.DeleteItem);

  useEffect(() => {
    getCartData();
    console.log('USEEFFECT CALLED');
  }, [editStatus, deletedItem]);

  async function getCartData() {
    try {
      await dispatch(getCartItem(accessToken));
    } catch (error) {
      console.log(error);
    }
  }

  const incrementQuantity = async (
    itemId: number,
    itemQuantity: number,
    accessToken: string,
  ) => {
    try {
      console.log('error');
      const IncrementedItem = await dispatch(
        editCartItem({
          product_id: itemId,
          quantity: ++itemQuantity,
          accessToken: accessToken,
          ToastMessage:
            itemQuantity > 8
              ? 'Max Quantity can only be 8'
              : `Woohoo! You've added one more to your cart!`,
        }),
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const decrementQuantity = async (
    itemId: number,
    itemQuantity: number,
    accessToken: string,
  ) => {
    console.log(
      ' product with item id: ',
      itemId,
      ' has ',
      itemQuantity,
      ' quantity in cart',
    );
    try {
      const decrementItem = await dispatch(
        editCartItem({
          product_id: itemId,
          quantity: --itemQuantity,
          accessToken: accessToken,
          ToastMessage:
            itemQuantity < 1
              ? 'To remove Item from cart Delete it'
              : 'Oops! One item less in your cart.',
        }),
      ).unwrap();
      console.log(decrementItem);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartItem = async (itemId: number, accessToken: string) => {
    try {
      const deleted = await dispatch(
        deleteItem({
          product_id: itemId,
          accessToken: accessToken,
        }),
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  function commafy(num: number) {
    var str = num?.toString().split('.');
    if (str[0].length >= 4) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 4) {
      str[1] = str[1].replace(/(\d{2})/g, '$1 ');
    }
    return str.join('.');
  }

  const CartFooter = () => {
    return (
      <View
        style={{
          width: width*0.95,
          backgroundColor: color.offWhite,
          padding: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width:'100%'
          }}>
          <Text
            style={{
              fontSize: 22,
              color: '#325f88',
              fontWeight: '600',
              width: '55%',
            }}>
            Products
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // gap: 10,
              // backgroundColor:'pink',
              width: '40%',
            }}>
            <Text style={{fontSize: 22, color: '#325f88', fontWeight: '600'}}>
              Qty
            </Text>
            <Text style={{fontSize: 22, color: '#325f88', fontWeight: '600'}}>
              Price
            </Text>
          </View>
        </View>
        {cartItems?.map((item: itemProps, index: number) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                paddingVertical: 10,
                width:'95%',
                // backgroundColor:'pink'
              }}>
                <View style={{flexDirection:'row', width: '62%',}}>
                  <Text style={{fontSize: 18,fontWeight:'500', color: '#000'}}>{index + 1}. </Text>
                  <Text style={{fontSize: 18,fontWeight:'500', color: '#000'}}>
                     {item?.product?.name}
                  </Text>
                </View>
              
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '35%',
                }}>
                <Text style={{fontSize: 18, color: '#000'}}>
                  {item.quantity}
                </Text>
                <Text style={{fontSize: 18, color: '#000'}}>
                  {commafy(item?.product?.cost * item?.quantity)}
                </Text>
              </View>
            </View>
          );
        })}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            borderTopColor: '#000',
            borderTopWidth: 1,
            // paddingHorizontal:10,
            // backgroundColor:'pink'
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#000',
              width: '60%',
            }}>
            Delivery
          </Text>
          <Text
            style={{
              color: 'darkgreen',
              fontSize: 18,
              fontWeight: '600',
              width: '15%',
              alignSelf: 'flex-end',
            }}>
            Free
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: '600', color: '#000'}}>
            Total
          </Text>
          <Text style={{color: 'darkgreen', fontSize: 18, fontWeight: '600'}}>
            ₹{commafy(cartItemsTotal)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerConatianer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
            // padding: 10,
          }}
          headerTitle="Cart"
        />
        <View></View>
      </View>
      {cartItems === null ? (
        <View
          style={{
            backgroundColor: '#fff',
            // height:'100%',width:'100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <Image
            source={require('../../assets/images/emptyCart.jpg')}
            style={{height: 300, width: 300}}
          />
          <TouchableOpacity
            style={{
              width: 140,
              padding: 10,
              backgroundColor: '#325f88',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate('Home')}>
            <Text style={{color: '#fff', fontSize: 20}}>Shop now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: '#fff',
            // height: '100%',
            // width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 10,
            width:width
          }}>
          <FlatList
          horizontal={false}
            data={cartItems}
            keyExtractor={item => item?.id?.toString()}
            ListHeaderComponent={() => {
              return <View style={{height: 20}}></View>;
            }}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={CartFooter}
            renderItem={({item}) => (
              <View style={styles.cartItemContainer}>
                <Image
                  source={{uri: item?.product?.product_images}}
                  style={styles.productImage}
                />
                <View style={styles.RightContainer}>
                  <View style={styles.itemDetails}>
                    <Text style={styles.productName}>
                      {item?.product?.name}
                    </Text>
                    <Text style={styles.productPrice}>
                      Price: ₹{commafy(item?.product?.cost)}
                    </Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        decrementQuantity(
                          item?.product?.id,
                          item?.quantity,
                          accessToken,
                        )
                      }>
                      <Ionicons
                        name="remove-circle-outline"
                        size={30}
                        color={'#325f88'}
                      />
                    </TouchableOpacity>
                    <Text style={styles.productQuantity}>{item?.quantity}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        incrementQuantity(
                          item?.product.id,
                          item?.quantity,
                          accessToken,
                        )
                      }>
                      <Ionicons
                        name="add-circle-outline"
                        size={30}
                        color={'#325f88'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => deleteCartItem(item?.product?.id, accessToken)}
                  style={styles.deleteButton}>
                  <Ionicons name="trash" size={27} color="#325f88" />
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.bottomBtn}>
            <Text
              style={{
                fontSize: 25,
                alignSelf: 'center',
                paddingLeft: 10,
                fontWeight: '700',
                color: '#325f88',
              }}>
              Checkout
            </Text>
            <TouchableOpacity
              style={styles.placeOrderBtn}
              onPress={() => navigation.navigate('Orders')}>
              <Text style={{fontSize: 20, alignSelf: 'center', color: '#fff'}}>
                {' '}
                ₹{commafy(cartItemsTotal)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: '#325f88',
  },
  headerConatianer: {
    // backgroundColor:'#d4d1d1',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  IconContainer: {
    padding: 10,
  },
  cartItemContainer: {
    width:'100%',
    backgroundColor: color.offWhite,
    borderRadius: 10,
    elevation: 4,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginVertical: 10,
    flexDirection: 'row',
    // padding: 10,
    height:width*0.35
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10, // Adjusted to position it in the bottom right corner
    zIndex: 1,
  },
  productImage: {
    width: width*0.38,
    height: '100%',
    // marginRight: 10,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  RightContainer: {
    padding:10
  },
  itemDetails: {
    flex: 1,
    paddingLeft: 10,
    // backgroundColor:'pink',
    width: 200,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    // padding: 10,
    // width:150
    color: '#000',
  },
  productPrice: {
    fontSize: 14,
    color: '#000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  productQuantity: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  bottomBtn: {
    // position:'absolute',
    // bottom:0,
    width: '100%',
    // backgroundColor:'red',
    // padding:20,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#c1d5e4',
  },
  placeOrderBtn: {
    backgroundColor: '#325f88',
    width: 120,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 5,
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
  },
});

export default Cart;
