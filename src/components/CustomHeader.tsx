import { StyleProp, StyleSheet, Text, View, TextStyle } from 'react-native'
import React from 'react'

type CustomHeaderProps = {
    style : StyleProp<TextStyle>,
    headerTitle:string
}

const CustomHeader = ({style,headerTitle}:CustomHeaderProps) => {
  return (
    <View style = {styles.headerContainer}>
      <Text style = {style}>{headerTitle}</Text>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    headerContainer:{
        height:'25%',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'#000'
    },
    headerText:{
        fontSize:50,
        fontFamily:"Bebas Neue Bold",
        // fontWeight:'900'
    }
})