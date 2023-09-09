import { StyleSheet,StyleProp, Text, TextInput, View, TextStyle, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

type CustomInputFieldProps ={
    // style : React.CSSProperties
    label:string
    placeholder:string
    secureTextEntry:boolean
    deCaptialize?: ((value:string) => string) | undefined
    Icon?:string | undefined
    Icon2?:string | undefined
    textInputStyle : StyleProp<TextStyle>
    labelStyle : StyleProp<TextStyle>
    
}

const CustomInputField = ({label,placeholder,secureTextEntry,deCaptialize,Icon,Icon2,textInputStyle,labelStyle}:CustomInputFieldProps) => {
  const [pass,hidePass] = useState(Icon)

  function IconToggle(){
    if(pass === Icon){
      hidePass(Icon2)
      // secureTextEntry = true
    }
    else{
      hidePass(Icon)
      // secureTextEntry = false
    }
  }
  return (
    <View style={styles.MainContainer}>
        <Text style={labelStyle}>{label}</Text>
        <View style = {styles.TinpIconStyle}>
        <TextInput
        style = {textInputStyle}
        secureTextEntry = {pass === Icon2 ? !secureTextEntry:secureTextEntry}
        placeholder={placeholder}
        // value=''
        // onChange={deCaptialize}
        />
        <TouchableOpacity style={styles.IconContainer} onPress={IconToggle}>
          <Ionicons name={pass} style={styles.Icon} />
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default CustomInputField

const styles = StyleSheet.create({
  MainContainer:{
    // backgroundColor:'yellow',
    marginBottom:10
  },
  TinpIconStyle:{
    borderBottomWidth: 1,
    borderBottomColor: '#b1afaf',
    paddingHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    margin:0,
    width:'100%'
    // backgroundColor:'lightblue'
  },
  IconContainer:{
    // backgroundColor:'yellow',
    height:35
  },
  Icon:{
    fontSize:25
  },

})