import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

import Navigator from './routes/mainnavigation'

const App = () => {
  return (
    <Navigator />
  );
};

export default App;