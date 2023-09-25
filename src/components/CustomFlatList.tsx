import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  useWindowDimensions,
  ListRenderItemInfo,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import React, {useEffect, useState} from 'react';
import color from '../Constants/colors';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { EmptyProductData, getProduct } from '../redux/Slice/productSlice';
import Lottie from 'lottie-react-native';
type CustomFlatListProps = {
  product_category_id: number
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
const {width, height} = Dimensions.get('window');
const CustomFlatList = ({product_category_id,onPress}: CustomFlatListProps) => {
  const {height, width} = useWindowDimensions();
  const dispatch = useAppDispatch();
  let ProductData = useAppSelector(state => state.Product.ProductData);

  const [isloading,setIsloading] = useState<boolean>(false)
  console.log('Length is ☠️☠️☠️☠️☠️☠️☠️ --->',ProductData)
  // console.log('Length is ☠️☠️☠️☠️☠️☠️☠️ --->',data)
  console.log('🦋🦋🦋🦋🦋🦋', product_category_id,'🦋🦋🦋🦋🦋🦋');

  const apiData = async () => {
    setIsloading(true)
    try{
      console.log('LOGGGGGGGGGGGGG')
      const val = await dispatch(getProduct(product_category_id)).unwrap();
      console.log(val)
      setIsloading(false)
    }
    catch(error){
      setIsloading(false)
      console.log(error)
    }
  };

  useEffect(() => {
      apiData();
    return () => {
      dispatch(EmptyProductData([]));
      ProductData = [];
      console.log('🐵🐵🐵🐵🐵🐵🐵', ProductData);
    };
  }, [product_category_id]);


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
      {/* {data.length !== 0 && ( */}
      {isloading ? (
          <Lottie
            style={styles.Loader}
            source={require('../../src/assets/Lottie-JSON/furniture_loader.json')}
            autoPlay
            loop
          />
        ) : (
        <FlatList
          data={ProductData}
          renderItem={(item) => RenderProduct(item)}
        //   keyExtractor={item => (item.item.id)?.toString()}
          showsVerticalScrollIndicator={false}
        />)}
    </View>
  );
};

export default CustomFlatList;

const styles = StyleSheet.create({
  Loader: {
    width: width * 0.9,
    height: width,
  },
});
