import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useAuthStore } from '@/store/auth/authStore';
import {
  useGetTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '../api/tasksApi';
import { TaskLocal } from '../models/local/TaskLocal';
import { isCompletedToday, today } from '../utils/taskHelpers';
import { tasksStyles } from '../styles/Tasks.styles';
import CreateTaskModal from '../components/CreateTaskModal';
import { notificationService } from '@/services/notifications/notificationService';

function EmptyState() {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withSpring(1.15, { damping: 3 }, () => {
      scale.value = withSpring(1);
    });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.springify()}
      style={tasksStyles.emptyContainer}
    >
      <Animated.Text style={[{ fontSize: 64 }, animStyle]}>🎉</Animated.Text>
      <Text style={tasksStyles.emptyText}>¡Todo listo por hoy!</Text>
      <Text style={{ color: '#AEAEC0', fontSize: 13, marginTop: 4 }}>
        No tienes tareas pendientes
      </Text>
    </Animated.View>
  );
}

function TaskCard({
  task,
  index,
  onToggle,
  onEdit,
  onDelete,
}: {
  task: TaskLocal;
  index: number;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const done = isCompletedToday(task.completedDate, task.type);
  const scale = useSharedValue(1);

  const checkboxStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleToggle = () => {
    scale.value = withSpring(1.3, { damping: 4 }, () => {
      scale.value = withSpring(1);
    });
    onToggle();
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 80).springify()}
      style={[tasksStyles.card, done && tasksStyles.cardCompleted]}
    >
      <TouchableOpacity onPress={handleToggle}>
        <Animated.View
          style={[
            tasksStyles.checkbox,
            done && tasksStyles.checkboxDone,
            checkboxStyle,
          ]}
        >
          {done && <Text style={tasksStyles.checkmark}>✓</Text>}
        </Animated.View>
      </TouchableOpacity>

      <View style={tasksStyles.cardContent}>
        <Text
          style={[tasksStyles.cardTitle, done && tasksStyles.cardTitleDone]}
        >
          {task.title}
        </Text>
        {task.description ? (
          <Text style={tasksStyles.cardMeta}>{task.description}</Text>
        ) : null}
      </View>

      <View
        style={[
          tasksStyles.cardBadge,
          task.type === 'daily'
            ? tasksStyles.cardBadgeDaily
            : tasksStyles.cardBadgeOnce,
        ]}
      >
        <Text
          style={[
            tasksStyles.cardBadgeText,
            task.type === 'daily'
              ? tasksStyles.cardBadgeTextDaily
              : tasksStyles.cardBadgeTextOnce,
          ]}
        >
          {task.type === 'daily' ? 'Diaria' : 'Una vez'}
        </Text>
      </View>

      <TouchableOpacity onPress={onEdit} style={{ marginLeft: 10 }}>
        <Text style={{ color: '#6C63FF', fontSize: 15 }}>✏️</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            'Eliminar tarea',
            '¿Seguro que quieres eliminar esta tarea?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Eliminar', style: 'destructive', onPress: onDelete },
            ],
          )
        }
        style={{ marginLeft: 8 }}
      >
        <Text style={{ color: '#FFB3B3', fontSize: 16 }}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function TasksScreen() {
  const { user } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskLocal | undefined>(
    undefined,
  );
  const {
    data: tasks,
    isLoading,
    isFetching,
    refetch,
  } = useGetTasksQuery(user?.uid ?? '', {
    skip: !user?.uid,
  });
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const completed =
    tasks?.filter(t => isCompletedToday(t.completedDate, t.type)).length ?? 0;
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

  const handleEdit = (task: TaskLocal) => {
    setTaskToEdit(task);
    setModalVisible(true);
  };

  const handleDelete = async (task: TaskLocal) => {
    await notificationService.cancelTaskNotification(task.id);
    deleteTask(task.id);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTaskToEdit(undefined);
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
          refreshing={isFetching}
          onRefresh={refetch}
          renderItem={({ item, index }) => (
            <TaskCard
              task={item}
              index={index}
              onToggle={() => handleToggle(item)}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item)}
            />
          )}
          ListEmptyComponent={<EmptyState />}
        />
      )}

      <TouchableOpacity
        style={tasksStyles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={tasksStyles.fabText}>+</Text>
      </TouchableOpacity>

      <CreateTaskModal
        visible={modalVisible}
        onClose={handleCloseModal}
        taskToEdit={taskToEdit}
      />
    </View>
  );
}

export default TasksScreen;
