import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'

type CustomButtonProps = {
    style:StyleProp<ViewStyle>,
    // style:React.CSSProperties,
    textStyle:StyleProp<TextStyle>,
    onPress: () => void,
    BtnName:string
}



const CustomButton = ({style,textStyle,onPress,BtnName}:CustomButtonProps) => {
  return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Text style = {textStyle}>{BtnName}</Text>
        </TouchableOpacity>

  )
}

export default CustomButton

const styles = StyleSheet.create({
})