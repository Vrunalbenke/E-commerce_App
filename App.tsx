import {StyleSheet,SafeAreaView, StatusBar} from 'react-native';
import React,{useState} from 'react';

import Navigation from './src/navigation/Navigation';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {

  

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <GestureHandlerRootView style={{flex: 1}}>
          <StatusBar barStyle="light-content" />
          <Navigation />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>

  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  fontTest: {
    fontSize: 30,
    fontFamily: 'Roboto Condensed Light Italic',
  },
});
