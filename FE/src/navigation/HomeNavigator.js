import 'react-native-gesture-handler';

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {routes} from './routes';
import {View} from 'react-native';
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
// import MarketNavigator from './MarketNavigator';
// import ProfileNavigator from './ProfileNavigator';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      contentStyle: {backgroundColor: 'white'},
    }}>
    <Stack.Screen
      name={routes.HOMETAB}
      options={{headerShown: false}}
      component={HomeTabs}
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
const HomeTabs = () => {
  return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            marginBottom: 20,
            borderRadius: 50,
            marginHorizontal: 20,
            backgroundColor: colors.ORANGE,
            height: 70,
          },
        })}>
        <Tab.Screen
          name={routes.HOME}
          component={Home}
          options={{
            tabBarIcon: ({color, size, focused}) =>
              focused ? (
                <View
                  style={{
                    alignItems: 'center',
                    borderRadius: 50,
                    padding: 10,
                    backgroundColor: colors.WHITE,
                  }}>
                  <Icon name="ios-home" color={colors.ORANGE} size={size} />
                </View>
              ) : (
                <Icon
                  name="ios-home-outline"
                  color={colors.WHITE}
                  size={30}
                  strokeWidth={2}
                />
              ),
          }}
        />
        <Tab.Screen
          name={routes.HISTORY}
          component={History}
          options={{
            tabBarIcon: ({color, size, focused}) =>
              focused ? (
                <View
                  style={{
                    alignItems: 'center',
                    borderRadius: 50,
                    padding: 10,
                    backgroundColor: colors.WHITE,
                  }}>
                  <Icon name="time" color={colors.ORANGE} size={size} />
                </View>
              ) : (
                <Icon
                  name="time-outline"
                  color={colors.WHITE}
                  size={30}
                  strokeWidth={2}
                />
              ),
          }}
        />
        <Tab.Screen
          name={routes.ACCOUNT}
          component={Account}
          options={{
            tabBarIcon: ({color, size, focused}) =>
              focused ? (
                <View
                  style={{
                    alignItems: 'center',
                    borderRadius: 50,
                    padding: 10,
                    backgroundColor: colors.WHITE,
                  }}>
                  <Icon name="person" color={colors.ORANGE} size={size} />
                </View>
              ) : (
                <Icon
                  name="person-outline"
                  color={colors.WHITE}
                  size={30}
                  strokeWidth={2}
                />
              ),
          }}
        />
      </Tab.Navigator>
  );
};


export default HomeNavigator;
