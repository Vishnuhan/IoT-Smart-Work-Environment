import React, { useState } from 'react';
import { View, Text, Button,TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleHome = () => {
    navigation.navigate('Home');
  };

  const handleRegister = async () => {
    try {
      const registrationData = { employeeName, employeeId, password };
      const response = await axios.post('http://localhost:3001/auth/register', registrationData);
      console.log('User registered successfully:', response.data);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Employee Name"
        value={employeeName}
        onChangeText={(text) => setEmployeeName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Employee ID"
        value={employeeId}
        onChangeText={(text) => setEmployeeId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      {error !== '' && (
        <Text style={styles.errorMessage}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333', // Dark text color
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#3498db',
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    color: '#333', // Dark text color
  },
  loginButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    width: '80%',
    borderRadius: 10,
    marginBottom: 10,
  },
  homeButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    width: '80%',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default RegisterScreen;
