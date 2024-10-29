import React from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
// import Orientation from 'react-native-orientation-locker';
import {useDispatch, useSelector} from 'react-redux';
import {setIsFullScreen} from './CommonActions';
import {useNavigation} from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

const WebViewGraphComponent = ({graphRef, onLoad}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {isFullScreen} = useSelector(state => state.CommonStore);
  const hideTabBar = () => {
    navigation.setOptions({
      tabBarStyle: {display: 'none'},
    });
  };
  const showTabBar = () => {
    navigation.setOptions({
      tabBarStyle: {display: 'flex'},
    });
  };
  const sendGraphDataToWebview = values => {
    return `(function() {
        document.dispatchEvent(new MessageEvent('webview-hwData', {
          data:  ${JSON.stringify({
            type: 'hw-data',
            data: values,
          })}
        })) 
      })()`;
  };
  const handleMessage = event => {
    const message = event.nativeEvent.data;

    if (message === 'TOGGLE_FULLSCREEN') {
      if (isFullScreen) {
        // Exit full screen

        dispatch(setIsFullScreen(false));
        // Orientation?.lockToPortrait();
        if(Platform.OS === 'ios' ){
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
        } else {
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

        }
        graphRef.current.injectJavaScript(
          sendGraphDataToWebview({
            height: 250,
            width: 380,
          }),
        );
        hideTabBar();
      } else {
        // Enter full screen
        dispatch(setIsFullScreen(true));
        showTabBar();
        // Orientation?.lockToLandscape();
        
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        setTimeout(() => {
          graphRef.current.injectJavaScript(
            sendGraphDataToWebview({
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }),
          );
        }, 100);
      }
    }
  };
  return (
    <WebView
      ref={graphRef}
      source={{
        uri: 'https://4d06-2409-40c2-1043-5878-4333-8347-b834-3342.ngrok-free.app',
      }}
      // style={{flex: 2, marginTop: 0}}
      style={[styles.webView, isFullScreen ? styles.fullScreen : {}]}
      onMessage={handleMessage}
      onLoad={onLoad}
      domStorageEnabled={true}
      cacheEnabled={true}
      cacheMode="LOAD_NO_CACHE"
      scrollEnabled={true}
      nestedScrollEnabled={true}
      injectedJavaScriptBeforeContentLoadedForMainFrameOnly={false}
      bounces={false}
      contentInsetAdjustmentBehavior={'always'}
      overScrollMode={'content'}
      sharedCookiesEnabled={true}
      limitsNavigationsToAppBoundDomains={true}
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false}
      originWhitelist={['*', 'https://*', 'http://*', 'file://*', 'sms://*']}
      // userAgent='Mozilla/5.0 (Linux; Win64; x64; rv:46.0)r Gecko/20100101 Firefox/68.0'
      userAgent={
        Platform.OS === 'android'
          ? 'Chrome/18.0.1025.133 Mobile Safari/535.19'
          : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'
      }
      startInLoadingState={true}
    />
  );
};

export default WebViewGraphComponent;

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#000',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').height,
    height: Dimensions.get('window').width,
    zIndex: 999,
  },
});

/**
 * Webview commented code
 * <WebView
                    ref={graphRef}
                    source={{
                      uri: 'https://beb5-103-200-106-19.ngrok-free.app',
                    }}
                    style={{flex: 2, marginTop: 0}}
                    //  onMessage={_ => {}}
                    onLoad={}
                    domStorageEnabled={true}
                    cacheEnabled={true}
                    cacheMode="LOAD_NO_CACHE"
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    injectedJavaScriptBeforeContentLoadedForMainFrameOnly={
                      false
                    }
                    bounces={false}
                    contentInsetAdjustmentBehavior={'always'}
                    overScrollMode={'content'}
                    sharedCookiesEnabled={true}
                    limitsNavigationsToAppBoundDomains={true}
                    allowsInlineMediaPlayback={true}
                    mediaPlaybackRequiresUserAction={false}
                    originWhitelist={[
                      '*',
                      'https://*',
                      'http://*',
                      'file://*',
                      'sms://*',
                    ]}
                    // userAgent='Mozilla/5.0 (Linux; Win64; x64; rv:46.0)r Gecko/20100101 Firefox/68.0'
                    userAgent={
                      Platform.OS === 'android'
                        ? 'Chrome/18.0.1025.133 Mobile Safari/535.19'
                        : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'
                    }
                    startInLoadingState={true}
                  />
 */
