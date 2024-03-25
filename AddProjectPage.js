import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const AddProject = () => {
  const [projectName, setProjectName] = useState('');
  const [percentageComplete, setPercentageComplete] = useState('');
  const [team, setTeam] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notification, setNotification] = useState({ visible: false, message: '', theme: 'light' });

  const showNotification = (message, theme = 'light') => {
    setNotification({ visible: true, message, theme });
    setTimeout(() => {
      setNotification({ visible: false, message: '', theme: 'light' });
    }, 3000); // hide after 3 seconds
  };

  const handleAddProject = async () => {
    if (!projectName || !percentageComplete || !team || !dueDate) {
      showNotification('TextFields cannot be empty', 'red');
      return;
    }

    try {
      const teamArray = team.split(',').map(item => item.trim());
      const projectData = {
        Name: projectName,
        Percentage_Complete: parseFloat(percentageComplete),
        Due_Date: dueDate,
        Team: teamArray,
      };

      await axios.post('http://localhost:3001/auth/projects', projectData);
      showNotification('Project successfully added!', 'green');
    } catch (error) {
      showNotification('Project was not added!', 'red');
    }
  };

  return (
    <View style={styles.container}>
      {notification.visible && (
        <View style={[styles.notification, { backgroundColor: notification.theme === 'red' ? '#FFCCCC' : '#CCFFCC' }]}>
          <Text style={styles.notificationText}>{notification.message}</Text>
          <TouchableOpacity onPress={() => setNotification({ visible: false, message: '', theme: 'light' })}>
            <Text style={styles.closeButton}>X</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.title}>Add New Project</Text>
      <TextInput
        style={styles.input}
        placeholder="Project Name"
        value={projectName}
        onChangeText={setProjectName}
      />
      <TextInput
        style={styles.input}
        placeholder="Percentage Complete"
        keyboardType="numeric"
        value={percentageComplete}
        onChangeText={setPercentageComplete}
      />
      <TextInput
        style={styles.input}
        placeholder="Team (Comma-separated)"
        value={team}
        onChangeText={setTeam}
      />
      <TextInput
        style={styles.input}
        placeholder="Due Date"
        value={dueDate}
        onChangeText={setDueDate}
      />
      <Button title="Add Project" onPress={handleAddProject} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  notification: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    zIndex: 1000,
  },
  notificationText: {
    color: '#000',
  },
  closeButton: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default AddProject;
