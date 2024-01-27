import {React, useState, useEffect} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { projects, tasks } from './dummyData'; // Import the dummy data
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';  // Import axios for API requests

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
    <View style={styles.phaseCardContainer}>
      <View style={styles.phaseCard}>
        <Text style={styles.phaseTitle}>{phase.name}</Text>
        <Text style={styles.phaseText}>{phase.percentage}% Completed</Text>
      </View>
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
  <View style={styles.taskCard}>
    <Text style={styles.taskName}>Task Name: {task.TaskName}</Text>
    <Text style={styles.phase}>Phase: {task.Phase}</Text>
    <Text style={styles.completionStatus}>
      Completion Status: {task.Complete ? 'Complete' : 'Incomplete'}
    </Text>
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
      <Text style={styles.cardTitle}>Name: {project.Name}</Text>
      <Text style={styles.cardText}>Percentage Complete: {project.Percentage_Complete}%</Text>
      <Text style={styles.cardText}>Team: {project.Team.join(', ')}</Text>
      <Text style={styles.cardText}>Due Date: {project.Due_Date}</Text>
      <Text style={styles.cardText}>Tasks: {project.Tasks.join(', ')}</Text>
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
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/auth/projects');

      console.log(response.data);  // Log the projects data

    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Error fetching projects');
    }
  };

  // Fetch projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <View>
      <Text style={styles.mytext}>All Projects</Text>
      <FlatList
      style={{ flex: 1 }}
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
  phaseCardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    flex: 1,
  },
  phaseCard: {
    padding: 16,
  },
  phaseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  phaseText: {
    fontSize: 16,
    color: '#555',
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  phase: {
    color: '#555',
    marginBottom: 8,
  },
  completionStatus: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2ecc71',
  },
  projectCard: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    font: "Quicksand",
    marginBottom: 6,
    color: '#555',
  },
  mytext: {
    fontWeight: 'bold',
    fontfamily: 'Roboto',
    marginLeft: '10px',
  },
});

export default PMPage;



