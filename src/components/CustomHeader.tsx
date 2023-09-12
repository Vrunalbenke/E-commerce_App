import { StyleProp, StyleSheet, Text, View, TextStyle, ViewStyle } from 'react-native'
import React from 'react'

type CustomHeaderProps = {
    headerTitle:string
    style : StyleProp<TextStyle>,
    headerContainerStyle : StyleProp<ViewStyle>,
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