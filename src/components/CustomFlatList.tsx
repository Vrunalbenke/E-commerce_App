import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  useWindowDimensions,
  ListRenderItemInfo,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import color from '../Constants/colors';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {EmptyProductData, getProduct} from '../redux/Slice/productSlice';
import Lottie from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type CustomFlatListProps = {
  product_category_id: number;
  onPress: (product_id: number,product_category_id:number) => void;
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
const CustomFlatList = ({
  product_category_id,
  onPress,
}: CustomFlatListProps) => {
  const {height, width} = useWindowDimensions();
  const dispatch = useAppDispatch();
  let ProductData = useAppSelector(state => state.Product.ProductData);

  const [isloading, setIsloading] = useState<boolean>(false);
  // console.log('Length is ☠️☠️☠️☠️☠️☠️☠️ --->', ProductData);
  // console.log('Length is ☠️☠️☠️☠️☠️☠️☠️ --->',data)
  // console.log('🦋🦋🦋🦋🦋🦋', product_category_id, '🦋🦋🦋🦋🦋🦋');

  const apiData = async () => {
    setIsloading(true);
    try {
      // console.log('LOGGGGGGGGGGGGG');
      const val = await dispatch(getProduct(product_category_id)).unwrap();
      // console.log(val);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    apiData();
    return () => {
      dispatch(EmptyProductData([]));
      ProductData = [];
      // console.log('🐵🐵🐵🐵🐵🐵🐵', ProductData);
    };
  }, [product_category_id]);

  function StarRating(rating){
    const normalizedRating = Math.min(Math.max(rating, 0), 5);

  const stars = [];
  const maxStars = 5;

  for (let i = 1; i <= maxStars; i++) {
    if (i <= normalizedRating) {
      // Full star
      stars.push(<Ionicons key={i} name="star-sharp" size={20} style={{ color: 'gold' }} />);
    } else if (i - 0.5 <= normalizedRating) {
      // Half star
      stars.push(<Ionicons key={i} name="star-half-sharp" size={20} style={{ color: 'gold' }} />);
    } else {
      // Empty star
      stars.push(<Ionicons key={i} name="star-sharp" size={20} style={{ color: 'gray' }} />);
    }
  }
  return <View style={{flexDirection:'row'}}>{stars}</View>;
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

  function RenderProduct(item: ListRenderItemInfo<itemProps>) {
    // console.log('item😇😇😇😇😇😇', item);
    // console.log(item.item.id);
    return (
      <TouchableOpacity
        style={{
          marginVertical: 10,
          backgroundColor: color.offWhite,
          width: 300,
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
        onPress={()=> (onPress(item.item.id,product_category_id))}
        >
        <View>
          <View style={{justifyContent: 'flex-start', backgroundColor: '#fff'}}>
            <Image
              source={{uri: item.item.product_images}}
              style={{
                width: 200,
                height: 200,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
            <View></View>
          </View>

          <View style={{padding: 10}}>
            <Text style={{fontSize: 25,fontWeight:"700",color:'#000'}}>
              {item.item.name}
            </Text>
            <Text style={{fontSize: 20,color:'#000'}}>₹{commafy(item.item.cost)}</Text>
           
            {StarRating(item.item.rating)}
          </View>
        </View>
      </TouchableOpacity>
      
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
          renderItem={item => RenderProduct(item)}
          //   keyExtractor={item => (item.item.id)?.toString()}
          showsVerticalScrollIndicator={false}
          
        />
      )}
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
