import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {HomeNavigatonProp} from '../../navigation/type';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import font from '../../Constants/fonts';
import {getUserDetail} from '../../redux/Slice/userSlice';
import {getCartItem} from '../../redux/Slice/cartSlice';
import {AppName} from '../../Constants/string'
import CustomCarouselSlider from '../../components/CustomCarouselSlider';

const {height,width} = Dimensions.get('window');
const Home = ({navigation}: HomeNavigatonProp) => {
  const accessToken = useAppSelector(state => state.Auth.AccessToken);
  console.log('Home data:--😋😋😋', accessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUserData();
  }, []);

  

  async function getUserData() {
    try {
      const userdata = await dispatch(getUserDetail(accessToken)).unwrap();
      console.log('Profile called');
    } catch (error) {
      console.log(error);
    }
  }

  async function getCartData() {
    try {
      await dispatch(getCartItem(accessToken));
    } catch (error) {
      console.log(error);
    }
  }

  function CategoryRoute(id: number) {
    console.log(id);
    navigation.navigate('Category', {
      product_category_id: id,
      backRoute: 'Home',
    });
  }
  return (
    <SafeAreaView style={{flex: 1, height: '100%', backgroundColor: '#325f88'}}>
      <View style={styles.headerConatianer}>
        <TouchableOpacity
          style={styles.IconContainer}
          onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={30} color={'#fff'} />
        </TouchableOpacity>
        <CustomHeader
          style={{
            // paddingTop: 6,
            fontSize: 30,
            fontFamily: font.BebasNB,
            color: '#fff',
          }}
          headerContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 10,
          }}
          headerTitle={AppName}
        />
        <View style={styles.headerRightConatianer}>
          <TouchableOpacity
            style={styles.IconContainer}
            onPress={() => {
              getCartData();
              navigation.navigate('Cart')}}>
            <Ionicons name="cart" size={30} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 30,
          backgroundColor: '#fff',
        }}>
        {/* <CustomCarouselSlider /> */}
        

        <View style={styles.CategoryContainer}>
          <Text
            style={{fontSize: 25, alignSelf: 'flex-start', fontWeight: 'bold'}}>
            Category's
          </Text>

          <TouchableOpacity
            style={{width: width * 0.8, height: width * 0.8}}
            onPress={() => CategoryRoute(1)}>
            <Image
              source={require('../../assets/images/Tables.png')}
              style={styles.CategoryBGI}
              />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: width * 0.8,
              height: width * 0.5,
              backgroundColor: '#fff',
            }}
            onPress={() => CategoryRoute(3)}>
            <Image
              source={require('../../assets/images/Sofas.png')}
              style={styles.CategoryBGI}
              />
          </TouchableOpacity>

          <TouchableOpacity
            style={{width: width * 0.5, height: width * 0.8}}
            onPress={() => CategoryRoute(2)}>
            <Image
              source={require('../../assets/images/Chairs.png')}
              style={styles.CategoryBGI}
              />
          </TouchableOpacity>

          <TouchableOpacity
            style={{width: width * 0.8, height: width * 0.8}}
            onPress={() => CategoryRoute(4)}>
            <Image
              source={require('../../assets/images/Beds.png')}
              style={[styles.CategoryBGI]}
              />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerConatianer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  IconContainer: {
    padding: 10,
  },
  headerRightConatianer: {
    flexDirection: 'row',
  },

  CategoryContainer: {
    width: width,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    gap: 20,
  },
  Category12: {
    width: '100%',
    height: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  Category34: {
    width: '100%',
    height: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  Category: {
    // borderWidth:1,
    width: '100%',
    height: 300,
    // borderRadius:20,
  },
  CategoryBGI: {
    width: '100%',
    height: '100%',
    // resizeMode: 'cover',
    borderRadius: 20,
    resizeMode: 'contain',
  },
  CategoryTitle: {
    fontSize: 18,
    paddingLeft: 10,
  },
});
