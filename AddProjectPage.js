// AddProject.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddProject = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleAddProject = () => {
    // Perform the logic to add a project (e.g., make an API call)
    // You can customize this based on your backend implementation

    // For simplicity, we'll just log the project details for now
    console.log('New Project Added:', { projectName, projectDescription });

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
        placeholder="Project Description"
        value={projectDescription}
        onChangeText={(text) => setProjectDescription(text)}
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
