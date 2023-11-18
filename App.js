// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
const App = () => (
  <NavigationContainer>
    <LoginScreen />
  </NavigationContainer>
);

export default App;