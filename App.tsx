import {StyleSheet,SafeAreaView} from 'react-native';
import React from 'react';
import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';


const App = () => {
  return (
    // <SafeAreaView style={styles.root}>
    //   {/* <Login /> */}
    //   {/* <Signup /> */}
    // </SafeAreaView>
    <Navigation />
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
