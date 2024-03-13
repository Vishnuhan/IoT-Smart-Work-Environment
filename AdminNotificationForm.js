import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Picker } from 'react-native';
import axios from 'axios'; // For API requests

const AdminNotificationForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [employees, setEmployees] = useState([]); // List of all employees

  useEffect(() => {
    const fetchEmployees = async () => {
      // Fetch employee list from your backend
      try {
        const response = await axios.get('http://your-backend.com/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSendNotification = async () => {
    // Send the notification
    try {
      await axios.post('http://your-backend.com/notifications/custom', {
        title,
        message,
        recipients
      });
      // Reset form, handle success
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
      />
      <Text>Select Recipients:</Text>
      {employees.map(employee => (
        <Picker
          key={employee.id}
          selectedValue={recipients}
          onValueChange={(itemValue) => setRecipients([...recipients, itemValue])}
        >
          {employees.map((employee) => (
            <Picker.Item key={employee.id} label={employee.name} value={employee.id} />
          ))}
        </Picker>
      ))}
      <Button
        title="Send Notification"
        onPress={handleSendNotification}
      />
    </View>
  );
};

export default AdminNotificationForm;
