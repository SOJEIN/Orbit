import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from '@/app/navigation/RootNavigator';
import { useAuth } from '@/hooks/useAuth';

function AppContent() {
  useAuth();
  return <RootNavigator />;
}
function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

export default App;
