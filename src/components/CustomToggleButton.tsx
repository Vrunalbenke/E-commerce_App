import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
// import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomToggleButton = () => {

  const [male,isMale] = useState(false)
  const [female,isFemale] = useState(false)


  function MaleSelect(){
    if(male !== true){
      isMale(true)
      isFemale(false)
    }
  }

  function FemaleSelect(){
    if(female !== true){
      isFemale(true)
      isMale(false)
    }
  }
  return (
    <View style={styles.ToggleContainer}>
      <View style={styles.ToggleTextContainer}>
        <Text style={styles.ToggleText}>Gender :</Text>
      </View>
      <View style={styles.ToggleBtnContainer}>
        <TouchableOpacity 
        style={[styles.MaleContainer,{backgroundColor: (male? '#000':'#fff')}]}
        onPress={MaleSelect}
        >
          <Text style={[styles.Male,{color: (male? '#fff':'#000')}]}>Male</Text>
          <Ionicons name="male-sharp" size={25} style={{color: (male? '#fff':'#000')}}/>
        </TouchableOpacity>
        <TouchableOpacity 
        style={[styles.FemaleContainer,{backgroundColor: (female? '#000':'#fff')}]}
        onPress={FemaleSelect}
        >
          <Text style={[styles.Female,{color: (female? '#fff':'#000')}]}>Female</Text>
          <Ionicons name="female-sharp" size={25} style={{color: (female? '#fff':'#000')}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomToggleButton;

const styles = StyleSheet.create({
  ToggleContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    // height:'10%'
    paddingBottom:20
  },
  ToggleTextContainer: {},
  ToggleText: {
    fontSize: 20,
    fontFamily: 'Roboto Condensed',
    fontWeight: '400',
    paddingLeft: 10,
    letterSpacing: 1,
  },
  ToggleBtnContainer: {
    flexDirection:'row',
    justifyContent:'flex-end',
    borderWidth:1,
    
  },
  MaleContainer: {
    padding:5,
    flexDirection:'row',
    alignItems:'center',
  },
  Male: {
    fontFamily:'Roboto Condensed',
    fontSize:20
  },
  FemaleContainer: {
    padding:5,
    flexDirection:'row',
    alignItems:'center',
  },
  Female: {
    fontFamily:'Roboto Condensed',
    fontSize:20
  },
});
