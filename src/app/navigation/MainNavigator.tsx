import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@/types/navigation';
import { authService } from '@/services/firebase/auth/authService';
import TasksScreen from '@/features/tasks/screens/TasksScreen';
import CalendarScreen from '@/features/calendar/screens/CalendarScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity
            onPress={() => authService.signOut()}
            style={styles.logoutBtn}
          >
            <Text style={styles.logoutText}>Salir</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    marginRight: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F0EFFF',
  },
  logoutText: {
    color: '#6C63FF',
    fontWeight: '700',
    fontSize: 13,
  },
});

export default MainNavigator;
