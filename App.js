// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import homepage from './homepage';
import PMPage from './PMPage';
import BottomTabNavigator from './BottomTabNavigator';
import BookRoomPage from './BookRoomPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BookRoomPage">
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={homepage} // Use a WebView component for home.html
          options={{ headerShown: false }}
        />

    <Stack.Screen
          name="PMPage"
          component={PMPage} // Use a WebView component for home.html
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="BottomTabNav"
          component={BottomTabNavigator} // Use a WebView component for home.html
          options={{ headerShown: false }}
        />

      <Stack.Screen
          name="BookRoomPage"
          component={BookRoomPage} // Use a WebView component for home.html
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
