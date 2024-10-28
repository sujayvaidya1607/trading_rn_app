import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  configureFonts,
} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import BottomTabRoutes from './src/Components/Routes/BottomTabRoutes';
import Store from './src/Store/Store';
import Orientation from 'react-native-orientation-locker';

const fontConfig = {
  regular: {
    fontFamily: 'RalewayRegular',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'RalewayMedium',
    fontWeight: 'normal',
  },
  light: {
    fontFamily: 'RalewayLight',
    fontWeight: 'normal',
  },
  thin: {
    fontFamily: 'RalewayThin',
    fontWeight: 'normal',
  },
  bold: {
    fontFamily: 'RalewayBold',
    fontWeight: 'normal',
  },
  bodySmall: {
    fontFamily: 'RalewayRegular',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  labelLarge: {
    fontFamily: 'RalewayBold',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  bodyLarge: {
    fontFamily: 'RalewayBold',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  labelMedium: {
    fontFamily: 'RalewayMedium',
    fontWeight: 'normal',
  },
};

function App() {
  React.useEffect(() => {
    Orientation?.lockToPortrait();
  }, []);

  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <PaperProvider
            theme={{
              ...DefaultTheme,
              fonts: configureFonts({
                config: {ios: fontConfig, android: fontConfig},
                isV3: false,
              }),
            }}>
            <NavigationContainer>
              <BottomTabRoutes />
            </NavigationContainer>
          </PaperProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
