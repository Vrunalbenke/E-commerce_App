import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'

type CustomButtonProps = {
    TOPstyle:StyleProp<ViewStyle>,
    // style:React.CSSProperties,
    textStyle:StyleProp<TextStyle>,
    onPress: () => void,
    BtnName:string
}



const CustomButton = ({TOPstyle,textStyle,onPress,BtnName}:CustomButtonProps) => {
  return (
        <TouchableOpacity style={TOPstyle} onPress={onPress}>
            <Text style = {textStyle}>{BtnName}</Text>
        </TouchableOpacity>

  )
}

export default CustomButton

const styles = StyleSheet.create({
})