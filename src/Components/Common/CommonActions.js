import {CommonActions} from '../../Slices/commonSlice';

/**
 * Alters the fullscreen status
 * @param {Boolean} payload 
 * 
 */
export const setIsFullScreen = payload => dispatch => {
  dispatch(CommonActions.setIsFullScreen(payload));
};

  /**
   * Function which sends data to webview
   * @param {*} values -graph data
   * @returns 
   */
export const sendGraphDataToWebview = values => {
    return `(function() {
        document.dispatchEvent(new MessageEvent('webview-hwData', {
          data:  ${JSON.stringify({
            type: 'hw-data',
            data: values,
          })}
        })) 
      })()`;
  };