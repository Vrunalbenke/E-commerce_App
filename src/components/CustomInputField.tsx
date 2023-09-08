import { StyleSheet,StyleProp, Text, TextInput, View, TextStyle } from 'react-native'
import React from 'react'

type CustomInputFieldProps ={
    // style : React.CSSProperties
    label:string
    placeholder:string
    secureTextEntry:boolean
    style : StyleProp<TextStyle>
    deCaptialize?: ((value:string) => string) | undefined
}

const CustomInputField = ({label,placeholder,secureTextEntry,style,deCaptialize}:CustomInputFieldProps) => {
  return (
    <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
        style = {style}
        secureTextEntry = {secureTextEntry}
        placeholder={placeholder}
        value=''
        // onChange={deCaptialize}
        />
    </View>
  )
}

export default CustomInputField

const styles = StyleSheet.create({
    TextInputStyle:{},
    label:{
        fontSize:20,
        fontFamily:'Roboto Condensed',
        fontWeight:'500',
        paddingLeft:10,
        letterSpacing:1
        // backgroundColor:'lightblue'
    }
})