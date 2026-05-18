import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const authService = {
  signIn: (email: string, password: string) =>
    auth().signInWithEmailAndPassword(email, password),

  signUp: (email: string, password: string) =>
    auth().createUserWithEmailAndPassword(email, password),

  signOut: () => auth().signOut(),

  onAuthStateChanged: (callback: (user: any) => void) =>
    auth().onAuthStateChanged(callback),

  signInWithGoogle: async () => {
    await GoogleSignin.hasPlayServices();
    const { data } = await GoogleSignin.signIn();
    if (!data?.idToken) throw new Error('No se obtuvo idToken de Google');
    const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
    return auth().signInWithCredential(googleCredential);
  },
};
