// RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

const RegisterScreen = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  
  const handleHome = () => {
    // Use navigation.goBack() to go back one screen in the stack
    // If your home screen is the first screen in the stack, you may want to use navigation.navigate('Home') instead
    navigation.navigate('Home');
  };
  
  const handleRegister = async () => {
    try {
      const registrationData = { employeeName, employeeId, password };
      const response = await axios.post('http://localhost:3001/auth/register', registrationData);
      console.log('User registered successfully:', response.data);
      navigation.navigate('Login');
      // Optionally, you can handle navigation or other logic after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Registration</Text>
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
      <Button title="Register" onPress={handleRegister} />
      <Button title="Home" onPress={handleHome}  />
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
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default RegisterScreen;
