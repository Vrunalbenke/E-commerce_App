import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch} from '../redux/store';
import {setProductRating} from '../redux/Slice/productSlice';

type CustomRatingProps = {
  setState: (rating: number) => void;
  ProductID: string;
  rating: number;
};

const CustomRating = ({setState, ProductID, rating}: CustomRatingProps) => {
  const dispatch = useAppDispatch();
  console.log(ProductID, 'Hii', rating);



  async function setRating(prodRating:number) {
    console.log(prodRating, '0909909');
    let formData = new FormData();
        formData.append('product_id',ProductID)
        formData.append('rating',prodRating)
    try {
      await dispatch(setProductRating(formData)).unwrap();
    } catch (error) {
      console.log('Logged CustomRating', error);
    }
  }

  const handleStarClick = (clickedIndex: number) => {
    const newRating = clickedIndex + 1;
    console.log(newRating, '77777');
    setState(newRating);
    setRating(newRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const isFullStar = i < rating;

      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarClick(i)}>
          <Ionicons
            name={isFullStar ? 'star-sharp' : 'star-outline'}
            size={30}
            color={isFullStar ? 'gold' : 'gray'}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  return <View style={{flexDirection: 'row'}}>{renderStars()}</View>;
};

export default CustomRating;
