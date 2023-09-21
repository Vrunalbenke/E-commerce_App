import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  useWindowDimensions,
  ListRenderItemInfo,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import color from '../Constants/colors';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { EmptyProductData } from '../redux/Slice/productSlice';

type CustomFlatListProps = {
  data: itemProps[];
  onPress: (product_id:number) => void
};

type itemProps = {
  id: number;
  product_category_id: ListRenderItemInfo<number>;
  name: string;
  producer: string;
  description: string;
  cost: number;
  rating: number;
  view_count: number;
  created: string;
  modified: string;
  product_images: string;
};

const CustomFlatList = ({data,onPress}: CustomFlatListProps) => {
  const {height, width} = useWindowDimensions();
  const productArrLength = useAppSelector(state => (state.Product.ProductData))
  console.log('Length is ☠️☠️☠️☠️☠️☠️☠️ --->',productArrLength.length)
  console.log('Length is ☠️☠️☠️☠️☠️☠️☠️ --->',data)




  function RenderProduct(item: ListRenderItemInfo<itemProps>) {
    console.log('item😇😇😇😇😇😇', item);
    console.log(item.item.id)
    return (
      <TouchableOpacity
        style={{
          width: width,
          height: height * 0.3,
          flexDirection: 'column',
          backgroundColor: color.white,
          margin: 10,
          padding: 10,
        }}
        onPress={()=> (onPress(item.item.id))}
        >
        <View style={{alignItems: 'center', backgroundColor: color.white}}>
          <Image
            source={{uri: item.item.product_images}}
            style={{width: 100, height: 100}}
          />
        </View>
        <View>
          <Text style={{fontSize: 20}}>{item.item.name}</Text>
          <Text>{item.item.description}</Text>
          <Text>{item.item.cost}</Text>
          <Text>{item.item.view_count}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: color.offWhite}}>
      {data.length !== 0 && (
        <FlatList
          data={data}
          renderItem={(item) => RenderProduct(item)}
        //   keyExtractor={item => (item.item.id)?.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default CustomFlatList;

const styles = StyleSheet.create({});
