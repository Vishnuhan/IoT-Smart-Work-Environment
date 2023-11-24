// AccountPage.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AccountPage = () => (
  <View style={styles.container}>
    <Text style={styles.header}>Account Page</Text>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>User Information</Text>
      <Text>Email: user@example.com</Text>
      {/* Add more user-related information here */}
    </View>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Account Actions</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Update Email</Text>
      </TouchableOpacity>
      {/* Add more account-related actions here */}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AccountPage;
