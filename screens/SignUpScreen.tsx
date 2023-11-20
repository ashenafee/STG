import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function SignUpScreen() {

  const navigation = useNavigation();

  return (
    <View>
      <Text>SignUp Screen</Text>
    </View>
  );
}

export default SignUpScreen;
