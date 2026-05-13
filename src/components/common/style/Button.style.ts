import { StyleSheet } from 'react-native';

export const buttonStyle = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },

  primary: {
    backgroundColor: '#6C63FF',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 7,
  },

  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#6C63FF',
  },

  label: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#fff',
  },

  labelSecondary: {
    color: '#6C63FF',
  },
});
