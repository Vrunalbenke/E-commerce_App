import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../Constants/colors'
import font from '../Constants/fonts'
type CustomToggleButtonProps = {
  onPress: (mf: string) => void;
  error: string;
  gender?: string;
};

const CustomToggleButton = ({
  onPress,
  gender,
  error,
}: CustomToggleButtonProps) => {
  
  const male = gender === 'M';
  const female = gender === 'F';

  return (
    <View style={styles.ToggleContainer}>
      <View style={styles.ToggleTextContainer}>
        <Text style={styles.ToggleText}>Gender <Text style={{color:'red',fontSize:23}}>{error}</Text></Text>
        
      </View>
      <View style={[ styles.ToggleBtnContainer]}>
        {/* ,{borderColor:ErrorState?'red':'black'} */}
        <TouchableOpacity
          style={[
            styles.MaleContainer,
            {backgroundColor: male ? color.black : color.white},
          ]}
          onPress={() => onPress('M')}>
          <Text style={[styles.Male, {color: male ? color.white : color.black}]}>
            Male
          </Text>
          <Ionicons
            name="male-sharp"
            size={25}
            style={{color: male ? color.white : color.black}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.FemaleContainer,
            {backgroundColor: female ? color.black : color.white},
          ]}
          onPress={() => onPress('F')}>
          <Text style={[styles.Female, {color: female ? color.white : color.black}]}>
            Female
          </Text>
          <Ionicons
            name="female-sharp"
            size={25}
            style={{color: female ? color.white : color.black}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomToggleButton;

const styles = StyleSheet.create({
  ToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height:'10%'
    paddingBottom: 20,
  },
  ToggleTextContainer: {},
  ToggleText: {
    fontSize: 20,
    fontFamily: font.RobotoC,
    fontWeight: '400',
    paddingLeft: 10,
    letterSpacing: 1,
  },
  ToggleBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderWidth: 1,
  },
  MaleContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
  },
  Male: {
    fontFamily: font.RobotoC,
    fontSize: 20,
  },
  FemaleContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Female: {
    fontFamily: font.RobotoC,
    fontSize: 20,
  },
});
