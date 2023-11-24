  // PMPage.js
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { projects, tasks } from './dummyData'; // Import the dummy data
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PHASES = [
  { name: 'Implementation', percentage: Math.floor(Math.random() * 100) },
  { name: 'Planning', percentage: Math.floor(Math.random() * 100) },
  { name: 'Testing', percentage: Math.floor(Math.random() * 100) },
  { name: 'Deployment', percentage: Math.floor(Math.random() * 100) },
];

const renderPhaseCard = (navigation, phase, projectName) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('Tasks', { phase, projectName })}
  >
    <View style={styles.projectCard}>
      <Text>Phase: {phase.name}</Text>
      <Text>Percentage Complete: {phase.percentage}%</Text>
    </View>
  </TouchableOpacity>
);

const PhasePage = ({ route }) => {
  const { projectName, navigation } = route.params;

  return (
    <FlatList
      data={PHASES}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => renderPhaseCard(navigation, item, projectName)}
    />
  );
};

const renderTaskCard = (task) => (
  <View style={styles.projectCard}>
    <Text>Task Name: {task.TaskName}</Text>
    <Text>Phase: {task.Phase}</Text>
    <Text>Completion Status: {task.Complete ? 'Complete' : 'Incomplete'}</Text>
  </View>
);

const TasksPage = ({ route }) => {
  const { phase, projectName } = route.params;

  const tasksForPhase = tasks.filter((task) => task.Phase === phase.name);

  return (
    <View>
      <Text style={styles.mytext}>Tasks for Phase: {phase.name}</Text>
      <Text style={styles.mytext}>Project: {projectName}</Text>
      <FlatList
        data={tasksForPhase}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderTaskCard(item)}
      />
    </View>
  );
};

const renderProjectCard = (navigation, project) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('ProjectDetails', { project, navigation })}
  >
    <View style={styles.projectCard}>
      <Text>Name: {project.Name}</Text>
      <Text>Percentage Complete: {project.Percentage_Complete}%</Text>
      <Text>Team: {project.Team.join(', ')}</Text>
      <Text>Due Date: {project.Due_Date}</Text>
      <Text>Tasks: {project.Tasks.join(', ')}</Text>
    </View>
  </TouchableOpacity>
);

const ProjectDetailsScreen = ({ route }) => {
  const { project, navigation } = route.params;

  return (
    <View>
      <Text style={styles.mytext}>Project Phases</Text>
      <FlatList
        data={PHASES}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => renderPhaseCard(navigation, item, project.Name)}
      />
    </View>
  );
};

const AllScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.mytext}>All Projects</Text>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.Name}
        renderItem={({ item }) => renderProjectCard(navigation, item)}
      />
    </View>
  );
};

const OngoingScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.mytext}>Ongoing Projects</Text>
      <FlatList
        data={projects.filter((project) => project.Percentage_Complete < 100)}
        keyExtractor={(item) => item.Name}
        renderItem={({ item }) => renderProjectCard(navigation, item)}
      />
    </View>
  );
};

const CompletedScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.mytext}>Completed Projects</Text>
      <FlatList
        data={projects.filter((project) => project.Percentage_Complete === 100)}
        keyExtractor={(item) => item.Name}
        renderItem={({ item }) => renderProjectCard(navigation, item)}
      />
    </View>
  );
};

const PMPage = () => (
  <Stack.Navigator initialRouteName="PMPage">
    <Stack.Screen name="PMPage" component={PMTopTabNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
    <Stack.Screen name="Tasks" component={TasksPage} />
  </Stack.Navigator>
);

const PMTopTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="All" component={AllScreen} />
    <Tab.Screen name="Ongoing" component={OngoingScreen} />
    <Tab.Screen name="Completed" component={CompletedScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  projectCard: {
    backgroundColor: 'dodgerblue',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  mytext: {
    fontWeight:'bold',
    marginLeft:'10px'
  },
});

export default PMPage;
