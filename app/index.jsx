import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  configureFonts,
} from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import BottomTabRoutes from "../src/Components/Routes/BottomTabRoutes";
import Store from "../src/Store/Store";
import * as ScreenOrientation from "expo-screen-orientation";
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";

const fontConfig = {
  regular: {
    fontFamily: "RalewayRegular",
    fontWeight: "normal",
  },
  medium: {
    fontFamily: "RalewayMedium",
    fontWeight: "normal",
  },
  light: {
    fontFamily: "RalewayLight",
    fontWeight: "normal",
  },
  thin: {
    fontFamily: "RalewayThin",
    fontWeight: "normal",
  },
  bold: {
    fontFamily: "RalewayBold",
    fontWeight: "normal",
  },
  bodySmall: {
    fontFamily: "RalewayRegular",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  labelLarge: {
    fontFamily: "RalewayBold",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  bodyLarge: {
    fontFamily: "RalewayBold",
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  labelMedium: {
    fontFamily: "RalewayMedium",
    fontWeight: "normal",
  },
};

export default function Page() {
  const [loaded] = useFonts({
    RalewayBold: require("../assets/fonts/RalewayBold.ttf"),
    RalewayItalic: require("../assets/fonts/RalewayItalic.ttf"),
    RalewayBoldItalic: require("../assets/fonts/RalewayBoldItalic.ttf"),
    RalewayRegular: require("../assets/fonts/RalewayRegular.ttf"),
    RalewayThin: require("../assets/fonts/RalewayThin.ttf"),
    RalewayMedium: require("../assets/fonts/RalewayMedium.ttf"),
    RalewayLight: require("../assets/fonts/RalewayLight.ttf"),
    bodySmall: require("../assets/fonts/RalewayRegular.ttf"),
    labelLarge: require("../assets/fonts/RalewayBold.ttf"),
    bodyLarge: require("../assets/fonts/RalewayBold.ttf"),
    labelMedium: require("../assets/fonts/RalewayBold.ttf"),
  });

  const fontConfig = {
    regular: {
      fontFamily: "RalewayRegular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "RalewayMedium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "RalewayLight",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "RalewayThin",
      fontWeight: "normal",
    },
    bold: {
      fontFamily: "RalewayBold",
      fontWeight: "normal",
    },
    bodySmall: {
      fontFamily: "RalewayRegular",
      fontSize: 12,
      fontWeight: "400",
      letterSpacing: 0.4,
      lineHeight: 16,
    },
    labelLarge: {
      fontFamily: "RalewayBold",
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
    bodyLarge: {
      fontFamily: "RalewayBold",
      fontSize: 16,
      fontWeight: "400",
      letterSpacing: 0.15,
      lineHeight: 24,
    },
    labelMedium: {
      fontFamily: "RalewayMedium",
      fontWeight: "normal",
    },
  };

  React.useEffect(() => {
    // Lock the orientation to default mode
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
  }, []);
  if (!loaded) return null;
  return (
    <Provider store={Store}>
      <SafeAreaProvider  >
        <GestureHandlerRootView >
          <PaperProvider
            theme={{
              ...DefaultTheme,
              fonts: configureFonts({
                config: { ios: fontConfig, android: fontConfig },
                isV3: false,
              }),
            }}
          >
            <SafeAreaView style={{flex : 1}} >
              <BottomTabRoutes />
            </SafeAreaView>
          </PaperProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
