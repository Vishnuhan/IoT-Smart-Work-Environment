// RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user] = useAuthState(auth);

  const handleRegister = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      // Optionally, you can sign in the user automatically after registration
      // await auth.signInWithEmailAndPassword(email, password);
      // Navigate to the next screen upon successful registration
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
