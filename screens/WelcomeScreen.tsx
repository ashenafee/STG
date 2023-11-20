import React from 'react';
import { Button, Text } from 'react-native-paper';
import { Dimensions, StyleSheet, View } from 'react-native';

function WelcomeScreen({ navigation }) {
  return (
      <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Button mode="contained" style={styles.button} onPress={()=>navigation.navigate('LoginScreen')}>
              Log In
          </Button>
          <Button mode="contained" style={styles.button} onPress={()=>navigation.navigate('SignUpScreen')}>
              Sign Up
          </Button>
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
  welcomeText: {
      fontSize: 24,
      marginBottom: 16,
  },
  button: {
      width: Dimensions.get('window').width - 32,
      marginBottom: 16,
  },
});

export default WelcomeScreen;
