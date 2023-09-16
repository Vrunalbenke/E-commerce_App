import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardTypeOptions,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

type CustomInputFieldProps = {
  // style : React.CSSProperties
  label: string;
  placeholder: string;
  secureTextEntry: boolean;
  icon:boolean;
  error?: string;
  onFocus?: () => void;
  onChangeText?: (text:string,input:string) => void;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
};

const CustomInputField = ({
  label,
  placeholder,
  secureTextEntry,
  error,
  keyboardType,
  maxLength,
  icon,
  // ...props
  onFocus,
  onChangeText
}: CustomInputFieldProps) => {
  const [hidepass, setHidePass] = useState(true);

  function IconToggle() {
    setHidePass(!hidepass)
  }

  return (
    <View style={styles.MainContainer}>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={styles.TinpIconStyle}>
        <TextInput
          style={styles.textInputStyle}
          secureTextEntry={!hidepass ? !secureTextEntry : secureTextEntry}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          // {...props}
          onChangeText={onChangeText}
          onFocus={onFocus}
        />

        {icon && <TouchableOpacity style={styles.IconContainer} onPress={IconToggle}>
          <Ionicons name={hidepass?'eye-off':'eye'} style={styles.Icon} />
        </TouchableOpacity>}
      </View>
      {error && 
          <Text
            style={[styles.ValidationText]}>
            {error}
          </Text>
      }
    </View>
  );
};

export default CustomInputField;

const styles = StyleSheet.create({
  MainContainer: {
    // backgroundColor:'yellow',
    marginBottom: 10,
  },
  labelStyle: {
    fontSize: 20,
    fontFamily: 'Roboto Condensed',
    fontWeight: '400',
    paddingLeft: 10,
    letterSpacing: 1,
  },
  textInputStyle: {
    fontSize: 18,
    fontFamily: 'Roboto Condensed',
    borderRadius: 10,
    paddingLeft: 10,
    // marginBottom: 15,
    height: 30,
    width: '85%',
  },
  TinpIconStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#b1afaf',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
    width: '100%',
    // backgroundColor:'lightblue'
  },
  ValidationText: {
    color: '#f40606',
    fontSize: 16,
    // fontFamily:'Roboto Condensed',
    alignSelf: 'center',
  },
  IconContainer: {
    // backgroundColor:'yellow',
    height: 35,
  },
  Icon: {
    fontSize: 25,
  },
});
