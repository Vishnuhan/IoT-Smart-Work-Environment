import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icons from react-native-vector-icons
import PMPage from './PMPage';
import BookRoomPage from './BookRoomPage';
import AccountPage from './AccountPage';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ route }) => {
  const { employeeId } = route.params;

  console.log("Employee ID:", employeeId);

  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="PM Tracking"
        component={PMPage}
        initialParams={{ employeeId: employeeId }} // Pass employeeId as initial param to PMPage
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="track-changes" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Book a Room"
        component={BookRoomPage}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="event-available" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountPage}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="account-circle" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
