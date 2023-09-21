import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {logout} from '../../redux/Slice/registerSlice';
import {HomeNavigatonProp} from '../../navigation/type';
import CustomButton from '../../components/CustomButton';
import CustomCarouselSlider from '../../components/CustomCarouselSlider';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../Constants/colors'
import font from '../../Constants/fonts'

const Home = ({navigation}: HomeNavigatonProp) => {
  const data = useAppSelector(state => state.Auth.AuthData);
  console.log('Home data:--😋😋😋', data);
  const dispatch = useAppDispatch();

  function LogoutUser() {
    console.log('Logged');
    // dispatch(logout(AuthData.length))
    dispatch(logout(undefined));
    console.log('Home data,AuthData is Popped:--😋#😋', data);
    navigation.navigate('Login');
  }

  function CategoryRoute(id:number){
    console.log(id)
    navigation.navigate('Category',{
      product_category_id : id
    })
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerConatianer}>
        <TouchableOpacity style={styles.IconContainer}
        onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" size={30} />
        </TouchableOpacity>
        <CustomHeader
          style={{
            paddingTop: 6,
            fontSize: 30,
            fontFamily: font.BebasNB,
          }}
          headerContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 10,
          }}
          headerTitle="NeoSTORE"
        />
        <View style={styles.headerRightConatianer}>
          <TouchableOpacity style={styles.IconContainer}>
            <Ionicons name="search" size={30} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.IconContainer}>
            <Ionicons name="cart" size={30} />
          </TouchableOpacity>
        </View>
      </View>
        
      <CustomCarouselSlider />

      <View style={styles.CategoryContainer}>
        
        <View style={styles.Category12}>
          <TouchableOpacity style={styles.Category}
          onPress={()=>(CategoryRoute(1))}
          >
            <Text>Table</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Category}
          onPress={()=>(CategoryRoute(2))}
          >
          <Text>Chair</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Category34}>

          <TouchableOpacity style={styles.Category}
            onPress={()=>(CategoryRoute(3))}
          >
          <Text>Sofa</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.Category}
          onPress={()=>(CategoryRoute(4))}
          >
          <Text>Bed</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomButton onPress={LogoutUser} BtnName="logout" />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerConatianer: {
    flexDirection: 'row',
    backgroundColor: color.offWhite,
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

  CategoryContainer:{
    height:'40%',
    backgroundColor:'lightblue',
    padding:10,
    justifyContent:'space-between'
  },
  Category12:{
    flexDirection:'row',
    justifyContent:'space-between',
    // width:'100%',
    // height:'100%'
  },
  Category34:{
  flexDirection:'row',
  justifyContent:'space-between',
  // width:'100%',
  // height:'100%'
  },
  Category:{
    padding:10,
    borderWidth:1,
    width:'35%',
    height:'50%'
  }
});
