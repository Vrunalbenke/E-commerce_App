import { StyleProp, StyleSheet, Text, View, TextStyle } from 'react-native'
import React from 'react'

type CustomHeaderProps = {
    headerTitle:string
    style : StyleProp<TextStyle>,
    headerContainerStyle : StyleProp<TextStyle>,
}

const CustomHeader = ({headerTitle,style,headerContainerStyle}:CustomHeaderProps) => {
  return (
    <View style = {headerContainerStyle}>
      <Text style = {style}>{headerTitle}</Text>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({})