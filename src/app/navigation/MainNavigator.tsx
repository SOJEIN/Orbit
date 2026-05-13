import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@/types/navigation';
import TasksScreen from '@/features/tasks/screens/TasksScreen';
import CalendarScreen from '@/features/calendar/screens/CalendarScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
}

export default MainNavigator;
