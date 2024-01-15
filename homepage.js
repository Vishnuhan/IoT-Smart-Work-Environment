// homepage.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Homepage = ({ navigation }) => {
  const handleLoginClick = () => {
    navigation.navigate('Login');
  };

  const handleRegisterClick = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./images/desk-synergy.png')} // Adjust the path based on your project structure
        style={styles.logo}
      />
      <Text style={styles.heading}>Smart Work Environment</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLoginClick}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={handleRegisterClick}>
          <Text style={[styles.buttonText, styles.registerButtonText]}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // Light background color
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333', // Dark text color
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3498db', // Blue button color
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 15, // Border radius for a curvier appearance
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff', // White text color
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#27ae60', // Green button color for register
  },
  registerButtonText: {
    color: '#fff', // White text color for register button
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default Homepage;
