import { Image, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import color from '../Constants/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useAppSelector } from '../redux/store'

type CustomSimilarProductsProps = {
  product_id:number;
  onPressProductDetail: (product_id: number) => void;
}

const CustomSimilarProducts = ({product_id,onPressProductDetail}:CustomSimilarProductsProps) => {
    const SimilarProductsData = useAppSelector(state => state.Product.ProductData).filter((item)=>{
        return item.id !== product_id;
    })

    console.log(SimilarProductsData,'💧💧💧💧💧💧💧💧💧💧')


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

    
  return (
    <View>
    {SimilarProductsData.map((item, index) => (
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
        }}
        onPress={()=> (onPressProductDetail(item.id))}
        >
        
        <View >
          <View style={{justifyContent: 'flex-start', backgroundColor: '#fff'}}>
            <Image
              source={{ uri: item.product_images }}
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
            <Text style={{fontSize: 25,fontWeight:"700"}}>
              {item.name}
            </Text>
            <Text style={{fontSize: 20}}>₹{item.cost}</Text>
           
            {StarRating(item.rating)}
          </View>
        </View>
      </TouchableOpacity>
      ))}
    </View>
//     <View>
//   {SimilarProductsData.map((item, index) => (
//     <View style={styles.card} key={index}>
//       <Image source={{ uri: item.product_images }} style={styles.image} />
//       <View style={styles.details}>
//         <Text style={styles.name}>{item.name}</Text>
//         {/* <Text style={styles.description}>{item.description.length > 60
//             ? `${item.description.slice(0, 60)}...`
//             : item.description}</Text> */}
//         <Text style={styles.price}>Price: ${item.cost}</Text>
//         {/* <Text style={styles.rating}>Rating: {item.rating}</Text> */}
//         {/* <Text style={styles.viewCount}>Views: {item.view_count}</Text> */}
//       </View>
//     </View>
//   ))}
// </View>

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