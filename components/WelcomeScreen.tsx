import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Teste de Temperamento</Text>
        <Text style={styles.subtitle}>
          Descubra seu temperamento predominante
        </Text>

        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.description}>
          Este teste ajudará você a identificar seu temperamento predominante
          entre os quatro tipos clássicos: Sanguíneo, Colérico, Melancólico e
          Fleumático.
        </Text>

        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark.background,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.dark.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: theme.dark.subtext,
    marginBottom: 40,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  description: {
    fontSize: 16,
    color: theme.dark.subtext,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: theme.dark.quiz.buttonBackground,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  buttonText: {
    color: theme.dark.quiz.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
