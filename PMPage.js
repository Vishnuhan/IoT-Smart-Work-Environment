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

// Assuming you have an API endpoint to fetch project data
const API_ENDPOINT = 'http://localhost:3001/auth/projects';

const renderProjectCard = async (navigation, project) => {
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();

    // Assuming the response data is an array of projects
    const projectData = data.find((item) => item.Name === project.Name);

    if (projectData) {
      // Process the data and then render the component
      const renderedComponent = (
        <TouchableOpacity
          onPress={() => navigation.navigate('ProjectDetails', { project: projectData, navigation })}
        >
          <View style={styles.projectCard}>
            <Text style={styles.cardTitle}>Name: {projectData.Name}</Text>
            <Text style={styles.cardText}>Percentage Complete: {projectData.Percentage_Complete}%</Text>
            <Text style={styles.cardText}>Team: {projectData.Team.join(', ')}</Text>
            <Text style={styles.cardText}>Due Date: {projectData.Due_Date}</Text>
            <Text style={styles.cardText}>Tasks: {projectData.Tasks.join(', ')}</Text>
          </View>
        </TouchableOpacity>
      );

      // Render the component or return it for further processing
      return renderedComponent;
    } else {
      // Handle case where project data is not found
      return (
        <View style={styles.projectCard}>
          <Text style={styles.cardTitle}>Project not found</Text>
        </View>
      );
    }
  } catch (error) {
    console.error('Error fetching project data:', error);
    // Handle error fetching data
    return (
      <View style={styles.projectCard}>
        <Text style={styles.cardTitle}>Error fetching project data</Text>
      </View>
    );
  }
};


const ProjectDetailsScreen = ({ route }) => {
  const { navigation } = route.params;

  // Use state to manage the project data
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();

        // Assuming the response data is an array of projects
        const project = data.find((item) => item.Name === route.params.project.Name);

        if (project) {
          setProjectData(project);
        } else {
          // Handle case where project data is not found
          setProjectData({ error: 'Project not found' });
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
        // Handle error fetching data
        setProjectData({ error: 'Error fetching project data' });
      }
    };

    // Call the fetchProjectData function when the component mounts
    fetchProjectData();
  }, [route.params.project.Name]); // Dependency to re-run the effect when the project name changes

  return (
    <View>
      <Text style={styles.mytext}>Project Phases</Text>
      {projectData && projectData.error ? (
        <View style={styles.projectCard}>
          <Text style={styles.cardTitle}>{projectData.error}</Text>
        </View>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={projectData ? [projectData] : []} // Wrap projectData in an array
          keyExtractor={(item) => item.Name}
          renderItem={({ item }) => renderProjectCard(navigation, item)}
        />
      )}
    </View>
  );
};


const AllScreen = () => {
  const navigation = useNavigation();

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
