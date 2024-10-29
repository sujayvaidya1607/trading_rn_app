import {createSlice} from '@reduxjs/toolkit';

const COMMON_INITIAL_STATE = {
  isFullScreen: false,
};

export const commonSlice = createSlice({
  name: 'commonSlice',
  initialState: COMMON_INITIAL_STATE,
  reducers: {
    setIsFullScreen(state, action) {
      state.isFullScreen = action.payload;
    },
  },
});
export const CommonActions = commonSlice.actions;
export default commonSlice.reducer;
