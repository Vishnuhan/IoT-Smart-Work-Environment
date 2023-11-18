// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
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
      console.log("Invalid Credentials")
    }
  };

  // Render the BottomTabNavigator component if the user is logged in
  if (user) {
    return <BottomTabNavigator />;
  }

  // Render the login form if the user is not logged in
  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
