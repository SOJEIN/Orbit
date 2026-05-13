import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { buttonStyle } from './style/Button.style';

interface ButtonProps {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

function Button({
  label,
  onPress,
  isLoading,
  variant = 'primary',
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[buttonStyle.button, buttonStyle[variant]]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={buttonStyle.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

export default Button;
