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
    backgroundColor: '#000',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: '95%',
  },
  textStyle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto Condensed Bold',
  },
});
