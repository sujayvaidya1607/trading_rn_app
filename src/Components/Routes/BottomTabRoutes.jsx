/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  WeeklyInvestmentStackRoutes,
  YearlyInvestmentStackRoutes,
} from './StackRoutes';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RebalancingCalculator from '../Rebalancing_Calculator/RebalancingCalculator';
// import {useSelector} from 'react-redux';
const Tab = createMaterialBottomTabNavigator();

const BottomTabRoutes = () => {
  // const {isFullScreen} = useSelector(state => state.CommonStore);

  return (
    <Tab.Navigator
      initialRouteName="Weekly"
      barStyle={{
        // display: isFullScreen ? 'none' : 'flex',
        backgroundColor: '#000',
        elevation: 5,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.2,
        shadowColor: 'rgba(100, 100, 111, 0.2)',
        shadowOffset: {width: 7, height: 29},
        shadowOpacity: 0.2,
        shadowRadius: 1,
      }}
      activeIndicatorStyle={{
        backgroundColor: 'transparent',
      }}
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Account Tracker') {
            iconName = focused ? 'calendar-week' : 'calendar-day';
          } else if (route.name === 'Backtesting') {
            iconName = focused ? 'calendar-week' : 'calendar-day';
          } else if (route.name === 'Rebalancing') {
            iconName = focused ? 'calendar-week' : 'calendar-day';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={20} color={color} solid />;
        },

        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      activeColor="rgba(255, 192, 0, 0.7)"
      inactiveColor="#bbb">
      <Tab.Screen
        name="Account Tracker"
        component={WeeklyInvestmentStackRoutes}
      />
      <Tab.Screen name="Backtesting" component={YearlyInvestmentStackRoutes} />
      <Tab.Screen name="Rebalancing" component={RebalancingCalculator} />
    </Tab.Navigator>
  );
};
export default BottomTabRoutes;
