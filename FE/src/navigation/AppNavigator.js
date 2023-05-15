import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import IsCompleteNavigator from './IsCompleteNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const isLogin = useSelector(selector => selector.userReduce.isLogin);
  const isDone = useSelector(selector => selector.pickupSlice.isDone);

  return (
    <NavigationContainer>
      {isDone ? (
        <IsCompleteNavigator />
      ) : isLogin ? (
        <HomeNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
