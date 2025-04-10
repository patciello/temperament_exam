import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();

  const signUpWithGoogle = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      console.log('Starting Google OAuth sign-up flow');

      // Detect if we're in web environment
      const isWeb = Platform.OS === 'web';
      console.log('Platform:', Platform.OS);

      if (isWeb) {
        // Web-specific approach
        console.log('Using web OAuth approach');
        await signUp.authenticateWithRedirect({
          strategy: 'oauth_google',
          redirectUrl: 'http://localhost:8081/oauth-callback',
          redirectUrlComplete: 'http://localhost:8081/oauth-callback',
        });
      } else {
        // Native-specific approach for Android
        console.log('Using simplified native OAuth approach for Android');

        try {
          // For Android, we'll use a very simple approach
          // Just open the Google OAuth URL directly
          const redirectUrl = 'myapp://oauth-callback';

          // Skip Clerk's OAuth flow entirely for Android
          // We'll just redirect the user directly to Google's OAuth page
          console.log(
            'Bypassing Clerk for Android, redirecting directly to Google'
          );

          // Alert the user about the process
          Alert.alert(
            'Autenticação Google',
            'Você será redirecionado para fazer login com sua conta Google.',
            [
              {
                text: 'Continuar',
                onPress: () => {
                  // After alert, redirect to Google sign-in page
                  Linking.openURL(
                    'https://accounts.google.com/o/oauth2/v2/auth?client_id=1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com&redirect_uri=' +
                      encodeURIComponent(redirectUrl) +
                      '&response_type=code&scope=email%20profile'
                  );
                },
              },
              {
                text: 'Cancelar',
                style: 'cancel',
              },
            ]
          );
        } catch (error) {
          console.error('Android OAuth error:', error);
          Alert.alert(
            'Erro de cadastro',
            'Não foi possível iniciar o processo de cadastro com Google. Tente novamente.'
          );
        }
      }
    } catch (err) {
      console.error('OAuth error', err);
      Alert.alert(
        'Erro de cadastro',
        'Não foi possível iniciar o processo de cadastro com Google. Tente novamente.'
      );
    }
  };

  const navigateToSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Crie sua Conta</Text>
        <Text style={styles.subtitle}>
          Comece sua jornada de autoconhecimento
        </Text>

        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.description}>
          Crie uma conta para salvar seus resultados e acompanhar sua evolução
          ao longo do tempo.
        </Text>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={signUpWithGoogle}
          disabled={!isLoaded}
        >
          <View style={styles.googleIconContainer}>
            <Text style={styles.googleIconText}>G</Text>
          </View>
          <Text style={styles.buttonText}>Cadastrar com Google</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={navigateToSignIn}>
            <Text style={styles.signInText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#CCCCCC',
    marginBottom: 30,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: '#BBBBBB',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    maxWidth: 300,
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  googleIconText: {
    color: '#4285F4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  footerText: {
    color: '#BBBBBB',
    marginRight: 5,
  },
  signInText: {
    color: '#4285F4',
    fontWeight: '600',
  },
});
