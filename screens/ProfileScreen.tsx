import React from 'react';
import { Text, } from 'react-native';
import { Button } from 'react-native-paper';
import { useContext } from 'react';

import { LoginContext } from '../contexts/AppContext';
import EStyleSheet from 'react-native-extended-stylesheet';

function ProfileScreen() {
  const loginHandler = useContext(LoginContext);

  return (
      <Button onPress={() => loginHandler(false)}>
        <Text>
            Log out
          </Text>
      </Button>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$pageBackgroundColor',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
