import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useAuthStore } from '@/store/auth/authStore';
import { useGetAllTasksQuery, useUpdateTaskMutation } from '@/features/tasks/api/tasksApi';
import { TaskLocal } from '@/features/tasks/models/local/TaskLocal';
import { isCompletedToday, today } from '@/features/tasks/utils/taskHelpers';
import { calendarStyles } from '../styles/Calendar.styles';

function TaskRow({ task, onToggle }: { task: TaskLocal; onToggle: () => void }) {
  const done = isCompletedToday(task.completedDate, task.type);

  return (
    <View style={[calendarStyles.card, done && calendarStyles.cardCompleted]}>
      <TouchableOpacity
        onPress={onToggle}
        style={{
          width: 22,
          height: 22,
          borderRadius: 7,
          borderWidth: 2,
          borderColor: '#6C63FF',
          backgroundColor: done ? '#6C63FF' : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {done && <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>✓</Text>}
      </TouchableOpacity>

      <View style={calendarStyles.cardContent}>
        <Text style={[calendarStyles.cardTitle, done && calendarStyles.cardTitleDone]}>
          {task.title}
        </Text>
        {task.description ? (
          <Text style={calendarStyles.cardMeta}>{task.description}</Text>
        ) : null}
      </View>

      <View style={[
        calendarStyles.cardBadge,
        task.type === 'daily' ? calendarStyles.cardBadgeDaily : calendarStyles.cardBadgeOnce,
      ]}>
        <Text style={[
          calendarStyles.cardBadgeText,
          task.type === 'daily' ? calendarStyles.cardBadgeTextDaily : calendarStyles.cardBadgeTextOnce,
        ]}>
          {task.type === 'daily' ? 'Diaria' : 'Una vez'}
        </Text>
      </View>
    </View>
  );
}

function CalendarScreen() {
  const { user } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState(today());
  const { data: allTasks = [] } = useGetAllTasksQuery(user?.uid ?? '', {
    skip: !user?.uid,
  });
  const [updateTask] = useUpdateTaskMutation();

  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};
    allTasks
      .filter(t => t.type === 'once')
      .forEach(t => {
        marks[t.date] = {
          marked: true,
          dotColor: '#6C63FF',
        };
      });
    marks[selectedDate] = {
      ...(marks[selectedDate] ?? {}),
      selected: true,
      selectedColor: '#6C63FF',
    };
    return marks;
  }, [allTasks, selectedDate]);

  const tasksForDay = useMemo(() => {
    return allTasks.filter(
      t => t.type === 'daily' || t.date === selectedDate,
    );
  }, [allTasks, selectedDate]);

  const handleToggle = (task: TaskLocal) => {
    const done = isCompletedToday(task.completedDate, task.type);
    updateTask({ ...task, completedDate: done ? null : today() });
  };

  const selectedLabel = new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <View style={calendarStyles.screen}>
      <View style={calendarStyles.calendarWrap}>
        <Calendar
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: '#6C63FF',
            todayTextColor: '#6C63FF',
            arrowColor: '#6C63FF',
            dotColor: '#6C63FF',
            textDayFontWeight: '500',
            textMonthFontWeight: '700',
            textDayHeaderFontWeight: '600',
          }}
        />
      </View>

      <View style={calendarStyles.sectionHeader}>
        <Text style={calendarStyles.sectionTitle}>
          {tasksForDay.length} tarea{tasksForDay.length !== 1 ? 's' : ''}
        </Text>
        <Text style={calendarStyles.sectionSubtitle}>{selectedLabel}</Text>
      </View>

      <FlatList
        data={tasksForDay}
        keyExtractor={item => item.id}
        contentContainerStyle={calendarStyles.list}
        renderItem={({ item }) => (
          <TaskRow task={item} onToggle={() => handleToggle(item)} />
        )}
        ListEmptyComponent={
          <View style={calendarStyles.emptyContainer}>
            <Text style={{ fontSize: 36 }}>📅</Text>
            <Text style={calendarStyles.emptyText}>Sin tareas para este día</Text>
          </View>
        }
      />
    </View>
  );
}

export default CalendarScreen;
