import React from 'react';
import { useState } from 'react';
import { StyleSheet, AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

// import { name as appName } from './app.json';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';

import { LoginContext } from './contexts/AppContext';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const Stack = createNativeStackNavigator();


export default function App() {

  const [loggedOut, setLoggedOut] = useState(true);

  const loginHandler = (loggedIn: boolean) => {
    if (loggedIn) {
      setLoggedOut(false);
    } else {
      setLoggedOut(true);
    }
  }

  return (
    <NavigationContainer>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
