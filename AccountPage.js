// AccountPage.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';

const AccountPage = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Assuming 'Home' is the name of the screen you want to navigate to
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Page</Text>

      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Information</Text>
          <Text>Email: user@example.com</Text>
          {/* Add more user-related information here */}
        </View>

        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={90} // Adjust the size as needed
            // source={require('../../images/Ishan-photo1.jpg')}

            source={{ uri: 'https://example.com/path-to-person-image.jpg' }} // Use a placeholder image
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Actions</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        {/* Add more account-related actions here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    flexDirection: 'row', // Align sections in a row
    justifyContent: 'space-between', // Put space between the sections
    marginBottom: 16, // Adjust the margin as needed
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    flex: 1, // Expand to fill the available space
    marginRight: 16, // Adjust margin as needed
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  avatarContainer: {
    marginRight: 20,
    marginTop: -10, // Adjust the negative margin as needed
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  logoutButton: {
    backgroundColor: 'red',
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