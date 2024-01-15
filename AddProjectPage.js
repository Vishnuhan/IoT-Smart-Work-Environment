import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AddProject = () => {
  const [projectName, setProjectName] = useState('');
  const [percentageComplete, setPercentageComplete] = useState('');
  const [team, setTeam] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState('');

  const handleAddProject = async () => {
    try {
      // Parse team and tasks as arrays
      const teamArray = team.split(',').map(item => item.trim());
      const tasksArray = tasks.split(',').map(item => item.trim());

      // Perform the logic to add a project (e.g., make an API call)
      const projectData = {
        Name: projectName,
        Percentage_Complete: parseFloat(percentageComplete), // Convert to number
        Team: teamArray,
        Due_Date: dueDate,
        Tasks: tasksArray,
      };

      console.log('About to enter API');
      const response = await axios.post('http://localhost:3001/auth/projects', projectData);
      console.log('Entered API');

      // For simplicity, we'll just log the project details for now
      console.log('New Project Added:', projectData);
    } catch (error) {
      console.error('Error adding project:', error);
    }

    // You may want to navigate back to the PMPage or perform other actions
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Project</Text>
      <TextInput
        style={styles.input}
        placeholder="Project Name"
        value={projectName}
        onChangeText={(text) => setProjectName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Percentage Complete"
        keyboardType="numeric"
        value={percentageComplete}
        onChangeText={(text) => setPercentageComplete(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Team (Comma-separated)"
        value={team}
        onChangeText={(text) => setTeam(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Due Date"
        value={dueDate}
        onChangeText={(text) => setDueDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tasks (Comma-separated)"
        value={tasks}
        onChangeText={(text) => setTasks(text)}
      />
      <Button title="Add Project" onPress={handleAddProject} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#3498db',
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default AddProject;
