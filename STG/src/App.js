import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';


export default function App() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* This is temporary... */}
      <Text>Welcome to See The Good (STG) - our CSC318 project!</Text>
      <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
        Begin Walkthrough
      </Button>
      <StatusBar style="auto" />
    </View>
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