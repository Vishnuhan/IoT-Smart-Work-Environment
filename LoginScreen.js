// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user] = useAuthState(auth);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Navigate to the BottomTabNavigator upon successful login
      navigation.navigate('BottomTabNavigator');
    } catch (error) {
      console.log('Invalid Credentials');
    }
  };

  // Render the BottomTabNavigator component if the user is logged in
  if (user) {
    return <BottomTabNavigator />;
  }

  // Render the login form if the user is not logged in
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#3498db',
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default LoginScreen;
