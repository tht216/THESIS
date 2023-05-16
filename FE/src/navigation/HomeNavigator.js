import 'react-native-gesture-handler';

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {routes} from './routes';
import {View, DrawerLayoutAndroid, Text} from 'react-native';
import {colors} from '../themes/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
// import HomeStackNavigator from './HomeStackNavigator';
import Account from '../ui/screens/Account';
import History from '../ui/screens/History';
import Home from '../ui/screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CurrentLocation from '../ui/screens/CurrentLocation';
import ChooseAmount from '../ui/screens/ChooseAmount';
import Location from '../ui/screens/Location';
import Company from '../ui/screens/Company';
import Checkout from '../ui/screens/Checkout';
import {DrawerContent} from './DrawerContent';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeDrawerNavigator from './HomeDrawerNavigator';
// import MarketNavigator from './MarketNavigator';
// import ProfileNavigator from './ProfileNavigator';
const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      contentStyle: {backgroundColor: 'white'},
    }}>
    <Stack.Screen
      name={routes.HOMETAB}
      options={{headerShown: false}}
      component={HomeDrawerNavigator}
    />
    <Stack.Screen
      name={routes.CURRENTLOCATION}
      options={{headerShown: false}}
      component={CurrentLocation}
    />
    <Stack.Screen
      name={routes.AMOUNT}
      options={{headerShown: false}}
      component={ChooseAmount}
    />
    <Stack.Screen
      name={routes.LOCATION}
      options={{headerShown: false}}
      component={Location}
    />
    <Stack.Screen
      name={routes.COMPANY}
      options={{headerShown: false}}
      component={Company}
    />
    <Stack.Screen
      name={routes.CHECKOUT}
      options={{headerShown: false}}
      component={Checkout}
    />
  </Stack.Navigator>
);


export default HomeNavigator;
