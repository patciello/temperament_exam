import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@/utils/tokenCache';
import AuthGuard from '@/components/AuthGuard';

export default function RootLayout() {
  useFrameworkReady();
  // App uses dark mode by default

  // Use the publishable key from environment variable
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error('Missing Clerk publishable key');
  }

  console.log('Using Clerk publishable key:', publishableKey);

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <AuthGuard>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#121212' },
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="oauth-callback" />
          </Stack>
          <StatusBar style="light" />
        </SafeAreaProvider>
      </AuthGuard>
    </ClerkProvider>
  );
}
