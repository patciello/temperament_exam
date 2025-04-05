import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import CompatibilityTable from '@/components/RadarChartComponent';

const temperamentInfo = {
  Sanguíneo: {
    description:
      'Extrovertido, animado e sociável. Você é entusiasta e gosta de estar com pessoas.',
    image:
      'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=500',
    strengths: ['Comunicativo', 'Entusiasta', 'Sociável', 'Expressivo'],
    weaknesses: ['Desorganizado', 'Indisciplinado', 'Impulsivo', 'Esquecido'],
    improvements:
      'Trabalhe em sua organização e disciplina. Estabeleça rotinas e use lembretes para tarefas importantes.',
    verses: [
      'Provérbios 16:32 - "Melhor é o homem paciente do que o guerreiro, mais vale controlar o seu espírito do que conquistar uma cidade."',
      'Filipenses 4:5 - "Seja a vossa moderação conhecida de todos os homens."',
    ],
    apostle:
      'Pedro - O apóstolo Pedro demonstrava características sanguíneas em sua personalidade impulsiva, entusiasta e expressiva. Ele era rápido para falar e agir, como quando caminhou sobre as águas (Mateus 14:28-29) ou quando cortou a orelha do servo do sumo sacerdote (João 18:10).',
  },
  Colérico: {
    description:
      'Ambicioso, decidido e determinado. Você é um líder nato e orientado a objetivos.',
    image:
      'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80&w=500',
    strengths: ['Determinado', 'Líder', 'Produtivo', 'Decisivo'],
    weaknesses: ['Impaciente', 'Dominador', 'Insensível', 'Autoritário'],
    improvements:
      'Desenvolva mais empatia e paciência com os outros. Pratique ouvir mais e falar menos.',
    verses: [
      'Tiago 1:19 - "Todo homem seja pronto para ouvir, tardio para falar, tardio para se irar."',
      'Efésios 4:2 - "Com toda a humildade e mansidão, com longanimidade, suportando-vos uns aos outros em amor."',
    ],
    apostle:
      'Paulo - O apóstolo Paulo demonstrava características coléricas em sua personalidade determinada, focada e orientada a objetivos. Ele era um líder nato que estabeleceu igrejas por toda a Ásia Menor e Europa, enfrentando oposição com coragem e determinação (Atos 20:22-24).',
  },
  Melancólico: {
    description:
      'Analítico, pensativo e detalhista. Você é criativo e aprecia estrutura.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=500',
    strengths: ['Analítico', 'Detalhista', 'Organizado', 'Perfeccionista'],
    weaknesses: ['Pessimista', 'Crítico', 'Rígido', 'Indeciso'],
    improvements:
      'Trabalhe para ser mais otimista e menos crítico. Aprenda a aceitar imperfeições e a tomar decisões mais rapidamente.',
    verses: [
      'Filipenses 4:8 - "Finalmente, irmãos, tudo o que é verdadeiro, tudo o que é honesto, tudo o que é justo, tudo o que é puro, tudo o que é amável, tudo o que é de boa fama, se há alguma virtude, e se há algum louvor, nisso pensai."',
      'Isaías 41:10 - "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça."',
    ],
    apostle:
      'Tomé - O apóstolo Tomé demonstrava características melancólicas em sua personalidade analítica e questionadora. Ele precisava de evidências concretas antes de acreditar, como quando duvidou da ressurreição de Jesus até ver as marcas dos pregos (João 20:24-29).',
  },
  Fleumático: {
    description:
      'Calmo, relaxado e tranquilo. Você é pacífico e apoiador dos outros.',
    image:
      'https://images.unsplash.com/photo-1471898554234-bcbfedd35134?auto=format&fit=crop&q=80&w=500',
    strengths: ['Calmo', 'Paciente', 'Diplomático', 'Confiável'],
    weaknesses: ['Passivo', 'Indeciso', 'Desmotivado', 'Resistente a mudanças'],
    improvements:
      'Desenvolva mais iniciativa e disposição para mudanças. Estabeleça metas pessoais e trabalhe para alcançá-las.',
    verses: [
      '2 Timóteo 1:7 - "Porque Deus não nos deu espírito de covardia, mas de poder, de amor e de moderação."',
      'Josué 1:9 - "Não to mandei eu? Esforça-te, e tem bom ânimo; não temas, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares."',
    ],
    apostle:
      'João - O apóstolo João demonstrava características fleumáticas em sua personalidade calma, paciente e amorosa. Ele é frequentemente chamado de "o discípulo amado" e seus escritos enfatizam o amor e a paz (1 João 4:7-8).',
  },
};

export default function ResultadosScreen() {
  const {
    results,
    primaryScore: primaryScoreParam,
    secondaryScore: secondaryScoreParam,
  } = useLocalSearchParams<{
    results: string;
    primaryScore: string;
    secondaryScore: string;
  }>();

  // Converter os scores de string para número
  const primaryScore = primaryScoreParam ? parseInt(primaryScoreParam, 10) : 70;
  const secondaryScore = secondaryScoreParam
    ? parseInt(secondaryScoreParam, 10)
    : 30;
  const temperaments = results ? (JSON.parse(results) as string[]) : null;

  // Get primary temperament
  const primaryTemperament = temperaments
    ? (temperaments[0] as keyof typeof temperamentInfo)
    : null;

  // Get secondary temperament if available
  const secondaryTemperament =
    temperaments && temperaments.length > 1
      ? (temperaments[1] as keyof typeof temperamentInfo)
      : null;

  // Create combined temperament display name
  const temperamentType = primaryTemperament
    ? secondaryTemperament
      ? `${primaryTemperament}-${secondaryTemperament}`
      : primaryTemperament
    : null;

  if (!primaryTemperament) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Faça o teste para ver seus resultados!</Text>
      </SafeAreaView>
    );
  }

  // Use primary temperament info for display
  const info = temperamentInfo[primaryTemperament];

  // Create dynamic styles based on primary temperament
  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor:
        primaryTemperament === 'Colérico'
          ? '#1A0000'
          : primaryTemperament === 'Sanguíneo'
          ? '#1A1A00'
          : primaryTemperament === 'Fleumático'
          ? '#001A00'
          : primaryTemperament === 'Melancólico'
          ? '#00001A'
          : theme.dark.background,
    },

    result: {
      color:
        primaryTemperament === 'Colérico'
          ? '#FF5555'
          : primaryTemperament === 'Sanguíneo'
          ? '#FFFF55'
          : primaryTemperament === 'Fleumático'
          ? '#55FF55'
          : primaryTemperament === 'Melancólico'
          ? '#5555FF'
          : '#007AFF',
    },
    traitItem: {
      backgroundColor:
        primaryTemperament === 'Colérico'
          ? '#330000'
          : primaryTemperament === 'Sanguíneo'
          ? '#333300'
          : primaryTemperament === 'Fleumático'
          ? '#003300'
          : primaryTemperament === 'Melancólico'
          ? '#000033'
          : '#333',
    },
    traitText: {
      color:
        primaryTemperament === 'Colérico'
          ? '#FF8888'
          : primaryTemperament === 'Sanguíneo'
          ? '#FFFF88'
          : primaryTemperament === 'Fleumático'
          ? '#88FF88'
          : primaryTemperament === 'Melancólico'
          ? '#8888FF'
          : '#FFFFFF',
    },
  });

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Seu Temperamento</Text>
          <Text style={styles.result}>{temperamentType}</Text>

          {secondaryTemperament && (
            <Text style={styles.secondaryInfo}>
              Predominante: {primaryTemperament} com traços de{' '}
              {secondaryTemperament}
            </Text>
          )}

          <View style={styles.chartContainer}>
            <CompatibilityTable primaryTemperament={primaryTemperament || ''} />
          </View>

          <Text style={styles.description}>{info.description}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pontos Fortes</Text>
            <View style={styles.traits}>
              {info.strengths.map((strength, index) => (
                <View
                  key={`primary-${index}`}
                  style={[styles.traitItem, dynamicStyles.traitItem]}
                >
                  <Text style={[styles.traitText, dynamicStyles.traitText]}>
                    {strength}
                  </Text>
                </View>
              ))}

              {secondaryTemperament &&
                temperamentInfo[secondaryTemperament].strengths.map(
                  (strength, index) => (
                    <View
                      key={`secondary-${index}`}
                      style={[
                        styles.traitItem,
                        {
                          backgroundColor:
                            secondaryTemperament === 'Colérico'
                              ? '#330000'
                              : secondaryTemperament === 'Sanguíneo'
                              ? '#333300'
                              : secondaryTemperament === 'Fleumático'
                              ? '#003300'
                              : secondaryTemperament === 'Melancólico'
                              ? '#000033'
                              : '#333',
                          opacity: 0.8, // Slightly transparent to indicate secondary
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.traitText,
                          {
                            color:
                              secondaryTemperament === 'Colérico'
                                ? '#FF8888'
                                : secondaryTemperament === 'Sanguíneo'
                                ? '#FFFF88'
                                : secondaryTemperament === 'Fleumático'
                                ? '#88FF88'
                                : secondaryTemperament === 'Melancólico'
                                ? '#8888FF'
                                : '#FFFFFF',
                            fontSize: 14, // Slightly smaller to indicate secondary
                          },
                        ]}
                      >
                        {strength} ★
                      </Text>
                    </View>
                  )
                )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pontos Fracos</Text>
            <View style={styles.traits}>
              {info.weaknesses.map((weakness, index) => (
                <View
                  key={`primary-${index}`}
                  style={[styles.traitItem, dynamicStyles.traitItem]}
                >
                  <Text style={[styles.traitText, dynamicStyles.traitText]}>
                    {weakness}
                  </Text>
                </View>
              ))}

              {secondaryTemperament &&
                temperamentInfo[secondaryTemperament].weaknesses.map(
                  (weakness, index) => (
                    <View
                      key={`secondary-${index}`}
                      style={[
                        styles.traitItem,
                        {
                          backgroundColor:
                            secondaryTemperament === 'Colérico'
                              ? '#330000'
                              : secondaryTemperament === 'Sanguíneo'
                              ? '#333300'
                              : secondaryTemperament === 'Fleumático'
                              ? '#003300'
                              : secondaryTemperament === 'Melancólico'
                              ? '#000033'
                              : '#333',
                          opacity: 0.8, // Slightly transparent to indicate secondary
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.traitText,
                          {
                            color:
                              secondaryTemperament === 'Colérico'
                                ? '#FF8888'
                                : secondaryTemperament === 'Sanguíneo'
                                ? '#FFFF88'
                                : secondaryTemperament === 'Fleumático'
                                ? '#88FF88'
                                : secondaryTemperament === 'Melancólico'
                                ? '#8888FF'
                                : '#FFFFFF',
                            fontSize: 14, // Slightly smaller to indicate secondary
                          },
                        ]}
                      >
                        {weakness} ★
                      </Text>
                    </View>
                  )
                )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Como Melhorar</Text>
            <Text style={styles.paragraphText}>{info.improvements}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Apóstolo Relacionado</Text>
            <Text style={styles.paragraphText}>{info.apostle}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Versículos Bíblicos</Text>
            {info.verses.map((verse, index) => (
              <Text key={`primary-${index}`} style={styles.verseText}>
                {verse}
              </Text>
            ))}

            {secondaryTemperament && (
              <>
                <Text
                  style={[
                    styles.sectionSubtitle,
                    {
                      color:
                        secondaryTemperament === 'Colérico'
                          ? '#FF8888'
                          : secondaryTemperament === 'Sanguíneo'
                          ? '#FFFF88'
                          : secondaryTemperament === 'Fleumático'
                          ? '#88FF88'
                          : secondaryTemperament === 'Melancólico'
                          ? '#8888FF'
                          : '#FFFFFF',
                    },
                  ]}
                >
                  Versículos para o temperamento {secondaryTemperament}:
                </Text>
                {temperamentInfo[secondaryTemperament].verses.map(
                  (verse, index) => (
                    <Text
                      key={`secondary-${index}`}
                      style={[
                        styles.verseText,
                        {
                          color:
                            secondaryTemperament === 'Colérico'
                              ? '#FF8888'
                              : secondaryTemperament === 'Sanguíneo'
                              ? '#FFFF88'
                              : secondaryTemperament === 'Fleumático'
                              ? '#88FF88'
                              : secondaryTemperament === 'Melancólico'
                              ? '#8888FF'
                              : theme.dark.subtext,
                          opacity: 0.9,
                          fontStyle: 'italic',
                        },
                      ]}
                    >
                      {verse}
                    </Text>
                  )
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark.background,
  },
  content: {
    padding: 20,
    minHeight: '100%',
  },
  chartContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: theme.dark.text,
  },
  result: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.dark.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  secondaryInfo: {
    fontSize: 16,
    fontStyle: 'italic',
    color: theme.dark.subtext,
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
    color: theme.dark.text,
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: theme.dark.text,
  },
  traits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  traitItem: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  traitText: {
    color: theme.dark.text,
    fontWeight: '500',
  },
  paragraphText: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.dark.text,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.dark.subtext,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: theme.dark.text,
  },
});
