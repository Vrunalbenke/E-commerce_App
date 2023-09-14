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

type CustomToggleButtonProps = {
  onPress: (mf: string) => void;
  borderStyle: StyleProp<ViewStyle>;
  error: string;
  gender?: string;
};

const CustomToggleButton = ({
  onPress,
  borderStyle,
  gender,
  error,
}: CustomToggleButtonProps) => {
  
  const male = gender === 'M';
  const female = gender === 'F';

  return (
    <View style={styles.ToggleContainer}>
      <View style={styles.ToggleTextContainer}>
        <Text style={styles.ToggleText}>Gender :</Text>
        <Text>{error}</Text>
      </View>
      <View style={[borderStyle, styles.ToggleBtnContainer]}>
        {/* ,{borderColor:ErrorState?'red':'black'} */}
        <TouchableOpacity
          style={[
            styles.MaleContainer,
            {backgroundColor: male ? '#000' : '#fff'},
          ]}
          onPress={() => onPress('M')}>
          <Text style={[styles.Male, {color: male ? '#fff' : '#000'}]}>
            Male
          </Text>
          <Ionicons
            name="male-sharp"
            size={25}
            style={{color: male ? '#fff' : '#000'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.FemaleContainer,
            {backgroundColor: female ? '#000' : '#fff'},
          ]}
          onPress={() => onPress('F')}>
          <Text style={[styles.Female, {color: female ? '#fff' : '#000'}]}>
            Female
          </Text>
          <Ionicons
            name="female-sharp"
            size={25}
            style={{color: female ? '#fff' : '#000'}}
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
    fontFamily: 'Roboto Condensed',
    fontWeight: '400',
    paddingLeft: 10,
    letterSpacing: 1,
  },
  ToggleBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // borderColor:'#2cca13',
    borderWidth: 1,
  },
  MaleContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
  },
  Male: {
    fontFamily: 'Roboto Condensed',
    fontSize: 20,
  },
  FemaleContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Female: {
    fontFamily: 'Roboto Condensed',
    fontSize: 20,
  },
});
