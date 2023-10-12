import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomButton from '../components/CustomButton'
import { BlankNavigationProp } from '../navigation/type'

const Blank = ({navigation}:BlankNavigationProp) => {
  return (
    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center',gap:10}}>
      <Text>Blank</Text>
    
      <TouchableOpacity 
      onPress={()=> navigation.navigate('Home')}
      >
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=> navigation.navigate('Profile')}
      >
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=> navigation.navigate('Cart')}
      >
        <Text>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=> navigation.navigate('Orders')}
      >
        <Text>Orders</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Blank

const styles = StyleSheet.create({})