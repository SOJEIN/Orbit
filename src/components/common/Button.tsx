import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { buttonStyle } from './style/Button.style';

interface ButtonProps {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

function Button({ label, onPress, isLoading, variant = 'primary' }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[buttonStyle.button, buttonStyle[variant]]}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'secondary' ? '#6C63FF' : '#fff'} />
      ) : (
        <Text
          style={[
            buttonStyle.label,
            variant === 'secondary' && buttonStyle.labelSecondary,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default Button;
