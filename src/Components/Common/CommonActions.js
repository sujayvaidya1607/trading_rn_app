import {CommonActions} from '../../Slices/commonSlice';

export const setIsFullScreen = payload => dispatch => {
  dispatch(CommonActions.setIsFullScreen(payload));
};
