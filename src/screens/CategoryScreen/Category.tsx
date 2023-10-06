import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import font from '../../Constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CategoryNavigatonProp} from '../../navigation/type';
import CustomFlatList from '../../components/CustomFlatList';
import {useAppDispatch} from '../../redux/store';
import {getProductDetail} from '../../redux/Slice/productSlice';

const {width, height} = Dimensions.get('window');
const Category = ({route, navigation}: CategoryNavigatonProp) => {
  const {product_category_id} = route.params;
  const navRoute = route.params.backRoute;
  const dispatch = useAppDispatch();
  const CategoryName =
    product_category_id === 1
      ? 'Table'
      : product_category_id === 2
      ? 'chair'
      : product_category_id === 3
      ? 'Sofa'
      : 'Bed';
      
  async function ProductDetail(product_id: number,product_category_id:number) {
    try {
      const productDetailAPIData = await dispatch(
        getProductDetail(product_id),
      ).unwrap();
      navigation.navigate('ProductDetail',{
        backRoute:'Category',
        product_category_id:product_category_id
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.headerContianer}>
        <TouchableOpacity onPress={() => navigation.navigate('FullCategory')}>
          <Ionicons name="arrow-back-outline" size={29} color={'#fff'} />
        </TouchableOpacity>
        <CustomHeader
          style={{
            // paddingTop: 6,
            fontSize: 30,
            fontFamily: font.BebasNB,
            color: '#fff',
          }}
          headerContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 10,
          }}
          headerTitle={CategoryName}
        />
        <View></View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 10,
        }}>
        <CustomFlatList
          product_category_id={product_category_id}
          onPress={ProductDetail}
        />
      </View>
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#325f88',
    // backgroundColor: color.offWhite,
  },
  headerContianer: {
    // backgroundColor:'#d4d1d1',
    padding: 10,
    // margin: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  IconContainer: {
    padding: 10,
  },
});
