import React from 'react';
import { View, Text } from 'react-native';
import { tasksStyles } from '../styles/Tasks.styles';

function TasksScreen() {
  return (
    <View style={tasksStyles.container}>
      <Text>Tasks</Text>
    </View>
  );
}

export default TasksScreen;
