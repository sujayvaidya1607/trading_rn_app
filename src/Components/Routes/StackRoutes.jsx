import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import WeeklyInvestmentCalculatorForm from '../Weekly_Calculator/WeeklyInvestmentCalculatorForm';
import WeeklyCalculatorResult from '../Weekly_Calculator/WeeklyCalculatorResult';
import YearlyInvestmentCalculatorForm from '../Yearly_Calculator/YearlyInvestmentCalculatorForm';
import YearlyCalculatorResult from '../Yearly_Calculator/YearlyCalculatorResult';
import routeNames from './routeNames';

const Stack = createNativeStackNavigator();

export const WeeklyInvestmentStackRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={routeNames.WEEKLY_CALCULATOR_FORM}
        component={WeeklyInvestmentCalculatorForm}
      />
      <Stack.Screen
        name={routeNames.WEEKLY_CALCULATOR_RESULT}
        component={WeeklyCalculatorResult}
      />
    </Stack.Navigator>
  );
};
export const YearlyInvestmentStackRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={routeNames.YEARLY_CALCULATOR_FORM}
        component={YearlyInvestmentCalculatorForm}
      />
      <Stack.Screen
        name={routeNames.YEARLY_CALCULATOR_RESULT}
        component={YearlyCalculatorResult}
      />
    </Stack.Navigator>
  );
};
