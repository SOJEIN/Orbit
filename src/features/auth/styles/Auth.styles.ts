import { StyleSheet, Platform } from 'react-native';

export const authStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#6C63FF',
  },

  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: 36,
    alignItems: 'center',
  },

  logoWrap: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  logoText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
  },

  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.5,
  },

  tagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 5,
    letterSpacing: 0.5,
  },

  card: {
    flex: 1,
    backgroundColor: '#F7F6FF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 24,
  },

  cardTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 24,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
    paddingBottom: 8,
  },

  footerText: {
    fontSize: 14,
    color: '#8A8A8A',
  },

  footerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6C63FF',
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0DFF5',
  },

  dividerText: {
    fontSize: 12,
    color: '#AEAEC0',
    marginHorizontal: 12,
    letterSpacing: 0.5,
  },

  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0DFF5',
    backgroundColor: '#fff',
    marginBottom: 8,
    gap: 10,
  },

  googleLetter: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4285F4',
  },

  googleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
  },
});
