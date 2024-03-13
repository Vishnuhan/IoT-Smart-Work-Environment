import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios'; // For API requests

const NotificationBar = ({ employeeId }) => {
  const [notifications, setNotifications] = useState([]);
  console.log("we are in the notifications &" + employeeID)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Adjust the URL as necessary
        const response = await axios.get(`http://localhost:3001/notifications?employeeID=${employeeId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [employeeID]);

  const markAsRead = async (notificationId) => {
    try {
      // Adjust the URL as necessary
      await axios.patch(`http://localhost:3001/notifications/${notificationId}/read`);
      setNotifications(notifications.map(n => n.id === notificationId ? { ...n, readBy: [...n.readBy, employeeID] } : n));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <View>
      {notifications.map(notification => (
        <TouchableOpacity key={notification.id} onPress={() => markAsRead(notification.id)}>
          <Text>{notification.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NotificationBar;
