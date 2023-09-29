import { StyleSheet, Text, View,TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useAppSelector } from '../redux/store'
import CustomAddressCard from './CustomAddressCard'

const CustomDeliveryAddress = () => {
    const AddressArray = useAppSelector(state => state.Address.address)

  return (
    <View >
      <View style={styles.firstContainer}>
        <Text style={styles.headerText}>Select Delivery Address</Text>
        <TouchableOpacity style={styles.TOPContainer}>
            <Ionicons name='add-circle-outline' size={30} style={{color:'#fff'}}/>
            <Text style={{fontSize:20,color:'#fff'}}> Add New Address</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secondContainer}>
      <ScrollView
    //   style={{height:500}}
      bounces={false}>
          {AddressArray.map((element, index) => {
            return (
              <CustomAddressCard key={index} address={element} order={1} />
            );
          })}
          </ScrollView>
      </View>
    </View>
  )
}

export default CustomDeliveryAddress

const styles = StyleSheet.create({
    firstContainer:{
        padding:10
    },
    headerText:{
        fontSize:23,
        fontWeight:'700'
    },
    TOPContainer:{
        marginTop:20,
        borderWidth:1,
        borderRadius:5,
        paddingHorizontal:30,
        paddingVertical:5,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#000'
    },
    secondContainer:{

    },
})