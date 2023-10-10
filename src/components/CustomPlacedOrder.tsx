import {StyleSheet, Text, View, Image,Dimensions, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { getOrderList } from '../redux/Slice/orderSlice';
import { useAppDispatch } from '../redux/store';


const {width,height} = Dimensions.get('screen')
type CustomPaymentProps = {
  stage: (index: number) => void;
};

const CustomPlacedOrder = ({stage}: CustomPaymentProps) => {
  const [animation, setAnimation] = useState(true);
  const [isLoading,setIsloading] = useState(false)
  const accessToken = useAppSelector(state => state.Auth.AccessToken);
  const dispatch = useAppDispatch()
  const navigation = useNavigation();
  setTimeout(() => {
    setAnimation(false);
  }, 7000);


  async function getOrderListAndDetail(){
    try{ 
     await dispatch(getOrderList({accessToken})).unwrap();
     // await dispatch(getOrderDetail({}))
     }
     catch(error){
         console.log(error)
     }
    }


  return (
    <View style={{flex: 1, width: '100%'}}>
      {animation ? (
        <View style={styles.LottieStyle}>
          <LottieView
            style={styles.Completed}
            source={require('../assets/Lottie-JSON/OrderedSuccess.json')}
            autoPlay
            loop={false}
          />
        </View>
      ) : (
        <View style={styles.firstContainer}>
          <View style={styles.upperContainer}>
          <Image
            source={require('../assets/images/OrderImage.jpg')}
            style={styles.OrderImage}
          />
          <Text style={styles.headerText}>Order Placed Successfully</Text>
          <Text style={styles.subtitleText}>
            Congratulation! Your order has been placed.
          </Text>
          <Text style={styles.subtitleText}>
            You can track your order number
          </Text>
          </View>
          <View style={styles.BtnContainer}>
            <TouchableOpacity style={styles.TOPContainer} 
            onPress={()=> {
              setIsloading(true)
              setTimeout(() => {
                setIsloading(false)
                navigation.navigate('Home')
                getOrderListAndDetail()
                stage(1)
              }, 500);
              } }>
              <Text style={{color:'#ffffff',fontSize:18}}>Continue Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.TOPContainer}
            onPress={()=> {
              setIsloading(true)
              setTimeout(() => {
                setIsloading(false)
                navigation.navigate('OrdersList')
                getOrderListAndDetail()
                stage(1)
              }, 2000);
              
              } }>
              <Text style={{color:'#ffffff',fontSize:18}}>Track Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal visible={isLoading} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <LottieView
          style={styles.Loader}
          source={require('../assets/Lottie-JSON/logoutLoader.json')}
          autoPlay
          loop
          />
          </View>
          </Modal>
    </View>
  );
};

export default CustomPlacedOrder;

const styles = StyleSheet.create({
  LottieStyle: {
    position: 'absolute',
    flex: 1,
    backgroundColor:'#b7b8c9',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  Completed: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  firstContainer: {
    // padding: 10,
    flex:1
  },
  upperContainer:{
    alignItems:'center',
    justifyContent:'center'
  },
  headerText: {
    fontSize: 23,
    fontWeight: '700',
    color: '#325f88',
  },
  subtitleText: {
    fontSize: 16,
  },
  OrderImage: {
    width: 300,
    height: 300,
  },
  BtnContainer: {
    position:'absolute',
    bottom:20,
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    paddingHorizontal:20
  },
  TOPContainer: {
    padding:10,
    backgroundColor:'#1A3851',
    borderRadius:5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Loader:{
    width:width*0.15,
    height:width*0.15
  }
});
