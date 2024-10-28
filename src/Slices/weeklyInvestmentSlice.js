import {createSlice} from '@reduxjs/toolkit';

const WEEKLY_INVESTMENT_INITIAL_STATE = {
  weeklyCalculationResults: {},
  weeklyCalculationFormFields: {},
};

export const weeklyInvestmentSlice = createSlice({
  name: 'weeklyInvestmentSlice',
  initialState: WEEKLY_INVESTMENT_INITIAL_STATE,
  reducers: {
    setWeeklyInvestmentResult(state, action) {
      state.weeklyCalculationResults = action.payload;
    },
    setWeeklyCalculationFormFields(state, action) {
      state.weeklyCalculationFormFields = action.payload;
    },
  },
});
export const WeeklyInvestmentActions = weeklyInvestmentSlice.actions;
export default weeklyInvestmentSlice.reducer;
