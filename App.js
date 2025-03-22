import React from 'react';
import AppNavigator from './app/navigation/AppNavigator';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

// Import Reactotron config if in dev mode
if (__DEV__) {
  require('./ReactotronConfig');
}

export default function App() {
  return <AppNavigator />;
}

// This should be at the end of the file
AppRegistry.registerComponent(appName, () => App);
