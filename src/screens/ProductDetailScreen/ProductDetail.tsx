import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// type Props = {
//   ProductDetailData:ProductDetailDataProps
// }

type ProductDetailDataProps = {
  id: number,
    product_category_id: number,
    name: string,
    producer: string,
    description: string,
    cost: number,
    rating: number,
    view_count: number,
     created: string,
     modified: string,
     product_images: object[]
}

const ProductDetail = ({ProductDetailData}: ProductDetailDataProps) => {


  return (
    <View>
      <View>
       <Text>{ProductDetailData.name}</Text>
      </View>
      <View></View>
    </View>
  )
}

export default ProductDetail

const styles = StyleSheet.create({})