import { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { useAuth, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Linking from 'expo-linking';

export default function OAuthCallback() {
  const { isSignedIn } = useAuth();
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    // Add a small delay to ensure the Root Layout is mounted
    const timer = setTimeout(() => {
      processOAuthCallback();
    }, 500);

    return () => clearTimeout(timer);
  }, [
    isSignedIn,
    router,
    signIn,
    signUp,
    params,
    setSignInActive,
    setSignUpActive,
  ]);

  const processOAuthCallback = async () => {
    try {
      console.log('OAuth callback params:', params);
      console.log('isSignedIn:', isSignedIn);
      console.log('signIn available:', !!signIn);
      console.log('signUp available:', !!signUp);

      // Detect if we're in web environment
      const isWeb = Platform.OS === 'web';
      console.log('Platform:', Platform.OS);

      // Get the URL that opened this screen (different approach for web vs native)
      let callbackUrl;
      if (isWeb) {
        // In web environment, use the current window location
        callbackUrl = window.location.href;
        console.log('Web URL:', callbackUrl);
      } else {
        // In native environment, use Linking API
        callbackUrl = await Linking.getInitialURL();
        console.log('Native URL:', callbackUrl);
      }

      // First check if user is already signed in
      if (isSignedIn) {
        console.log('User is already signed in, redirecting to quiz');
        router.replace('/(tabs)/quiz');
        return;
      }

      // Check if we have a session token in the URL params
      if (params.__clerk_status === 'complete') {
        console.log('Clerk authentication complete');

        // If we have a created session ID, activate it
        if (params.createdSessionId) {
          console.log('Created session ID found:', params.createdSessionId);
          try {
            if (signIn) {
              await setSignInActive({
                session: params.createdSessionId as string,
              });
              console.log('Session activated successfully');
              router.replace('/(tabs)/quiz');
              return;
            }
          } catch (error) {
            console.error('Error activating session:', error);
            Alert.alert(
              'Erro de autenticação',
              'Não foi possível ativar a sessão. Tente novamente.'
            );
            router.replace('/sign-in');
            return;
          }
        }
      }

      // If we have a URL but no session ID, try to parse it manually
      if (callbackUrl) {
        try {
          console.log('Attempting to parse callback URL manually');

          // Different parsing approach for web vs native
          let sessionId;
          if (isWeb) {
            // For web, create URL object and get search params
            const urlObj = new URL(callbackUrl);
            sessionId = urlObj.searchParams.get('createdSessionId');
            console.log('Web sessionId from URL:', sessionId);

            // For web, also check for __clerk_status in the URL
            const clerkStatus = urlObj.searchParams.get('__clerk_status');
            console.log('Web clerk_status from URL:', clerkStatus);

            // If we have a complete status but no session ID, try to get the user session
            if (clerkStatus === 'complete' && !sessionId) {
              console.log(
                'Clerk status is complete, checking if user is signed in'
              );

              // Wait a moment for Clerk to finish processing
              await new Promise((resolve) => setTimeout(resolve, 1000));

              // Check if the user is now signed in
              if (isSignedIn) {
                console.log(
                  'User is now signed in after callback, redirecting to quiz'
                );
                router.replace('/(tabs)/quiz');
                return;
              }
            }
          } else {
            // For native, parse the URL manually
            const urlParts = callbackUrl.split('?');
            if (urlParts.length > 1) {
              const queryParams = new URLSearchParams(urlParts[1]);
              sessionId = queryParams.get('createdSessionId');
              console.log('Native sessionId from URL:', sessionId);
            }
          }

          if (sessionId && signIn) {
            await setSignInActive({
              session: sessionId,
            });
            console.log('Session activated successfully from URL params');
            router.replace('/(tabs)/quiz');
            return;
          }
        } catch (error) {
          console.error('Error parsing callback URL:', error);
        }
      }

      // If we get here and nothing worked, go back to sign-in
      console.log('Authentication flow incomplete, redirecting to sign-in');
      router.replace('/sign-in');
    } catch (err) {
      console.error('Error processing OAuth callback:', err);
      Alert.alert(
        'Erro de autenticação',
        'Ocorreu um erro durante o processo de autenticação. Tente novamente.'
      );
      router.replace('/sign-in');
    }
  };

  // The useEffect above handles calling processOAuthCallback

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFFFFF" />
      <Text style={styles.text}>Processando autenticação...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  text: {
    color: '#FFFFFF',
    marginTop: 20,
    fontSize: 16,
  },
});
