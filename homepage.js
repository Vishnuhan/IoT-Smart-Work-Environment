import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const COLORS = {
  primary: '#075eec', // Adjusted primary color for consistency
  background: '#e8ecf4', // Adjusted background color for consistency
  text: '#1d1d1d', // Adjusted text color for consistency
};

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
      <Text style={styles.title}>DeskSynergy</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn} onPress={handleLoginClick}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleRegisterClick}>
          <Text style={styles.btnText}>Register</Text>
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
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    marginBottom: 16,
    width: '100%',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Homepage;
