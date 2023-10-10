import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomButton from '../components/CustomButton'

const Blank = () => {
  return (
    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Blank</Text>
    
      <TouchableOpacity>
        <Text></Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Blank

const styles = StyleSheet.create({})