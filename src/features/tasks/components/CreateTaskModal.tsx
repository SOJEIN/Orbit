import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuthStore } from '@/store/auth/authStore';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../api/tasksApi';
import { TaskLocal } from '../models/local/TaskLocal';
import { today } from '../utils/taskHelpers';
import { tasksStyles } from '../styles/Tasks.styles';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { notificationService } from '@/services/notifications/notificationService';

interface Props {
  visible: boolean;
  onClose: () => void;
  taskToEdit?: TaskLocal;
}

function CreateTaskModal({ visible, onClose, taskToEdit }: Props) {
  const { user } = useAuthStore();
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const isLoading = isCreating || isUpdating;
  const isEditing = !!taskToEdit;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'daily' | 'once'>('daily');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState<string | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setType(taskToEdit.type);
      setDate(taskToEdit.date ? new Date(taskToEdit.date) : new Date());
      setTime(taskToEdit.time || null);
    }
  }, [taskToEdit]);

  const reset = () => {
    setTitle('');
    setDescription('');
    setType('daily');
    setDate(new Date());
    setShowDatePicker(false);
    setTime(null);
    setShowTimePicker(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título no puede estar vacío.');
      return;
    }

    const taskData =
      type === 'once' ? date.toISOString().split('T')[0] : today();

    if (isEditing) {
      const result = await updateTask({
        ...taskToEdit,
        title: title.trim(),
        description: description.trim(),
        type,
        date: taskData,
        time,
      });
      if ('error' in result) {
        Alert.alert('Error', 'No se pudo actualizar la tarea.');
        return;
      }
      await notificationService.cancelTaskNotification(taskToEdit.id);
    } else {
      const result = await createTask({
        title: title.trim(),
        description: description.trim(),
        type,
        date: taskData,
        time,
        completedDate: null,
        userId: user!.uid,
      });
      if ('error' in result) {
        Alert.alert('Error', 'No se pudo crear la tarea.');
        return;
      }
    }

    if (time) {
      const [h, m] = time.split(':');
      const scheduledAt = new Date(taskData);
      scheduledAt.setHours(Number(h), Number(m), 0, 0);
      const id = isEditing ? taskToEdit!.id : `${user!.uid}-${Date.now()}`;
      await notificationService.scheduleTaskNotification(
        id,
        title.trim(),
        scheduledAt,
      );
    }
    handleClose();
  };

  const formattedDate = date.toLocaleDateString('es-CO', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <TouchableOpacity
        style={tasksStyles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <TouchableOpacity activeOpacity={1}>
            <View style={tasksStyles.modalCard}>
              <View style={tasksStyles.modalHandle} />

              <Text style={tasksStyles.modalTitle}>
                {isEditing ? 'Editar tarea' : 'Nueva tarea'}
              </Text>

              <Input
                label="Título"
                value={title}
                onChangeText={setTitle}
                autoCapitalize="sentences"
              />

              <Input
                label="Descripción (opcional)"
                value={description}
                onChangeText={setDescription}
                autoCapitalize="sentences"
              />

              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: '#4A4A6A',
                  marginBottom: 8,
                }}
              >
                Tipo de tarea
              </Text>
              <View style={tasksStyles.typeSelector}>
                <TouchableOpacity
                  style={[
                    tasksStyles.typeBtn,
                    type === 'daily' && tasksStyles.typeBtnActive,
                  ]}
                  onPress={() => setType('daily')}
                >
                  <Text
                    style={[
                      tasksStyles.typeBtnText,
                      type === 'daily' && tasksStyles.typeBtnTextActive,
                    ]}
                  >
                    🔁 Diaria
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    tasksStyles.typeBtn,
                    type === 'once' && tasksStyles.typeBtnActive,
                  ]}
                  onPress={() => setType('once')}
                >
                  <Text
                    style={[
                      tasksStyles.typeBtnText,
                      type === 'once' && tasksStyles.typeBtnTextActive,
                    ]}
                  >
                    📅 Una vez
                  </Text>
                </TouchableOpacity>
              </View>

              {type === 'once' && (
                <TouchableOpacity
                  style={tasksStyles.dateBtn}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text>📅</Text>
                  <Text style={tasksStyles.dateBtnText}>{formattedDate}</Text>
                </TouchableOpacity>
              )}

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  minimumDate={new Date()}
                  onChange={(_, selected) => {
                    setShowDatePicker(false);
                    if (selected) setDate(selected);
                  }}
                />
              )}

              <TouchableOpacity
                style={tasksStyles.dateBtn}
                onPress={() => setShowTimePicker(true)}
              >
                <Text>⏰</Text>
                <Text style={tasksStyles.dateBtnText}>
                  {time ? `Recordatorio: ${time}` : 'Agregar recordatorio'}
                </Text>
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  value={(() => {
                    if (!time) return new Date();
                    const [h, m] = time.split(':');
                    const d = new Date();
                    d.setHours(Number(h), Number(m), 0, 0);
                    return d;
                  })()}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={(_, selected) => {
                    setShowTimePicker(false);
                    if (selected) {
                      const h = selected.getHours().toString().padStart(2, '0');
                      const m = selected
                        .getMinutes()
                        .toString()
                        .padStart(2, '0');
                      setTime(`${h}:${m}`);
                    }
                  }}
                />
              )}

              <Button
                label={isEditing ? 'Guardar cambios' : 'Guardar tarea'}
                onPress={handleSave}
                isLoading={isLoading}
              />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
}

export default CreateTaskModal;
