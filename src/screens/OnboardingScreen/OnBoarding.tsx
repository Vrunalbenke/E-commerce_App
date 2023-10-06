import {StyleSheet, View, Dimensions, TouchableOpacity,Text} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import {OnBoardingNavigatonProp} from '../../navigation/type';
import color from '../../Constants/colors'
import font from '../../Constants/fonts'
import { AppName } from '../../Constants/string';

const {width, height} = Dimensions.get('window');

const OnBoarding = ({navigation}: OnBoardingNavigatonProp) => {
  function OnboardingDone() {
    navigation.navigate('Login');
  }

const SkipButton = ({...props})=>{
    return (
        <TouchableOpacity {...props} style={styles.SkipButton}>
            <Text style={styles.SkipButtonText}>Skip</Text>
        </TouchableOpacity>
    )
  }

  const NextButton = ({...props})=>{
    return (
        <TouchableOpacity {...props} style={styles.SkipButton}>
            <Text style={styles.SkipButtonText}>Next</Text>
        </TouchableOpacity>
    )
  }

  const DoneButton = ({...props})=>{
    return (
      <TouchableOpacity {...props} style={styles.SkipButton}>
            <Text style={styles.SkipButtonText}>Login</Text>
        </TouchableOpacity>
    )
  }

  return (
    <View style={styles.MainContainer}>
      <Onboarding
        containerStyles={{paddingBottom:20}}
        onDone={() => OnboardingDone()}
        onSkip={() => OnboardingDone()}
        // bottomBarColor="#000"
        // bottomBarHighlight={false}
        SkipButtonComponent={SkipButton}
        NextButtonComponent={NextButton}
        DoneButtonComponent={DoneButton}
        titleStyles={{fontFamily:font.RobotoC,fontWeight:'600',color:'#000'}}
        subTitleStyles={{color:'#000',fontSize:16}}
        pages={[
          {
            backgroundColor: color.white ,
            image: (
              <View style={styles.Lottie}>
                {/* <Text>Hello Lottie</Text> */}
                <Lottie
                  style={styles.Lottie}
                  source={require('../../assets/Lottie-JSON/bedside-table.lottie.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Discover the Perfect Furniture',
            subtitle: `Welcome to ${AppName}! Get ready to explore a world of exquisite furniture designs that will transform your living spaces. From sleek modern pieces to timeless classics, we have something for every style and budget.`,
          },
          {
            backgroundColor: color.white,
            image: (
              <View>
                {/* <Text>Hello Lottie</Text> */}
                <Lottie
                  style={styles.babyCradle}
                  source={require('../../assets/Lottie-JSON/baby_cradle.lottie.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Create Your Dream Space',
            subtitle: 'With our app, you can visualize and plan your dream home effortlessly. Use our innovative room planner to arrange and experiment with different furniture layouts. Your creativity knows no bounds, and neither does our app.',
          },
          {
            backgroundColor: color.white,
            image: (
              <View>
                {/* <Text>Hello Lottie</Text> */}
                <Lottie
                  style={styles.cupBoard}
                  source={require('../../assets/Lottie-JSON/cupboard.lottie.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Stay Inspired',
            subtitle: 'Our app isn\'t just for shopping; it\'s a source of inspiration. Follow your favorite designers, explore trending styles, and discover tips and tricks for interior design. Let us keep you inspired on your journey to create a space you\'ll love.',
          },
          {
            backgroundColor: color.white,
            image: (
              <View>
                {/* <Text>Hello Lottie</Text> */}
                <Lottie
                  style={styles.diningTable}
                  source={require('../../assets/Lottie-JSON/dining-table.lottie.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Shop with Confidence',
            subtitle: 'Shop for furniture with confidence using our app. We offer a wide selection of high-quality, durable pieces from trusted brands. With user reviews and expert recommendations, you\'ll always make informed choices when furnishing your home.',
          },
        ]}
      />
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  SkipButton:{
    padding:15,
    // backgroundColor:'#fff',
    borderRadius:20,
  },
  SkipButtonText:{
    // color:'#000',
    fontFamily: font.RobotoC,
    fontSize:18,
    fontWeight:'600',
    color:'#000'
  },

  Lottie: {
    height: width,
    width: width * 0.9,
    // backgroundColor:'#fff'
  },
  babyCradle: {
    width: width * 0.9,
    height: width,
  },
  cupBoard:{
    width: width * 0.9,
    height: width,
  },
  diningTable: {
    width: width * 0.9,
    height: width,
  },
});
