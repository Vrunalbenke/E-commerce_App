import {StyleSheet,SafeAreaView} from 'react-native';
import React,{useState} from 'react';
import Navigation from './src/navigation/Navigation';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {

  

  return (
    // <SafeAreaView style={styles.root}>
    //   {/* <Login /> */}
    //   {/* <Signup /> */}
    // </SafeAreaView>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Navigation/>
      </PersistGate>
    </Provider>

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
