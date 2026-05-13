import React from 'react';
import { View, Text } from 'react-native';
import { calendarStyles } from '../styles/Calendar.styles';
function CalendarScreen() {
  return (
    <View style={calendarStyles.container}>
      <Text>Calendar</Text>
    </View>
  );
}

export default CalendarScreen;
