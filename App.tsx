import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import BootSplash from 'react-native-bootsplash';
import { store } from '@/store/index';
import RootNavigator from '@/app/navigation/RootNavigator';
import { useAuth } from '@/hooks/useAuth';
import { configureGoogleSingning } from '@/services/firebase/auth/googleAuthService';
import { notificationService } from '@/services/notifications/notificationService';

configureGoogleSingning();
function AppContent() {
  useAuth();

  useEffect(() => {
    BootSplash.hide({ fade: true });
    notificationService.requestPermission();
  }, []);

  return <RootNavigator />;
}

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
