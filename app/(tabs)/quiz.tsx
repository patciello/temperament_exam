import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { questions } from '@/data/questions';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react-native';
import WelcomeScreen from '@/components/WelcomeScreen';
import VerticalSlider from '@/components/VerticalSlider';

export default function QuizScreen() {
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [sliderValue, setSliderValue] = useState(3); // Default to middle value

  const handleAnswer = () => {
    const newAnswers = [...answers, sliderValue];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSliderValue(3); // Reset slider to middle value for next question
    } else {
      // Calculate results
      const results = calculateTemperaments(newAnswers);

      // Calculate scores for each temperament
      const categories = {
        Sanguíneo: 0,
        Colérico: 0,
        Melancólico: 0,
        Fleumático: 0,
      };

      // Count scores for each category
      newAnswers.forEach((score, index) => {
        const category = questions[index].category;
        categories[category as keyof typeof categories] += score;
      });

      // Get scores for primary and secondary temperaments
      const primaryScore = categories[results[0] as keyof typeof categories];
      const secondaryScore =
        results.length > 1
          ? categories[results[1] as keyof typeof categories]
          : 0;

      // Reset to welcome screen after completing the quiz
      setShowWelcome(true);
      setCurrentQuestion(0);
      setAnswers([]);

      // Navigate to results
      router.push({
        pathname: '/resultados',
        params: {
          results: JSON.stringify(results),
          primaryScore: primaryScore.toString(),
          secondaryScore: secondaryScore.toString(),
        },
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
    setShowWelcome(true);
    setSliderValue(3);
  };

  const handleStartQuiz = () => {
    setShowWelcome(false);
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

    // Sort temperaments by score (highest first)
    const sortedTemperaments = Object.entries(categories)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .map(([temperament]) => temperament);

    // Return top two temperaments
    return sortedTemperaments.slice(0, 2);
  };

  if (currentQuestion >= questions.length) {
    return null;
  }

  if (showWelcome) {
    return <WelcomeScreen onStart={handleStartQuiz} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={handleRetake}
            >
              <RotateCcw size={20} color={theme.dark.text} />
              <Text style={styles.retakeText}>Reiniciar</Text>
            </TouchableOpacity>
          </View>

          {/* Botão de navegação para a questão anterior */}
          {currentQuestion > 0 && (
            <TouchableOpacity
              style={styles.backArrowButton}
              onPress={handleBack}
            >
              <ChevronLeft
                size={36}
                color={theme.dark.text}
                strokeWidth={2.5}
              />
            </TouchableOpacity>
          )}

          {/* Progress indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(currentQuestion / questions.length) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progress}>
              Questão {currentQuestion + 1} de {questions.length}
            </Text>
          </View>

          <View style={styles.questionCard}>
            <Text style={styles.question}>
              {questions[currentQuestion].text}
            </Text>
          </View>

          {/* Slider Vertical Personalizado */}
          <View style={styles.sliderContainer}>
            <View style={styles.sliderLabelsContainer}>
              <Text style={styles.sliderLabelTop}>👍 Concordo</Text>

              <VerticalSlider
                value={sliderValue}
                onValueChange={setSliderValue}
                min={1}
                max={5}
                height={280}
                width={120}
              />

              <Text style={styles.sliderLabelBottom}>👎 Discordo</Text>
            </View>
          </View>

          {/* Botão de navegação para a próxima questão */}
          <TouchableOpacity
            style={styles.nextArrowButton}
            onPress={handleAnswer}
            disabled={false} // Removida a condição que desabilitava o botão
          >
            {currentQuestion < questions.length - 1 ? (
              <ChevronRight
                size={36}
                color={theme.dark.text}
                strokeWidth={2.5}
              />
            ) : (
              <Text style={styles.finishButtonText}>Finalizar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark.quiz.background,
  },
  content: {
    padding: 20,
    minHeight: '100%',
    position: 'relative',
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
    color: theme.dark.text,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  retakeText: {
    marginLeft: 4,
    fontSize: 14,
    color: theme.dark.text,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.dark.quiz.progressBar,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.dark.quiz.progressFill,
    borderRadius: 4,
  },
  progress: {
    fontSize: 14,
    color: theme.dark.subtext,
    textAlign: 'center',
  },
  questionCard: {
    backgroundColor: theme.dark.quiz.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  question: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    color: theme.dark.text,
    textAlign: 'left',
  },
  sliderContainer: {
    marginBottom: 40,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'center',
    marginLeft: -10, // Movido mais para a esquerda
  },
  sliderLabelsContainer: {
    height: 380,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderLabelTop: {
    fontSize: 18,
    color: theme.dark.subtext,
    marginBottom: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  sliderLabelBottom: {
    fontSize: 18,
    color: theme.dark.subtext,
    marginTop: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  sliderValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  sliderValue: {
    fontSize: 16,
    color: theme.dark.subtext,
    width: 30,
    textAlign: 'center',
  },
  selectedValue: {
    color: theme.dark.text,
    fontWeight: 'bold',
    fontSize: 18,
  },
  backArrowButton: {
    position: 'absolute',
    left: 15,
    top: '50%',
    marginTop: 70, // Ajustado para alinhar com o centro da barra do slider
    backgroundColor: theme.dark.quiz.buttonBackground,
    width: 50,
    height: 70,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
  nextArrowButton: {
    position: 'absolute',
    right: 15,
    top: '50%',
    marginTop: 70, // Ajustado para alinhar com o centro da barra do slider
    backgroundColor: theme.dark.quiz.buttonBackground,
    width: 50,
    height: 70,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
  finishButtonText: {
    color: theme.dark.quiz.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
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
    backgroundColor: theme.dark.quiz.buttonBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    color: theme.dark.quiz.buttonText,
    fontSize: 20,
    fontWeight: '600',
  },
  legend: {
    marginTop: 20,
  },
  legendText: {
    fontSize: 14,
    color: theme.dark.subtext,
    marginBottom: 4,
  },
});
