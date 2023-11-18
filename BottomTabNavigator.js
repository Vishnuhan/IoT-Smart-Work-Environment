// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PMPage from './PMPage'; // Import your PMPage component
import BookRoomPage from './BookRoomPage'; // Import your BookRoomPage component
import AccountPage from './AccountPage'; // Import your AccountPage component

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="PM" component={PMPage} />
    <Tab.Screen name="Book Room" component={BookRoomPage} />
    <Tab.Screen name="Account" component={AccountPage} />
  </Tab.Navigator>
);

export default BottomTabNavigator;
