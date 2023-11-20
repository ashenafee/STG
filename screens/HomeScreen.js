import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, BottomNavigation } from 'react-native-paper';
import { useContext } from 'react';

import { LoginContext } from '../contexts/AppContext';


const HomeRoute = () => <Text>Home</Text>;
const ActivityRoute = () => <Text>Activity</Text>;
const NotificationsRoute = () => <Text>Notifications</Text>;
const AccountRoute = () => <Text>Account</Text>;

export default function HomeScreen() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'activity', title: 'Activity', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
    { key: 'account', title: 'Account', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
  ]);

  const loginHandler = useContext(LoginContext);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    activity: ActivityRoute,
    notifications: NotificationsRoute,
    account: AccountRoute,
  });

  const handleLogOut = () => {
    loginHandler(false);
  }

  return (
    <>
      <Button onPress={handleLogOut}>
        <Text>
            Log out
          </Text>
      </Button>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});