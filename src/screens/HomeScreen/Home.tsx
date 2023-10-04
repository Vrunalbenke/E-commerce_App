import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {logout} from '../../redux/Slice/registerSlice';
import {HomeNavigatonProp} from '../../navigation/type';
// import CustomCarouselSlider from '../../components/CustomCarouselSlider';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import font from '../../Constants/fonts';
import {getUserDetail} from '../../redux/Slice/userSlice';
import { getOrderList } from '../../redux/Slice/orderSlice';
import { getCartItem } from '../../redux/Slice/cartSlice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Home = ({navigation}: HomeNavigatonProp) => {
  const accessToken = useAppSelector(state => state.Auth.AccessToken);
  console.log('Home data:--😋😋😋', accessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUserData();
    getOrderListAndDetail();
    getCartData();
  }, []);

  async function getUserData() {
    try {
      const userdata = await dispatch(getUserDetail(accessToken)).unwrap();
      console.log('Profile called');
    } catch (error) {
      console.log(error);
    }
  }

  async function getOrderListAndDetail(){
    try{ 
     await dispatch(getOrderList({accessToken})).unwrap();
     // await dispatch(getOrderDetail({}))
     }
     catch(error){
         console.log(error)
     }
    }

    async function getCartData() {
      try {
        await dispatch(getCartItem(accessToken));
      } catch (error) {
        console.log(error);
      }
    }



  // function LogoutUser() {
  //   console.log('Logged');
  //   // dispatch(logout(AuthData.length))
  //   dispatch(logout(undefined));
  //   console.log('Home data,AuthData is Popped:--😋#😋', data);
  //   navigation.navigate('Login');
  // }

  function CategoryRoute(id: number) {
    console.log(id);
    navigation.navigate('Category', {
      product_category_id: id,
    });
  }
  return (
    <SafeAreaView style={{flex: 1, height: '100%', backgroundColor: '#325f88'}}>
      <StatusBar backgroundColor="#000" barStyle={'light-content'} />
      <View style={styles.headerConatianer}>
        <TouchableOpacity
          style={styles.IconContainer}
          onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={30} color={'#fff'} />
        </TouchableOpacity>
        <CustomHeader
          style={{
            paddingTop: 6,
            fontSize: 30,
            fontFamily: font.BebasNB,
            color:'#fff'
            
          }}
          headerContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 10,
          }}
          headerTitle="NeoSTORE"
        />
        <View style={styles.headerRightConatianer}>
          {/* <TouchableOpacity style={styles.IconContainer}>
            <Ionicons name="search" size={30} />
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.IconContainer}
            onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart" size={30}color={'#fff'}/>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
      showsVerticalScrollIndicator ={false}
        style={{
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 30,
          backgroundColor:'#fff'
        }}>
        {/* <CustomCarouselSlider /> */}

        <View style={styles.CategoryContainer}>
          <Text
            style={{fontSize: 25, alignSelf: 'flex-start', fontWeight: 'bold'}}>
            Category's
          </Text>

          <TouchableOpacity
            style={{width: windowWidth * 0.8, height: windowWidth * 0.8}}
            onPress={() => CategoryRoute(1)}>
            <ImageBackground
              source={require('../../assets/images/Tables.png')}
              style={styles.CategoryBGI}
              imageStyle={{
                borderRadius: 20,
                resizeMode: 'contain',
              }}></ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: windowWidth * 0.8,
              height: windowWidth * 0.5,
              backgroundColor: '#fff',
            }}
            onPress={() => CategoryRoute(3)}>
            <ImageBackground
              source={require('../../assets/images/Sofas.png')}
              style={styles.CategoryBGI}
              imageStyle={{
                borderRadius: 30,
                resizeMode: 'contain',
              }}></ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width: windowWidth * 0.5, height: windowWidth * 0.8}}
            onPress={() => CategoryRoute(2)}>
            <ImageBackground
              source={require('../../assets/images/Chairs.png')}
              style={styles.CategoryBGI}
              imageStyle={{
                borderRadius: 20,
                resizeMode: 'contain',
              }}></ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width: windowWidth * 0.8, height: windowWidth * 0.8}}
            onPress={() => CategoryRoute(4)}>
            <ImageBackground
              source={require('../../assets/images/Beds.png')}
              style={[styles.CategoryBGI]}
              imageStyle={{
                borderRadius: 20,
                resizeMode: 'contain',
              }}></ImageBackground>
          </TouchableOpacity>
        </View>
        {/* <CustomButton onPress={LogoutUser} BtnName="logout" /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerConatianer: {
    flexDirection: 'row',
    // backgroundColor: '#f4f4f4',
    // backgroundColor: '#d4d1d1',
    height: '10%',
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
    width: windowWidth,
    // backgroundColor:color.black,
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
    resizeMode: 'cover',
  },
  CategoryTitle: {
    fontSize: 18,
    paddingLeft: 10,
  },
});
