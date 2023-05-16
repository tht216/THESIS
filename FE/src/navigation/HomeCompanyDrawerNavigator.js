import {routes} from './routes';
import History from '../ui/screens/History';
import {colors} from '../themes/Colors';
import Home from '../ui/screens/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, DrawerLayoutAndroid, Text, Image} from 'react-native';
import Account from '../ui/screens/Account';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeCompany from '../ui/screens/HomeCompany';
const Tab = createBottomTabNavigator();

export default HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={routes.HOMECOMPANY}
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
      {/* <Tab.Screen
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
      /> */}
      <Tab.Screen
        name={routes.HOMECOMPANY}
        component={HomeCompany}
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
      {/* <Tab.Screen
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
      /> */}
    </Tab.Navigator>
  );
};
