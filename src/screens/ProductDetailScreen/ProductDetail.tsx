import React from 'react';
import { ScrollView, View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import CustomSimilarProducts from '../../components/CustomSimilarProducts';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { AddToCart } from '../../redux/Slice/cartSlice';

const windowWidth = Dimensions.get('window').width;

const ProductDetail = () => {
  const dispatch = useAppDispatch();
  const ProductDetail = useAppSelector((state) => state.Product.ProductDetailData);
  const accessToken = useAppSelector((state) => state.Auth.AuthData);

  async function AppendToCart(product_id) {
    const formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('quantity', 1);

    try {
      await dispatch(AddToCart({ formData, accessToken })).unwrap();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.productContainer}>
        <Text style={styles.productName}>{ProductDetail.name}</Text>
        <Text style={styles.productDescription}>{ProductDetail.description}</Text>
        <ScrollView horizontal pagingEnabled={true} bounces={false} style={styles.imageScrollView}>
          {ProductDetail.product_images.map((element, index) => (
            <Image key={index} source={{ uri: element.image }} style={styles.productImage} />
          ))}
        </ScrollView>
        <Text style={styles.productCost}>Price: ${ProductDetail.cost}</Text>
        <Text style={styles.productRating}>Rating: {ProductDetail.rating}</Text>
        <Text style={styles.productId}>ID: {ProductDetail.id}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => AppendToCart(ProductDetail.product_images[0].product_id)} style={styles.button}>
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('first')} style={styles.button}>
          <Text style={styles.buttonText}>Buy now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.similarProductsContainer}>
      <Text style={styles.similarProductsTitle}>Similar Products</Text>
      <CustomSimilarProducts product_id={ProductDetail.product_images[0].product_id} />
    </View>
    </ScrollView>
 
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  },
  productCost: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
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
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
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
