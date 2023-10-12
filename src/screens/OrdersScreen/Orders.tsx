import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {OrdersNavigationProp} from '../../navigation/type';
import CustomHeader from '../../components/CustomHeader';
import font from '../../Constants/fonts';
import CustomDeliveryAddress from '../../components/CustomDeliveryAddress';
import CustomPayment from '../../components/CustomPayment';
import CustomPlacedOrder from '../../components/CustomPlacedOrder';
import { useAppDispatch, useAppSelector } from '../../redux/store';


const Orders = ({navigation}: OrdersNavigationProp) => {
  const [stage,setStage] = useState(1)
/**
 * @author benke
 * @param index 
 * 
 */


  function ChangeStage(index:number){
    setStage(index)
  }
  
  function NavigationRoute(){
    if(stage  === 1){
      navigation.navigate('Cart')
    }
    else if(stage === 2){
      setStage(1)
    }
    else{
      navigation.navigate('Cart')
    }
  }


  const headerTitle = `Checkout(${stage}/3)`
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#325f88'}}>
      <View style={styles.headerConatianer}>
        <View style={styles.headerFirstContainer}>
          <TouchableOpacity onPress={() => NavigationRoute()}>
            <Ionicons name="arrow-back-outline" size={29} style={{color:'#ffffff'}} />
          </TouchableOpacity>
          <CustomHeader
          headerTitle={stage === 1 ? 'Checkout(1/3)' : stage === 2 ? 'Checkout(2/3)' : 'Checkout(3/3)'}
            style={{
              fontSize: 25,
              fontFamily: font.BebasNB,
              color:'#ffffff'
              // color:'#ffffff'
            }}
            headerContainerStyle={{
              // height: '25%',
              justifyContent: 'center',
              alignItems: 'center',
              
            }}
            
          />
          <View style={{width: 20}}></View>
        </View>
        <View style={styles.headerSecondContainer}>
            <View style={styles.ButtonContainer}>
                <View style={styles.ButtonInnerContainer}>
                  <MaterialIcons name={stage > 1 ? 'check-circle' : 'radio-button-checked'} size={25} 
                  style={{
                    color: stage === 1 ?'#3498DB':'#fff',
                    
                    }}/>
                  <Text style={{color:'#fff'}}>- - - - - - - - -</Text>
                </View>
                <View style={styles.ButtonInnerContainer}>
                  <MaterialIcons name={stage > 2 ? 'check-circle' : 'radio-button-checked'} size={25}
                  style={{
                    color: stage === 2 ?'#3498DB':'#fff',
                    }}/>
                  <Text style={{color:'#fff'}}>- - - - - - - - -</Text>
                </View>
                <View style={styles.ButtonInnerContainer}>
                  <MaterialIcons name={stage > 2 ? 'check-circle' : 'radio-button-checked'} size={25}
                  style={{
                    color:'#fff',
                    }}/>
                </View>
            </View>
            <View style={styles.firstButtonInnerContainer}>
            <Text style={{color:'#fff'}}>Delivery Address</Text>
            <Text style={{paddingRight:15,color:'#fff'}}>Payment</Text>
            <Text style={{color:'#fff'}}>Order Placed</Text>
            </View>
        </View>
      </View>

      <View style={[styles.MainContainer]}>
        {stage === 1 ? 
        (<CustomDeliveryAddress stage={()=>ChangeStage(2)}/>):
        stage === 2 ?(<CustomPayment stage={()=>ChangeStage(3)}/>) : <CustomPlacedOrder stage={()=>ChangeStage(1)}/>
        }
        
      </View>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  headerConatianer: {
    padding: 5,
  },
  headerFirstContainer: {
    paddingTop:5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:'100%',
    paddingBottom:10
  },
  headerSecondContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  ButtonContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  ButtonInnerContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:7
  },
  firstButtonInnerContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-end',
    gap:30
  },
  MainContainer:{
    flex:1,
    backgroundColor:'#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  }
});
