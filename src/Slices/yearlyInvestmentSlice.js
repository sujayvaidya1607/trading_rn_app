import {createSlice} from '@reduxjs/toolkit';

const YEARLY_INVESTMENT_INITIAL_STATE = {
  yearlyCalculationResults: {},
  yearlyCalculationFormFields: {},
};

export const yearlyInvestmentSlice = createSlice({
  name: 'yearInvestmentSlice',
  initialState: YEARLY_INVESTMENT_INITIAL_STATE,
  reducers: {
    setYearlyInvestmentResult(state, action) {
      state.yearlyCalculationResults = action.payload;
    },
    setYearlyCalculationFormFields(state, action) {
      state.yearlyCalculationFormFields = action.payload;
    },
  },
});
export const YearlyInvestmentActions = yearlyInvestmentSlice.actions;
export default yearlyInvestmentSlice.reducer;
