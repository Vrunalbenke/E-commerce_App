import {StyleSheet, Text, View,SafeAreaView} from 'react-native';
import React from 'react';
import CustomInputField from './src/components/CustomInputField';
import Login from './src/screens/LoginScreen/Login';
// import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Login />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // justifyContent:'center',
    // alignItems:'center'
  },
  fontTest: {
    fontSize: 30,
    fontFamily: 'Roboto Condensed Light Italic',
  },
});
