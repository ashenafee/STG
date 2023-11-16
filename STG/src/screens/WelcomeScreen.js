import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function WelcomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Button mode="contained" style={styles.button} onPress={() => console.log('Log In')}>
                Log In
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => console.log('Sign Up')}>
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