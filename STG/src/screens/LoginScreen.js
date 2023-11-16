import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Divider } from 'react-native-paper';

export default function LoginScreen() {
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
      <Button mode="contained" style={styles.button} onPress={() => console.log('Continue with Google')}>
        <Text>
          Continue with Google
        </Text>
      </Button>
      <Button mode="contained" style={styles.button} onPress={() => console.log('Continue with Facebook')}>
        <Text>
          Continue with Facebook
        </Text>
      </Button>
      <Button mode="contained" style={styles.button} onPress={() => console.log('Continue with Apple')}>
        <Text>
          Continue with Apple
        </Text>
      </Button>
      <TouchableOpacity onPress={() => console.log('Sign Up')}>
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