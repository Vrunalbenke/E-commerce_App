import React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Video from 'react-native-video';

const CustomCarouselSlider = () => {
  const width = Dimensions.get('window').width;
  const data = [
    require('../assets/video/video1.mp4'),
    require('../assets/images/CarouselImage1.png'),
    require('../assets/images/CarouselImage2.png'),
    require('../assets/images/CarouselImage3.png'),
  ];
  let count = 1;
  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={3000}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item, index}) => (
          <View
            style={{
              flex: 1,
              // borderWidth: 1,
              justifyContent: 'center',
              padding: 2,
            }}>
            {index === 0 ? (
              <Video
                source={item}
                style={{width: '100%', height: '100%',
                backgroundColor:'pink',
              }}
              resizeMode='cover'
                repeat={true}
              />
            ) : (
              <Image style={{width: '100%', height: '100%'}} source={item} />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default CustomCarouselSlider;
