// homepage.js
import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

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
        <Button title="Login" onPress={handleLoginClick} />
        <Button title="Register" onPress={handleRegisterClick} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
  },
  logo: {
    width: 200, // Adjust the width and height based on your image dimensions
    height: 200,
    marginBottom: 20,
  },
});

export default Homepage;
