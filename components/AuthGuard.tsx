import React, { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { ActivityIndicator, View } from 'react-native';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(tabs)';
    const inAuthScreen = segments[0] === 'sign-in' || segments[0] === 'sign-up';
    const inCallbackScreen = segments[0] === 'oauth-callback';

    console.log('AuthGuard - Current segments:', segments);
    console.log('AuthGuard - isSignedIn:', isSignedIn);

    // Don't redirect if we're in the OAuth callback screen
    if (inCallbackScreen) {
      console.log('AuthGuard - In OAuth callback, not redirecting');
      return;
    }

    // Use a small delay to ensure state is updated
    const timer = setTimeout(() => {
      if (!isSignedIn && inAuthGroup) {
        // Redirect to the sign-in page if user is not authenticated
        // and trying to access protected routes
        console.log('AuthGuard - Not signed in, redirecting to sign-in');
        router.replace('/sign-in');
      } else if (isSignedIn && inAuthScreen) {
        // Redirect to the main app if user is authenticated
        // and trying to access auth routes
        console.log('AuthGuard - Signed in, redirecting to quiz');
        router.replace('/(tabs)/quiz');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [isSignedIn, segments, isLoaded, router]);

  if (!isLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#121212',
        }}
      >
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return <>{children}</>;
}
