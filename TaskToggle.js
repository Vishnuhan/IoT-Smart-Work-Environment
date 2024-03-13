import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const TaskToggle = () => {
  const [isComplete, setIsComplete] = useState(false);

  const onToggleSwitch = () => {
    setIsComplete((prevValue) => !prevValue);
    // Add logic to update the completion status in your backend/API
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Status</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isComplete ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onToggleSwitch}
        value={isComplete}
      />
      <Text style={styles.statusText}>{isComplete ? 'Complete' : 'Incomplete'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    marginRight: 10,
  },
  statusText: {
    marginLeft: 10,
  },
});

export default TaskToggle;