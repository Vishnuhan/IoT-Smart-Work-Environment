// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import TopTabNavigator from './TopTabNavigator'; // Import the TopTabNavigator
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import BottomTabNavigator from './BottomTabNavigator'; // Import your BottomTabNavigator

const handleHome = () => {
  // Use navigation.goBack() to go back one screen in the stack
  // If your home screen is the first screen in the stack, you may want to use navigation.navigate('Home') instead
  navigation.navigate('Home');
};

const LoginScreen = ({ navigation }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  const handleLogin = async () => {
    try {
      const loginData = { employeeId, password };
      const response = await axios.post('http://localhost:3001/auth/login', loginData);

      if (employeeId === 'admin' && password === 'admin') {
        // If employeeId and password are admin, set isAdmin to true
        setIsAdmin(true);
      }

      console.log(response)
      console.log('Login successful:', response.data);
      setLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Incorrect user information. Please try again.');
    }
  };

  if (loggedIn) {
    return <BottomTabNavigator isAdmin={isAdmin} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="employeeId"
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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

export default LoginScreen;