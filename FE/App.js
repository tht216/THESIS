import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './store';
import FlashMessage from 'react-native-flash-message';
import {enableLatestRenderer} from 'react-native-maps';

export default function App() {

enableLatestRenderer();
  return (
    <Provider store={store}>
        <AppNavigator />
        <FlashMessage position="top" />
    </Provider>
  );
}
