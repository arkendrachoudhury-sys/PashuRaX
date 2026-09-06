import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { authService } from '../services/auth';
import '../i18n';

export default function Layout() {
  const { isAuthenticated, setAuth } = useAuthStore();

  useEffect(() => {
    authService.getStoredToken().then(token => {
      if (token) {
        setAuth({}, token);
      }
    });
  }, []);

  return (
    <Stack>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
