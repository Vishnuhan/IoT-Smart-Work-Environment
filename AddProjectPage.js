import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // This is for a modal date picker

const AddProject = () => {
  const [projectName, setProjectName] = useState('');
  const [percentageComplete, setPercentageComplete] = useState('');
  const [team, setTeam] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [notification, setNotification] = useState({ visible: false, message: '', theme: 'light' });
  const API_URL = 'https://capstone-cmml.onrender.com';

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

      await axios.post(`${API_URL}/auth/projects`, projectData);
      showNotification('Project successfully added!', 'green');
    } catch (error) {
      showNotification('Project was not added!', 'red');
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setDueDate(date.toISOString().split('T')[0]); // Save the formatted date
    hideDatePicker();
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value); // Update due date from the event
    setShowDatePicker(false); // Hide the date picker
  };

  
  
//   return (
//     <View style={styles.container}>
//       {notification.visible && (
//         <View style={[styles.notification, { backgroundColor: notification.theme === 'red' ? '#FFCCCC' : '#CCFFCC' }]}>
//           <Text style={styles.notificationText}>{notification.message}</Text>
//           <TouchableOpacity onPress={() => setNotification({ visible: false, message: '', theme: 'light' })}>
//             <Text style={styles.closeButton}>X</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//       <Text style={styles.title}>Add New Project</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Project Name"
//         value={projectName}
//         onChangeText={setProjectName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Percentage Complete"
//         keyboardType="numeric"
//         value={percentageComplete}
//         onChangeText={setPercentageComplete}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Team (Comma-separated)"
//         value={team}
//         onChangeText={setTeam}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Due Date"
//         value={dueDate}
//         onChangeText={setDueDate}
//       />

// {/* <View style={styles.datePickerRow}>
//         <TextInput
//           style={[styles.input, styles.dateInput]}
//           placeholder="Due Date"
//           value={dueDate}
//           onChangeText={() => {}} // The date is set by the date picker, not manual edit
//           editable={false} // Make the text input non-editable
//         />
//         <TouchableOpacity onPress={showDatePicker} style={styles.calendarButton}>
//           <Text style={styles.calendarText}>📅</Text>
//         </TouchableOpacity>
//       </View> */}

//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         onConfirm={handleConfirmDate}
//         onCancel={hideDatePicker}
//       />
//       <Button title="Add Project" onPress={handleAddProject} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 5,
//     padding: 10,
//   },
//   datePickerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//   },
//   dateInput: {
//     flex: 1,
//   },
//   calendarButton: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 5,
//     padding: 10,
//     marginLeft: 5,
//   },
//   calendarText: {
//     fontSize: 18,
//   },
//   notification: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     zIndex: 1000,
//   },
//   notificationText: {
//     color: '#000',
//   },
//   closeButton: {
//     color: '#000',
//     fontWeight: 'bold',
//   },
// });

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
    <View style={styles.inputContainer}>
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
        placeholder="Due Date (yyyy-mm-dd)"
        value={dueDate}
        onChangeText={setDueDate}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
      <Button title="Add Project" onPress={handleAddProject} color="#a832ff" />
    </View>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  backgroundColor: '#f4f4f4', // Light grey background for the whole page
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#333', // Dark text for better contrast
  marginBottom: 20,
},
inputContainer: {
  width: '100%',
},
input: {
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#a832ff', // Light grey border for input fields
  borderRadius: 5,
  padding: 10,
  backgroundColor: '#fff', // White background for input fields
  color: '#333', // Dark text for inputs
},
datePickerRow: {
  flexDirection: 'row',
  alignItems: 'center',
},
dateInput: {
  flex: 1,
},
calendarButton: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  padding: 10,
  marginLeft: 5,
  backgroundColor: '#e8e8e8', // Slightly darker grey for the button
},
calendarText: {
  fontSize: 16,
},
notification: {
  position: 'absolute',
  top: 10,
  left: 10,
  right: 10,
  padding: 20,
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  zIndex: 1000,
  borderRadius: 5,
},
notificationText: {
  color: '#000',
},
closeButton: {
  color: '#000',
  fontWeight: 'bold',
},

Button: {borderRadius: 5}

});

export default AddProject;
