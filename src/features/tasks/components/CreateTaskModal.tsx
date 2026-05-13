import React, { useState } from 'react';
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
import { useCreateTaskMutation } from '../api/tasksApi';
import { today } from '../utils/taskHelpers';
import { tasksStyles } from '../styles/Tasks.styles';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

interface Props {
  visible: boolean;
  onClose: () => void;
}

function CreateTaskModal({ visible, onClose }: Props) {
  const { user } = useAuthStore();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'daily' | 'once'>('daily');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const reset = () => {
    setTitle('');
    setDescription('');
    setType('daily');
    setDate(new Date());
    setShowDatePicker(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título es requerido');
      return;
    }
    const result = await createTask({
      title: title.trim(),
      description: description.trim(),
      type,
      date: type === 'once' ? date.toISOString().split('T')[0] : today(),
      completedDate: null,
      userId: user!.uid,
    });

    if ('error' in result) {
      Alert.alert('Error', 'No se pudo guardar la tarea');
      return;
    }

    handleClose();
  };

  const formattedDate = date.toLocaleDateString('es-CO', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  });

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <TouchableOpacity style={tasksStyles.overlay} activeOpacity={1} onPress={handleClose}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <TouchableOpacity activeOpacity={1}>
            <View style={tasksStyles.modalCard}>
              <View style={tasksStyles.modalHandle} />

              <Text style={tasksStyles.modalTitle}>Nueva tarea</Text>

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

              <Text style={{ fontSize: 13, fontWeight: '600', color: '#4A4A6A', marginBottom: 8 }}>
                Tipo de tarea
              </Text>
              <View style={tasksStyles.typeSelector}>
                <TouchableOpacity
                  style={[tasksStyles.typeBtn, type === 'daily' && tasksStyles.typeBtnActive]}
                  onPress={() => setType('daily')}
                >
                  <Text style={[tasksStyles.typeBtnText, type === 'daily' && tasksStyles.typeBtnTextActive]}>
                    🔁  Diaria
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[tasksStyles.typeBtn, type === 'once' && tasksStyles.typeBtnActive]}
                  onPress={() => setType('once')}
                >
                  <Text style={[tasksStyles.typeBtnText, type === 'once' && tasksStyles.typeBtnTextActive]}>
                    📅  Una vez
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

              <Button label="Guardar tarea" onPress={handleSave} isLoading={isLoading} />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
}

export default CreateTaskModal;
