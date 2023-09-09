import {StyleSheet,SafeAreaView} from 'react-native';
import React from 'react';
import Login from './src/screens/LoginScreen/Login';
import Signup from './src/screens/SignupScreen/Signup';
// import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      {/* <Login /> */}
      <Signup />
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
