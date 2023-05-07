import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './store';
import FlashMessage from 'react-native-flash-message';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
export default function App() {
  return (
    <Provider store={store}>
        <AppNavigator />
        <FlashMessage position="top" />
    </Provider>
  );
}
