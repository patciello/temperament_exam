import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();

  // If not loaded yet, don't redirect
  if (!isLoaded) return null;

  // If signed in, redirect to quiz, otherwise to sign-in
  return isSignedIn ? (
    <Redirect href="/(tabs)/quiz" />
  ) : (
    <Redirect href="/sign-in" />
  );
}
