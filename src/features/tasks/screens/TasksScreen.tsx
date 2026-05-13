import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useAuthStore } from '@/store/auth/authStore';
import { useGetTasksQuery, useUpdateTaskMutation, useDeleteTaskMutation } from '../api/tasksApi';
import { TaskLocal } from '../models/local/TaskLocal';
import { isCompletedToday, today } from '../utils/taskHelpers';
import { tasksStyles } from '../styles/Tasks.styles';
import CreateTaskModal from '../components/CreateTaskModal';

function TaskCard({
  task,
  onToggle,
  onDelete,
}: {
  task: TaskLocal;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const done = isCompletedToday(task.completedDate, task.type);

  return (
    <View style={[tasksStyles.card, done && tasksStyles.cardCompleted]}>
      <TouchableOpacity
        style={[tasksStyles.checkbox, done && tasksStyles.checkboxDone]}
        onPress={onToggle}
      >
        {done && <Text style={tasksStyles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <View style={tasksStyles.cardContent}>
        <Text style={[tasksStyles.cardTitle, done && tasksStyles.cardTitleDone]}>
          {task.title}
        </Text>
        {task.description ? (
          <Text style={tasksStyles.cardMeta}>{task.description}</Text>
        ) : null}
      </View>

      <View style={[
        tasksStyles.cardBadge,
        task.type === 'daily' ? tasksStyles.cardBadgeDaily : tasksStyles.cardBadgeOnce,
      ]}>
        <Text style={[
          tasksStyles.cardBadgeText,
          task.type === 'daily' ? tasksStyles.cardBadgeTextDaily : tasksStyles.cardBadgeTextOnce,
        ]}>
          {task.type === 'daily' ? 'Diaria' : 'Una vez'}
        </Text>
      </View>

      <TouchableOpacity onPress={onDelete} style={{ marginLeft: 10 }}>
        <Text style={{ color: '#FFB3B3', fontSize: 16 }}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

function TasksScreen() {
  const { user } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);
  const { data: tasks, isLoading } = useGetTasksQuery(user?.uid ?? '', {
    skip: !user?.uid,
  });
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const completed = tasks?.filter(t => isCompletedToday(t.completedDate, t.type)).length ?? 0;
  const total = tasks?.length ?? 0;

  const dateLabel = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const handleToggle = (task: TaskLocal) => {
    const done = isCompletedToday(task.completedDate, task.type);
    updateTask({
      ...task,
      completedDate: done ? null : today(),
    });
  };

  return (
    <View style={tasksStyles.screen}>
      <View style={tasksStyles.header}>
        <Text style={tasksStyles.headerGreeting}>Buenos días 👋</Text>
        <Text style={tasksStyles.headerDate}>{dateLabel}</Text>
        <Text style={tasksStyles.headerStats}>
          {completed} de {total} tareas completadas
        </Text>
      </View>

      {isLoading ? (
        <ActivityIndicator color="#6C63FF" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          contentContainerStyle={tasksStyles.list}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onToggle={() => handleToggle(item)}
              onDelete={() => deleteTask(item.id)}
            />
          )}
          ListEmptyComponent={
            <View style={tasksStyles.emptyContainer}>
              <Text style={{ fontSize: 40 }}>🎉</Text>
              <Text style={tasksStyles.emptyText}>No tienes tareas para hoy</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity style={tasksStyles.fab} onPress={() => setModalVisible(true)}>
        <Text style={tasksStyles.fabText}>+</Text>
      </TouchableOpacity>

      <CreateTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

export default TasksScreen;
