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

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Completa todos los campos');
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

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await authService.signInWithGoogle();
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
        <Text style={authStyles.cardTitle}>Iniciar sesión</Text>

        <Input
          label="Correo electrónico"
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
          onPress={handleLogin}
          isLoading={isLoading}
        />

        <View style={authStyles.divider}>
          <View style={authStyles.dividerLine} />
          <Text style={authStyles.dividerText}>o</Text>
          <View style={authStyles.dividerLine} />
        </View>

        <TouchableOpacity
          style={authStyles.googleButton}
          onPress={handleGoogleLogin}
          disabled={isLoading}
        >
          <Text style={authStyles.googleLetter}>G</Text>
          <Text style={authStyles.googleButtonText}>Continuar con Google</Text>
        </TouchableOpacity>

        <View style={authStyles.footer}>
          <Text style={authStyles.footerText}>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={authStyles.footerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
