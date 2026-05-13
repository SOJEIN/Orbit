import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth/authStore';
import { authService } from '@/services/firebase/auth/authService';

export const useAuth = () => {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(user => {
      setUser(user ? { uid: user.uid, email: user.email } : null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
};
