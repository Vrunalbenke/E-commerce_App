import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import video1 from '../assets/video/video1.mp4';
import video2 from '../assets/video/video2.mp4';
import Video from 'react-native-video';
import color from '../../src/Constants/colors'

const {height, width} = Dimensions.get('window');

const CustomCarouselSlider = () => {
  return (
    <View style={{justifyContent:'center',alignItems:'flex-start'}}>
      <ScrollView horizontal bounces={false} style={styles.ScrollViewStyle} pagingEnabled={true}
      indicatorStyle='white'
      persistentScrollbar={true}
      >
      <View style={styles.VideoContainer}>
        <Video source={video1} style={styles.VideoStyle} repeat={false} />
      </View>
      <View style={styles.VideoContainer}>
        <Video source={video2} style={styles.VideoStyle} repeat={false} />
      </View>
      <View style={styles.VideoContainer}>
        <Video source={video1} style={styles.VideoStyle} repeat={false} />
      </View>
    </ScrollView>
    </View>
  );
};

export default CustomCarouselSlider;

const styles = StyleSheet.create({
  ScrollViewStyle: {
    height:220,
    // paddingHorizontal: 10,
    // backgroundColor:'#e2e2e2',
    
  },
  VideoContainer: {
    width: width,
    height: '100%',
    justifyContent:'center',
    alignItems:'flex-start',
    // padding:10
  },
  VideoStyle: {
    // aspectRatio:'cover',
    // padding:10,
    width: width ,
    height: '100%',
  },
});
