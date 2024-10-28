import {combineReducers, configureStore} from '@reduxjs/toolkit';
import weeklyInvestmentReducer from '../Slices/weeklyInvestmentSlice';
import yearlyInvestmentReducer from '../Slices/yearlyInvestmentSlice';
import commonSliceReducer from '../Slices/commonSlice';

const appReducer = combineReducers({
  WeeklyCalculatorStore: weeklyInvestmentReducer,
  YearlyCalculatorStore: yearlyInvestmentReducer,
  CommonStore: commonSliceReducer,
});

const Store = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export default Store;
