import React from 'react';
import { useState, useCallback } from 'react';
import { Dimensions, StatusBar, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';

import { LoginContext } from './contexts/AppContext';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';

import type { ImageSourcePropType } from 'react-native'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

function MainAppContainer() {
  const screenOptions:BottomTabNavigationOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: EStyleSheet.value('$pageBackgroundColor'),
      height: '10.57%',
      borderTopWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
    },
  }

  const tabBarIcon = (imageSource: ImageSourcePropType, focused: boolean) => {
    return (
      <View style={styles.tabBarIconContainer}>
      <Image source={imageSource} style={[styles.tabBarIcon, {tintColor: focused ? '#C2D1D9' : '#9A9A9A'}]}/>
        <View style={[styles.tabBarFocusedDot, {backgroundColor: focused ? '#C2D1D9' : 'transparent'}]}/>
        </View>
    );
};

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="HomeScreen"
        component={HomeScreen}
        options={{tabBarIcon: ({focused}) => tabBarIcon(require('./assets/tab_bar/home_icon.png'), focused)}}/>
        <Tab.Screen name="HistoryScreen"
        component={HistoryScreen}
        options={{tabBarIcon: ({focused}) => tabBarIcon(require('./assets/tab_bar/book_icon.png'), focused)}}/>
        <Tab.Screen name="NotificationsScreen"
        component={NotificationsScreen}
        options={{tabBarIcon: ({focused}) => tabBarIcon(require('./assets/tab_bar/notifs_icon.png'), focused)}}/>
        <Tab.Screen name="ProfileScreen"
        component={ProfileScreen}
        options={{tabBarIcon: ({focused}) => tabBarIcon(require('./assets/tab_bar/profile_icon.png'), focused)}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}


function App() {
  const [loggedOut, setLoggedOut] = useState(true);

  let { height, width } = Dimensions.get('window');
  EStyleSheet.build({
    $rem: width > 340 ? 18 : 16,
    $pageBackgroundColor: '#FCFAF8',
    $emphTextColor: '#D31823',
    $textColor: 'black',
  });

  const [fontsLoaded, fontError] = useFonts({
    'Kumbh Sans-Light': require('./assets/fonts/KumbhSans-Light.ttf'),
    'Kumbh Sans-Bold': require('./assets/fonts/KumbhSans-Bold.ttf'),
    'Kumbh Sans-SemiBold': require('./assets/fonts/KumbhSans-SemiBold.ttf'),
    'Ubuntu-Regular': require('./assets/fonts/Ubuntu-Regular.ttf'),
    'Ubuntu-RegularItalic': require('./assets/fonts/Ubuntu-Italic.ttf'),
    'Ubuntu-Light': require('./assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu-LightItalic': require('./assets/fonts/Ubuntu-LightItalic.ttf'),
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
    setLoggedOut(!loggedIn);
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <StatusBar backgroundColor={EStyleSheet.value('$pageBackgroundColor')} barStyle='dark-content' />
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
              <Stack.Screen name="MainApp" component={MainAppContainer} />
            )}
        </Stack.Navigator>
      </LoginContext.Provider>
    </NavigationContainer>
  );
}

const styles = EStyleSheet.create({
  tabBarIconContainer: {
  height: '100%',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  },
  tabBarIcon: {
    height: '45%',
    width: undefined,
    aspectRatio: 1,
  },
  tabBarFocusedDot: {
    height: '0.375rem',
    width: '0.375rem',
    borderRadius: 50,
    marginTop: '1%',
  }
});

export default App;
