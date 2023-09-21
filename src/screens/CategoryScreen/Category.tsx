import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import font from '../../Constants/fonts';
import color from '../../Constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CategoryNavigatonProp} from '../../navigation/type';
import CustomFlatList from '../../components/CustomFlatList';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {
  EmptyProductData,
  getProduct,
  getProductDetail,
} from '../../redux/Slice/productSlice';
import Lottie from 'lottie-react-native';

const {width, height} = Dimensions.get('window');
const Category = ({route, navigation}: CategoryNavigatonProp) => {
  const {product_category_id} = route.params;
  let ProductData = useAppSelector(
    state => state.Product.ProductData);
    console.log('👓👓👓👓👓👓👓',ProductData)
  const dispatch = useAppDispatch();
  const [isLoading, setIsloading] = useState<boolean>(true);

  console.log('category id: ', product_category_id);
  const CategoryName =
    product_category_id === 1
      ? 'Table'
      : product_category_id === 2
      ? 'chair'
      : product_category_id === 3
      ? 'Sofa'
      : 'Bed';

  useEffect(() => {
    setIsloading(true);
    const apiData = async () => {
        const APIdata = await dispatch(
          getProduct(product_category_id),
        ).unwrap();
        setIsloading(false);
        return () => {
          ProductData = []
        };
    };
    apiData();

  }, [product_category_id]);

  async function ProductDetail(product_id: number) {
    const productDetailAPIData = await dispatch(
      getProductDetail(product_id),
    ).unwrap();
    navigation.navigate('ProductDetail', {
      ProductDetailData: productDetailAPIData.data,
    });
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.headerConatiner}>
        <TouchableOpacity
          style={styles.IconContainer}
          onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={30} />
        </TouchableOpacity>
        <CustomHeader
          style={{
            fontSize: 30,
            fontFamily: font.RobotoCLI,
          }}
          headerContainerStyle={{
            justifyContent: 'center',
            // alignItems: 'center',
            alignSelf: 'center',
          }}
          headerTitle={CategoryName}
        />
        <Ionicons name="search-outline" size={30} />
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isLoading && (
          <Lottie
            style={styles.Loader}
            source={require('../../assets/Lottie-JSON/furniture_loader.json')}
            autoPlay
            loop
          />
        )}
        {!isLoading && (
          <CustomFlatList data={ProductData || []} onPress={()=>ProductDetail} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.white,
    // backgroundColor: color.offWhite,
  },
  headerConatiner: {
    flexDirection: 'row',
    backgroundColor: color.offWhite,
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  Loader: {
    width: width * 0.9,
    height: width,
  },
  IconContainer: {
    padding: 10,
  },
});
