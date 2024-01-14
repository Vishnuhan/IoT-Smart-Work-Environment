// TopTabNavigator.js
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomePage from './homepage';

const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = () => (
  <TopTab.Navigator
    tabBarOptions={{
      activeTintColor: '#3498db',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      style: {
        backgroundColor: '#f2f2f2',
      },
    }}
  >
    <TopTab.Screen
      name="Home"
      component={HomePage}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
      }}
    />
  </TopTab.Navigator>
);

export default TopTabNavigator;
