import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import AddProjectPage from './AddProjectPage'; // Adjust the import path as needed


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

const PMPage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => navigation.navigate('AddProjectPage')} // Replace with the correct navigation destination
        >
          <Icon name="add-box" size={30} color="#3498db" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="PMPage">
      <Stack.Screen name="PMPage" component={PMTopTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
      <Stack.Screen name="Tasks" component={TasksPage} />
    </Stack.Navigator>
  );
};

const renderTaskCard = (task) => (
  <View style={styles.taskCard}>
    <Text style={styles.taskName}>Task Name: {task.taskName}</Text>
    <Text style={styles.phase}>Phase: {task.taskPhase}</Text>
    <Text style={styles.completionStatus}>
      Completion Status: {task.taskComplete ? 'Complete' : 'Incomplete'}
    </Text>
    <Text style={styles.employees}>
      Employees: {task.employees ? task.employees.join(', ') : 'None'}
    </Text>
  </View>
);

const TasksPage = ({ route }) => {
  const { phase, projectName } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskSize, setNewTaskSize] = useState('');
  const [newTaskNumEmployees, setNewTaskNumEmployees] = useState(1);
  const [newTaskEmployees, setNewTaskEmployees] = useState([]);
  const [employeeInputs, setEmployeeInputs] = useState([""]);

  const [projectTasks, setProjectTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/projects');
        const project = response.data.find((p) => p.Name === projectName);

        if (project) {
          const tasksForPhase = project.Tasks.filter((t) => t.taskPhase === phase.name);
          setProjectTasks(tasksForPhase);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchTasks();
  }, [phase.name, projectName]);

  const handleUpdateSampleEmployees = async () => {
    if (!newTaskName) {
      console.log('Please enter a task name before updating sample employees.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/auth/users');
      const user_Data = await axios.post('http://localhost:3001/auth/get-suggestions.py', {
        user_data: response.data,
        new_task_name: newTaskName,
      });

      const val = convertStringToJson();
      const val_json = JSON.parse(val);

      setNewTaskEmployees(val_json.map((name) => name.EmployeeName));

      function convertStringToJson() {
        const lines = user_Data.data.trim().split('\n');
        lines.shift();
        const employees = lines.map((line) => {
          const [id, ...nameParts] = line.trim().split(' ');
          const name = nameParts.join(' ');
          return { id: parseInt(id, 10), EmployeeName: name };
        });
        return JSON.stringify(employees, null, 2);
      }

      const jsonOutput = convertStringToJson(user_Data.data);
      console.log(jsonOutput);
    } catch (error) {
      console.error('Error fetching sample users:', error);
    }
  };

  const handleAddTask = () => {
    setIsModalVisible(true);
  };

  const handleSaveTask = async () => {
    const taskDetails = {
      taskName: newTaskName,
      dueDate: newTaskDueDate,
      taskSize: newTaskSize,
      employees: employeeInputs.filter((input) => input.trim() !== ''),
    };

    try {
      await axios.post('http://localhost:3001/auth/addtask', taskDetails);
      console.log('Task successfully added with employees');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding task with employees:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleNumEmployeesChange = (numEmployees) => {
    const clampedNumEmployees = Math.max(1, Math.min(5, numEmployees));
    setNewTaskNumEmployees(clampedNumEmployees);
    setEmployeeInputs(
      employeeInputs.slice(0, clampedNumEmployees).concat(Array(Math.max(clampedNumEmployees - employeeInputs.length, 0)).fill(''))
    );
  };

  const handleEmployeeInputChange = (text, index) => {
    const updatedInputs = [...employeeInputs];
    updatedInputs[index] = text;
    setEmployeeInputs(updatedInputs);
  };

  const renderEmployeeInputs = () => {
    return Array.from({ length: newTaskNumEmployees }, (_, index) => (
      <TextInput
        key={index}
        style={styles.inputField}
        placeholder={`Employee ${index + 1}`}
        value={employeeInputs[index]}
        onChangeText={(text) => handleEmployeeInputChange(text, index)}
      />
    ));
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.mytext}>Tasks for Phase: {phase.name}</Text>
        <Text style={styles.mytext}>Project: {projectName}</Text>
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={projectTasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderTaskCard(item)}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.splitScreenContainer}>
            <View style={styles.leftSide}>
              <Text style={styles.modalTitle}>Add Task</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Task Name"
                onChangeText={(text) => setNewTaskName(text)}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Due Date"
                onChangeText={(text) => setNewTaskDueDate(text)}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Task Size"
                onChangeText={(text) => setNewTaskSize(text)}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Number of Employees"
                onChangeText={(text) => setNewTaskNumEmployees(parseInt(text) || 0)}
              />
              <TouchableOpacity onPress={handleUpdateSampleEmployees} style={styles.updateButton}>
                <Text style={styles.addButtonText}>Update Sample Employees</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.inputField}
                placeholder="Number of Employees"
                keyboardType="numeric"
                value={String(newTaskNumEmployees)}
                onChangeText={(text) => handleNumEmployeesChange(parseInt(text) || 1)}
              />
              {renderEmployeeInputs()}
            </View>
            <View style={styles.rightSide}>
              <Text style={styles.modalTitle}>AI Suggestion</Text>
              <FlatList
                data={newTaskEmployees}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.sampleEmployee}>{item}</Text>
                )}
              />
            </View>
          </View>
          <View style={styles.modalButtons}>
            <View style={styles.buttonWrapper}>
              <Button title="Save" onPress={handleSaveTask} />
            </View>
            <View style={[styles.buttonWrapper, styles.cancelButtonWrapper]}>
              <Button title="Cancel" onPress={handleCloseModal} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const renderProjectCard = (navigation, project) => {
  const teamText = project.Team ? `Team: ${project.Team.join(', ')}` : 'Team: N/A';

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProjectDetails', { project, navigation })}
    >
      <View style={styles.projectCard}>
        <Text style={styles.cardTitle}>Name: {project.Name}</Text>
        <Text style={styles.cardText}>Percentage Complete: {project.Percentage_Complete}%</Text>
        <Text style={styles.cardText}>{teamText}</Text>
        <Text style={styles.cardText}>Due Date: {project.Due_Date}</Text>
        <Text style={styles.cardText}>Tasks: {project.Tasks ? project.Tasks.join(', ') : 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );
};

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
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/auth/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Error fetching projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text style={styles.mytext}>All Projects</Text>
        <FlatList
          style={{ flex: 1 }}
          data={projects}
          keyExtractor={(item) => item.Name}
          renderItem={({ item }) => renderProjectCard(navigation, item)}
        />
      </View>
    </ScrollView>
  );
};

const OngoingScreen = () => {
  const navigation = useNavigation();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const ongoingProjects = projects.filter((project) => project.Percentage_Complete < 100);

  return (
    <ScrollView>
      <View>
        <Text style={styles.mytext}>Ongoing Projects</Text>
        <FlatList
          data={ongoingProjects}
          keyExtractor={(item) => item.Name}
          renderItem={({ item }) => renderProjectCard(navigation, item)}
        />
      </View>
    </ScrollView>
  );
};

const CompletedScreen = () => {
  const navigation = useNavigation();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const completedProjects = projects.filter((project) => project.Percentage_Complete === 100);

  return (
    <ScrollView>
      <View>
        <Text style={styles.mytext}>Completed Projects</Text>
        <FlatList
          data={completedProjects}
          keyExtractor={(item) => item.Name}
          renderItem={({ item }) => renderProjectCard(navigation, item)}
        />
      </View>
    </ScrollView>
  );
};

const PMTopTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="All" component={AllScreen} />
    <Tab.Screen name="Ongoing" component={OngoingScreen} />
    <Tab.Screen name="Completed" component={CompletedScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  // ... your existing styles

  mytext: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },

  // Add the new styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  phaseCardContainer: {
    padding: 10,
  },
  phaseCard: {
    backgroundColor: '#ecf0f1',
    padding: 20,
    borderRadius: 10,
  },
  phaseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phaseText: {
    marginTop: 10,
    color: '#3498db',
  },
  taskCard: {
    backgroundColor: '#ecf0f1',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phase: {
    marginVertical: 5,
  },
  completionStatus: {
    marginVertical: 5,
    color: '#3498db',
  },
  employees: {
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  splitScreenContainer: {
    flexDirection: 'row',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  leftSide: {
    padding: 20,
    width: '60%',
  },
  rightSide: {
    padding: 20,
    width: '40%',
    backgroundColor: '#ecf0f1',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  updateButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  sampleEmployee: {
    marginBottom: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
  cancelButtonWrapper: {
    backgroundColor: '#e74c3c',
  },
});

export default PMPage;
