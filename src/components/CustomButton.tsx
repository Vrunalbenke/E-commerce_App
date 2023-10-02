import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import color from '../../src/Constants/colors'
import font from '../../src/Constants/fonts'

type CustomButtonProps = {
  onPress?: () => void;
  BtnName: string;
};

const CustomButton = ({
  onPress,
  BtnName,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity style={styles.TOPstyle} onPress={onPress}>
      <Text style={styles.textStyle}>{BtnName}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  TOPstyle: {
    backgroundColor: '#325f88',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: '100%',
  },
  textStyle: {
    color: color.white,
    fontSize: 20,
    fontFamily: font.RobotoCB,
  },
});
