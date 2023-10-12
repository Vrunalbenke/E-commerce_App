import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {HomeNavigatonProp} from '../../navigation/type';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import font from '../../Constants/fonts';
import {getUserDetail} from '../../redux/Slice/userSlice';
import {getCartItem} from '../../redux/Slice/cartSlice';
import {AppName} from '../../Constants/string';
import CustomCarouselSlider from '../../components/CustomCarouselSlider';
import {getOrderList} from '../../redux/Slice/orderSlice';
import LottieView from 'lottie-react-native';

const {height, width} = Dimensions.get('window');
const Home = ({navigation}: HomeNavigatonProp) => {
  const accessToken = useAppSelector(state => state.Auth.AccessToken);
  console.log('Home data:--😋😋😋', accessToken);
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUserData();
    getOrderListAndDetail();
    getCartData();
  }, []);

  async function getUserData() {
    // setIsloading(true);
    try {
      const userdata = await dispatch(getUserDetail(accessToken)).unwrap();
      // setIsloading(false);
      console.log('Profile called');
    } catch (error) {
      console.log(error);
      // setIsloading(false);
    }
  }

  async function getOrderListAndDetail() {
    // setIsloading(true);
    try {
      await dispatch(getOrderList({accessToken: accessToken})).unwrap();
      // setIsloading(false);
    } catch (error) {
      console.log(error);
      // setIsloading(false);
    }
  }

  async function getCartData() {
    // setIsloading(true);
    try {
      await dispatch(getCartItem(accessToken)).unwrap();
      // setIsloading(false);
    } catch (error) {
      console.log(error);
      // setIsloading(false);
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
      <View style={styles.headerContianer}>
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
              navigation.navigate('Cart');
            }}>
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
        <CustomCarouselSlider />

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
      <Modal visible={isLoading} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <LottieView
            style={styles.Loader}
            source={require('../../assets/Lottie-JSON/logoutLoader.json')}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerContianer: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  Loader: {
    width: width * 0.15,
    height: width * 0.15,
  },
});
