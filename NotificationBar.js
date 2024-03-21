import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddNotification from './AddNotification';
import { useNavigation } from '@react-navigation/native';


const NotificationBar = ({ route }) => {
  const [notifications, setNotifications] = useState([]);
  const { employeeId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/auth/notifications?employeeID=${employeeId}`);
        setNotifications(response.data); // Assuming the response data is an array of notification objects
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [employeeId]);

  const markAsRead = async (notificationTitle) => {
    try {
      await axios.patch(`http://localhost:3001/auth/notifications/read?title=${notificationTitle}&employeeID=${employeeId}`);
      // Immediately reflect the change in the UI
      setNotifications(notifications.map(n => 
        n.title === notificationTitle && !n.readBy.includes(employeeId) 
        ? { ...n, readBy: [...n.readBy, employeeId] } 
        : n
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  const deleteNotification = async (notificationTitle) => {
    try {
      await axios.delete(`http://localhost:3001/auth/notifications/delete?title=${notificationTitle}`);
      // Immediately reflect the change in the UI
      setNotifications(notifications.filter(n => n.title !== notificationTitle));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <TouchableOpacity onPress={() => navigation.navigate('AddNotification')} style={{ alignSelf: 'flex-end', marginTop: -5 }}>
        <Icon name="add-alert" size={30} color="#3498db" style={{ marginRight: 10, marginTop: -30, marginBottom: 5 }} />
      </TouchableOpacity>
      {notifications.map((notification, index) => (
  <View 
    key={index} 
    style={[
      styles.card, 
      notification.readBy.includes(employeeId) ? styles.cardRead : styles.cardUnread
    ]}
  >
    <View style={styles.titleRow}>
      <Text style={styles.cardTitle}>{notification.title}</Text>
      <TouchableOpacity 
        onPress={() => deleteNotification(notification.title)} 
        style={styles.deleteButton}
      >
        <Icon name="delete" size={24} color="#f00" />
      </TouchableOpacity>
    </View>
    <Text style={styles.cardMessage}>{notification.message}</Text>
    <Text style={styles.cardTime}>{new Date(notification.createdAt).toLocaleString()}</Text>
    <TouchableOpacity onPress={() => markAsRead(notification.title)} style={styles.markAsReadButton}>
      <Text style={styles.markAsReadButtonText}>Mark as Read</Text>
    </TouchableOpacity>
  </View>
))}

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardUnread: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardMessage: {
    fontSize: 14,
  },
  cardTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  markAsReadButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  markAsReadButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  cardRead: {
    opacity: 0.5, // Or use backgroundColor to dim the card
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This spreads out the title and the delete button on both ends
    alignItems: 'center', // This centers them vertically in case they have different heights
    width: '100%', // Ensure the row takes up the full width of the card
  },
  deleteButton: {
    // You might want to adjust padding or margin based on your layout needs
    padding: 5,
    marginLeft: 10, // Add some space between the title and the button if needed
  },
});

export default NotificationBar;
