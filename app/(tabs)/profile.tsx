import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const temperamentInfo = {
  Sanguíneo: {
    description: 'Extrovertido, animado e sociável. Você é entusiasta e gosta de estar com pessoas.',
    image: 'https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?auto=format&fit=crop&q=80&w=500',
  },
  Colérico: {
    description: 'Ambicioso, decidido e determinado. Você é um líder nato e orientado a objetivos.',
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80&w=500',
  },
  Melancólico: {
    description: 'Analítico, pensativo e detalhista. Você é criativo e aprecia estrutura.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=500',
  },
  Fleumático: {
    description: 'Calmo, relaxado e tranquilo. Você é pacífico e apoiador dos outros.',
    image: 'https://images.unsplash.com/photo-1471898554234-bcbfedd35134?auto=format&fit=crop&q=80&w=500',
  },
};

export default function ProfileScreen() {
  const { results } = useLocalSearchParams<{ results: string }>();
  const temperaments = results ? JSON.parse(results) as (keyof typeof temperamentInfo)[] : null;

  if (!temperaments) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Faça o teste para ver seus resultados!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Seu{temperaments.length > 1 ? 's' : ''} Temperamento{temperaments.length > 1 ? 's' : ''}</Text>
        {temperaments.map((temperament, index) => (
          <View key={temperament} style={styles.resultContainer}>
            {index > 0 && <View style={styles.divider} />}
            <Text style={styles.result}>{temperament}</Text>
            <Image
              source={{ uri: temperamentInfo[temperament].image }}
              style={styles.image}
            />
            <Text style={styles.description}>{temperamentInfo[temperament].description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultContainer: {
    marginBottom: 32,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 24,
  },
  result: {
    fontSize: 32,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#666',
  },
});