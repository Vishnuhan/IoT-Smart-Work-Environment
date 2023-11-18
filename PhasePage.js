// PhasePage.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PhasePage = ({ route, navigation }) => {
  const { project } = route.params;

  const handlePhaseClick = (phase) => {
    // Navigate to the task page with the selected phase
    navigation.navigate('TaskPage', { project, phase });
  };

  return (
    <View>
      <Text>Choose a Phase</Text>
      <TouchableOpacity onPress={() => handlePhaseClick('Implementation')}>
        <View style={styles.phaseCard}>
          <Text>Implementation</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePhaseClick('Planning')}>
        <View style={styles.phaseCard}>
          <Text>Planning</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePhaseClick('Testing')}>
        <View style={styles.phaseCard}>
          <Text>Testing</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePhaseClick('Deployment')}>
        <View style={styles.phaseCard}>
          <Text>Deployment</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  phaseCard: {
    backgroundColor: '#ececec',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});

export default PhasePage;
