import {
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../components/CustomHeader';
import font from '../../Constants/fonts';
import {FullCategoryNavigatonProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import color from '../../Constants/colors';
import {getFullProduct, getProduct, getProductDetail} from '../../redux/Slice/productSlice';
import Lottie from 'lottie-react-native';

const {width, height} = Dimensions.get('screen');
const FullCategory = ({navigation}: FullCategoryNavigatonProp) => {
  const fullProductList = useAppSelector(state => state.Product.FullProduct);
  const dispatch = useAppDispatch();
  const [isloading,setIsloading] = useState(false);

  useEffect(()=>{
    getFullProductList()
  },[])

  async function getFullProductList() {
    try {
      setIsloading(true)
      const val = await dispatch(getFullProduct()).unwrap();
      console.log('All Category called');
      setTimeout(()=>{
        setIsloading(false)
      },3000)
    } catch (error) {
      console.log(error);
      setIsloading(false)
    }
  }

  async function onPressProductDetail(
    product_id: number,
    product_category_id: number,
  ) {
    try {
      setIsloading(true)
      const productDetailAPIData = await dispatch(
        getProductDetail(product_id),
      ).unwrap();

      navigation.navigate('ProductDetail',{
        backRoute:'FullCategory',
        product_category_id:product_category_id
      });
      setIsloading(false)
    } catch (err) {
      console.log(err);
    }
  }

  function StarRating(rating) {
    const normalizedRating = Math.min(Math.max(rating, 0), 5);

    const stars = [];
    const maxStars = 5;

    for (let i = 1; i <= maxStars; i++) {
      if (i <= normalizedRating) {
        // Full star
        stars.push(
          <Ionicons
            key={i}
            name="star-sharp"
            size={20}
            style={{color: 'gold'}}
          />,
        );
      } else if (i - 0.5 <= normalizedRating) {
        // Half star
        stars.push(
          <Ionicons
            key={i}
            name="star-half-sharp"
            size={20}
            style={{color: 'gold'}}
          />,
        );
      } else {
        // Empty star
        stars.push(
          <Ionicons
            key={i}
            name="star-sharp"
            size={20}
            style={{color: 'gray'}}
          />,
        );
      }
    }

    return <View style={{flexDirection: 'row'}}>{stars}</View>;
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
          onPress={() => {
            navigation.navigate('Home');
          }}>
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
          headerTitle="Category"
        />
        <View style={styles.headerRightConatianer}>
          <TouchableOpacity
            style={styles.IconContainer}
            onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart" size={30} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
        <View style={styles.mainContainer}>
        {isloading ? (
        <Lottie
          style={styles.Loader}
          source={require('../../assets/Lottie-JSON/furniture_loader.json')}
          autoPlay
          loop
        />
      ) : (
      <ScrollView
        
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {/***********  TABLES  ***********/}
        <View style={{marginBottom:10}}>
          <View style={[styles.ProductHeaderContainer, {}]}>
            <Text style={styles.ProductCategoryTXT}>Tables</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Category', {
                  product_category_id: 1,
                  backRoute:'FullCategory'
                });
              }}>
              <Text style={styles.ViewAllTXT}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            // showsHorziontalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal>
            {fullProductList[0].map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginHorizontal: 10,
                    backgroundColor: color.offWhite,
                    width: 200,
                    alignSelf: 'center',
                    shadowColor: 'F5F5F5',
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    elevation:4
                  }}
                  onPress={() => onPressProductDetail(item.id, 1)}>
                  <View>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        backgroundColor: '#fff',
                      }}>
                      <Image
                        source={{uri: item.product_images}}
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: 'contain',
                          alignSelf: 'center',
                        }}
                      />
                      <View></View>
                    </View>

                    <View style={{padding: 10}}>
                      <Text style={{fontSize: 25, fontWeight: '700',color:'#000'}}>
                        {item.name}
                      </Text>
                      <Text style={{fontSize: 20,color:'#000'}}>₹{commafy(item.cost)}</Text>

                      {StarRating(item.rating)}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/***********  CHAIR  ***********/}
        <View style={{marginBottom:10}}>
          <View style={[styles.ProductHeaderContainer, {}]}>
            <Text style={styles.ProductCategoryTXT}>Chair</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Category', {
                  product_category_id: 2,
                  backRoute:'FullCategory'
                });
              }}>
              <Text style={styles.ViewAllTXT}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal>
            {fullProductList[1].map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginHorizontal: 10,
                    backgroundColor: color.offWhite,
                    width: 200,
                    alignSelf: 'center',
                    shadowColor: 'F5F5F5',
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    elevation:4
                  }}
                  onPress={() => onPressProductDetail(item.id, 2)}>
                  <View>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        backgroundColor: '#fff',
                      }}>
                      <Image
                        source={{uri: item.product_images}}
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: 'contain',
                          alignSelf: 'center',
                        }}
                      />
                      <View></View>
                    </View>

                    <View style={{padding: 10}}>
                      <Text style={{fontSize: 25, fontWeight: '700',color:'#000'}}>
                        {item.name}
                      </Text>
                      <Text style={{fontSize: 20,color:'#000'}}>₹{commafy(item.cost)}</Text>

                      {StarRating(item.rating)}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/***********  SOFA  ***********/}
        <View style={{marginBottom:10}}>
          <View style={[styles.ProductHeaderContainer, {}]}>
            <Text style={styles.ProductCategoryTXT}>Sofa</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Category', {
                  product_category_id: 3,
                  backRoute:'FullCategory'
                });
              }}>
              <Text style={styles.ViewAllTXT}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal>
            {fullProductList[2].map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginHorizontal: 10,
                    backgroundColor: color.offWhite,
                    width: 200,
                    alignSelf: 'center',
                    shadowColor: 'F5F5F5',
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    elevation:4
                  }}
                  onPress={() => onPressProductDetail(item.id, 3)}>
                  <View>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        backgroundColor: '#fff',
                      }}>
                      <Image
                        source={{uri: item.product_images}}
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: 'contain',
                          alignSelf: 'center',
                        }}
                      />
                      <View></View>
                    </View>

                    <View style={{padding: 10}}>
                      <Text style={{fontSize: 25, fontWeight: '700',color:'#000'}}>
                        {item.name}
                      </Text>
                      <Text style={{fontSize: 20,color:'#000'}}>₹{commafy(item.cost)}</Text>

                      {StarRating(item.rating)}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/***********  BED  ***********/}
        <View style={{marginBottom:10}}>
          <View style={[styles.ProductHeaderContainer, {}]}>
            <Text style={styles.ProductCategoryTXT}>Bed</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Category', {
                  product_category_id: 4,
                  backRoute:'FullCategory'
                });
              }}>
              <Text style={styles.ViewAllTXT}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal>
            {fullProductList[3].map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginHorizontal: 10,
                    backgroundColor: color.offWhite,
                    width: 200,
                    alignSelf: 'center',
                    shadowColor: 'F5F5F5',
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    elevation:4
                  }}
                  onPress={() => onPressProductDetail(item.id, 4)}>
                  <View>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        backgroundColor: '#fff',
                      }}>
                      <Image
                        source={{uri: item.product_images}}
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: 'contain',
                          alignSelf: 'center',
                        }}
                      />
                      <View></View>
                    </View>

                    <View style={{padding: 10}}>
                      <Text style={{fontSize: 25, fontWeight: '700',color:'#000'}}>
                        {item.name}
                      </Text>
                      <Text style={{fontSize: 20,color:'#000'}}>₹{commafy(item.cost)}</Text>

                      {StarRating(item.rating)}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

      </ScrollView>
      )}
      </View>
    </SafeAreaView>
  );
};

export default FullCategory;

const styles = StyleSheet.create({
  headerConatianer: {
    flexDirection: 'row',
    // backgroundColor: '#f4f4f4',
    // backgroundColor: '#d4d1d1',
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  IconContainer: {
    padding: 10,
  },
  headerRightConatianer: {
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    backgroundColor: '#fff',
    gap: 20,
  },
  ProductHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom:10,
    backgroundColor: '#f5f5f5',
  },
  ProductCategoryTXT: {
    fontSize: 25,
    fontWeight: '700',
    color:'#000'
  },
  ViewAllTXT: {
    fontSize: 20,
    fontWeight: '500',
    color: '#3498DB',
  },
  Loader: {
    width: width,
    height: width,
  },
});
