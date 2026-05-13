import auth from '@react-native-firebase/auth';

export const authService = {
  signIn: (email: string, password: string) =>
    auth().signInWithEmailAndPassword(email, password),

  signUp: (email: string, password: string) =>
    auth().createUserWithEmailAndPassword(email, password),

  signOut: () => auth().signOut(),

  onAuthStateChanged: (callback: (user: any) => void) =>
    auth().onAuthStateChanged(callback),
};
