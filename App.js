import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 import AppNavigator from './src/navigation/AppNavigator';

 export default function App() {
  return (
  <SafeAreaProvider>
  <AppNavigator />
  </SafeAreaProvider>
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
