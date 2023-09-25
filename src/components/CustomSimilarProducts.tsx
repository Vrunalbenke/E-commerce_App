import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../redux/store'

const CustomSimilarProducts = ({product_id}:number) => {
    const SimilarProductsData = useAppSelector(state => state.Product.ProductData).filter((item)=>{
        return item.id !== product_id;
    })


    SimilarProductsData.map((item)=>{
        console.log('🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈',item);
    })

  return (

    <View>
  {SimilarProductsData.map((item, index) => (
    <View style={styles.card} key={index}>
      <Image source={{ uri: item.product_images }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description.length > 60
            ? `${item.description.slice(0, 60)}...`
            : item.description}</Text>
        <Text style={styles.price}>Price: ${item.cost}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
        <Text style={styles.viewCount}>Views: {item.view_count}</Text>
      </View>
    </View>
  ))}
</View>

  )
}

export default CustomSimilarProducts

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      image: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
      },
      details: {
        flex: 1,
        padding: 10,
      },
      name: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      description: {
        fontSize: 14,
        color: 'gray',
      },
      price: {
        fontSize: 16,
      },
      rating: {
        fontSize: 14,
      },
      viewCount: {
        fontSize: 14,
      },
})