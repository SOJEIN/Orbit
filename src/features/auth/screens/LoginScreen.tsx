import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { authStyles } from '../styles/Auth.styles';
import { authService } from '@/services/firebase/auth/authService';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const hanleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Completa todos los datos');
      return;
    }

    try {
      setIsLoading(true);
      await authService.signIn(email, password);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Orbit</Text>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        label="Iniciar sesión"
        onPress={hanleLogin}
        isLoading={isLoading}
      />
    </View>
  );
}

export default LoginScreen;
