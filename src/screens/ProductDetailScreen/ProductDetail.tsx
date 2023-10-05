import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {AddToCart} from '../../redux/Slice/cartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import font from '../../Constants/fonts';
import color from '../../Constants/colors';
import CustomSimilarProducts from '../../components/CustomSimilarProducts';
import { getProductDetail } from '../../redux/Slice/productSlice';
import { ProductDetailNavigatonProp } from '../../navigation/type';
const windowWidth = Dimensions.get('window').width;

const ProductDetail = ({route,navigation}:ProductDetailNavigatonProp) => {
  const dispatch = useAppDispatch();
  const ProductDetail = useAppSelector(
    state => state.Product.ProductDetailData,
  );
  const accessToken = useAppSelector(state => state.Auth.AccessToken);

  async function AppendToCart(product_id) {
    const formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('quantity', 1);

    try {
      await dispatch(AddToCart({formData, accessToken})).unwrap();
    } catch (err) {
      console.error(err);
    }
  }

  async function onPressProductDetail(product_id: number) {
    try {
      const productDetailAPIData = await dispatch(
        getProductDetail(product_id),
      ).unwrap();
      navigation.navigate('ProductDetail',{
        product_category_id:route.params.product_category_id,
        backRoute:route.params.backRoute,
      });
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

  function commafy( num ) {
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#325f88'}}>
      <View style={styles.headerContianer}>
        <TouchableOpacity onPress={() => navigation.navigate(route.params.backRoute,{
          product_category_id:route.params.product_category_id
        })}>
          <Ionicons name="arrow-back-outline" size={29} color={'#fff'} />
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
          headerTitle={ProductDetail.name}
        />
        <View></View>
      </View>
      <ScrollView
      showsVerticalScrollIndicator ={false}
        style={{
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 30,
          backgroundColor: '#fff',
        }}>
        <ScrollView
          horizontal
          pagingEnabled={true}
          bounces={false}
          style={styles.imageScrollView}>
          {ProductDetail.product_images.map((element, index) => (
            <Image
              key={index}
              source={{uri: element.image}}
              style={styles.productImage}
            />
          ))}
        </ScrollView>
        <View style={{backgroundColor: color.offWhite, padding: 10}}>
          <Text style={{alignItems: 'center'}}>
            {StarRating(ProductDetail.rating)}
          </Text>
          <Text style={styles.productDescription}>
            <Text style={{fontSize: 18, fontWeight: '500'}}>Description: </Text>
            {ProductDetail.description}
          </Text>
          <Text style={styles.productCost}>Price: ₹{commafy(ProductDetail.cost)}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() =>
                AppendToCart(ProductDetail.product_images[0].product_id)
              }
              style={styles.button}>
              <Text style={styles.buttonText}>Add to cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                {AppendToCart(ProductDetail.product_images[0].product_id)
                navigation.navigate('Cart')
              }
              }
              style={styles.button}>
              <Text style={styles.buttonText}>Buy now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomSimilarProducts product_id={ProductDetail.id} onPressProductDetail={onPressProductDetail} />
      </ScrollView>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContianer: {
    // backgroundColor:'#d4d1d1',
    // padding: 10,
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
  },
  productContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  imageScrollView: {
    height: 200,
    marginTop: 10,
  },
  productImage: {
    height: 200,
    width: windowWidth * 0.9,
    marginHorizontal: 10,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  productCost: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  productRating: {
    fontSize: 18,
    marginTop: 10,
  },
  productId: {
    fontSize: 16,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#1A3851',
    padding: 10,
    width:150,
    borderRadius: 5,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  similarProductsContainer: {
    padding: 20,
    backgroundColor: '#f2f2f2', // Background color for the container
  },
  similarProductsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ProductDetail;
