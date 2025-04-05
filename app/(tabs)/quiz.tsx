import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { questions } from '@/data/questions';
import { ArrowLeft, RotateCcw } from 'lucide-react-native';

export default function QuizScreen() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      const results = calculateTemperaments(newAnswers);
      router.push({
        pathname: '/resultados',
        params: { results: JSON.stringify(results) },
      });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const calculateTemperaments = (scores: number[]): string[] => {
    const categories = {
      Sanguíneo: 0,
      Colérico: 0,
      Melancólico: 0,
      Fleumático: 0,
    };

    // Count scores for each category
    scores.forEach((score, index) => {
      const category = questions[index].category;
      categories[category as keyof typeof categories] += score;
    });

    // Find the highest score
    const maxScore = Math.max(...Object.values(categories));

    // Get all temperaments with the highest score (handles ties)
    const highestTemperaments = Object.entries(categories)
      .filter(([_, score]) => score === maxScore)
      .map(([temperament]) => temperament);

    // Return only the first highest temperament (or the only one if no tie)
    return [highestTemperaments[0]];
  };

  if (currentQuestion >= questions.length) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          {currentQuestion > 0 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <ArrowLeft size={24} color="#007AFF" />
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
            <RotateCcw size={20} color="#007AFF" />
            <Text style={styles.retakeText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.progress}>
          Questão {currentQuestion + 1} de {questions.length}
        </Text>
        <Text style={styles.question}>{questions[currentQuestion].text}</Text>
        <View style={styles.options}>
          {[1, 2, 3, 4, 5].map((score) => (
            <TouchableOpacity
              key={score}
              style={styles.option}
              onPress={() => handleAnswer(score)}
            >
              <Text style={styles.optionText}>{score}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.legend}>
          <Text style={styles.legendText}>1 = Discordo Totalmente</Text>
          <Text style={styles.legendText}>5 = Concordo Totalmente</Text>
        </View>
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
    minHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  retakeText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#007AFF',
  },
  progress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 32,
    lineHeight: 32,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  option: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  legend: {
    marginTop: 20,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});
