import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSingning = () => {
  GoogleSignin.configure({
    webClientId:
      '356105576354-94cftcbut736s50ivp289s5o63tjgma2.apps.googleusercontent.com',
  });
};
