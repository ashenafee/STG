import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        style={styles.input}
      />
      <TextInput
        label="Password"
        secureTextEntry
        style={styles.input}
      />
      <Divider style={styles.divider}></Divider>
      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
        <Text>
          Continue with Google
        </Text>
      </Button>
      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
        <Text>
          Continue with Facebook
        </Text>
      </Button>
      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
        <Text>
          Continue with Apple
        </Text>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: Dimensions.get('window').width - 32,
    marginBottom: 16,
  },
  divider: {
    width: Dimensions.get('window').width - 32,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    width: Dimensions.get('window').width - 32,
    marginBottom: 16,
  },
  signupText: {
    marginTop: 16,
  },
});