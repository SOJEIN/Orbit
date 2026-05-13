import { StyleSheet } from 'react-native';

export const buttonStyle = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },

  primary: {
    backgroundColor: '#6C63FF',
  },

  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6C63FF',
  },

  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
