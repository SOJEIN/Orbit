import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authStyles } from '../styles/Auth.styles';
import { authService } from '@/services/firebase/auth/authService';
import { AuthStackParamList } from '@/types/navigation';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'El nombre es requerido';
    if (!email.trim()) next.email = 'El correo es requerido';
    if (password.length < 6) next.password = 'Mínimo 6 caracteres';
    if (password !== confirmPassword) next.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    try {
      setIsLoading(true);
      await authService.signUp(email, password);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={authStyles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={authStyles.header}>
        <View style={authStyles.logoWrap}>
          <Text style={authStyles.logoText}>O</Text>
        </View>
        <Text style={authStyles.appName}>Orbit</Text>
        <Text style={authStyles.tagline}>Organiza tu vida</Text>
      </View>

      <ScrollView
        style={authStyles.card}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={authStyles.cardTitle}>Crear cuenta</Text>

        <Input
          label="Nombre"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          error={errors.name}
        />
        <Input
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />
        <Input
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />
        <Input
          label="Confirmar contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={errors.confirmPassword}
        />

        <Button
          label="Registrarme"
          onPress={handleRegister}
          isLoading={isLoading}
        />

        <View style={authStyles.footer}>
          <Text style={authStyles.footerText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={authStyles.footerLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;
