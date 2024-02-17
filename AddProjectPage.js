import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';

const AddProject = () => {
  const [projectName, setProjectName] = useState('');
  const [percentageComplete, setPercentageComplete] = useState('');
  const [team, setTeam] = useState('');
  const [dueDate, setDueDate] = useState('');

  //const navigation = useNavigation();

  const handleAddProject = async () => {
    try {
      const teamArray = team.split(',').map(item => item.trim());
      const projectData = {
        Name: projectName,
        Percentage_Complete: parseFloat(percentageComplete),
        Due_Date: dueDate,
        Team: teamArray,
      };

      await axios.post('http://localhost:3001/auth/projects', projectData);
      console.log('New Project Added:', projectData);
  //    navigation.navigate('PMPage');
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <View style={styles.container}>
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
