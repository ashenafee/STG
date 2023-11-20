import React from 'react';
import { useState, useCallback } from 'react';
import { AppRegistry, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'

// import { name as appName } from './app.json';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';

import { LoginContext } from './contexts/AppContext';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [loggedOut, setLoggedOut] = useState(true);

  let { height, width } = Dimensions.get('window');
  EStyleSheet.build({
    $rem: width > 340 ? 18 : 16
  });

  const [fontsLoaded, fontError] = useFonts({
    'Kumbh Sans-Bold': require('./assets/fonts/KumbhSans-Bold.ttf'),
    'Kumbh Sans-SemiBold': require('./assets/fonts/KumbhSans-SemiBold.ttf'),
    'Ubuntu-Regular': require('./assets/fonts/Ubuntu-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (fontError) {
    console.log(fontError.message);
  }

  if (!fontsLoaded) {
    console.log("Loading font...");
    return null;
  }

  console.log("Fonts loaded");

  const loginHandler = (loggedIn: boolean) => {
    if (loggedIn) {
      setLoggedOut(false);
    } else {
      setLoggedOut(true);
    }
  }

  return (
      <NavigationContainer onReady={onLayoutRootView}>
        <LoginContext.Provider value={loginHandler}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {loggedOut ? (
              <>
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              </>
            ) :
              (
                <>
                  <Stack.Screen name="HomeScreen" component={HomeScreen} />
                </>
              )}
          </Stack.Navigator>
        </LoginContext.Provider>
      </NavigationContainer>
  );
}

// AppRegistry.registerComponent(appName, () => App);
