import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const temperamentInfo = {
  Sanguíneo: {
    description: 'Extrovertido, animado e sociável. Você é entusiasta e gosta de estar com pessoas.',
    image: 'https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?auto=format&fit=crop&q=80&w=500',
    strengths: ['Comunicativo', 'Entusiasta', 'Sociável', 'Expressivo'],
    weaknesses: ['Desorganizado', 'Indisciplinado', 'Impulsivo', 'Esquecido'],
    improvements: 'Trabalhe em sua organização e disciplina. Estabeleça rotinas e use lembretes para tarefas importantes.',
    verses: [
      'Provérbios 16:32 - "Melhor é o homem paciente do que o guerreiro, mais vale controlar o seu espírito do que conquistar uma cidade."',
      'Filipenses 4:5 - "Seja a vossa moderação conhecida de todos os homens."'
    ]
  },
  Colérico: {
    description: 'Ambicioso, decidido e determinado. Você é um líder nato e orientado a objetivos.',
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80&w=500',
    strengths: ['Determinado', 'Líder', 'Produtivo', 'Decisivo'],
    weaknesses: ['Impaciente', 'Dominador', 'Insensível', 'Autoritário'],
    improvements: 'Desenvolva mais empatia e paciência com os outros. Pratique ouvir mais e falar menos.',
    verses: [
      'Tiago 1:19 - "Todo homem seja pronto para ouvir, tardio para falar, tardio para se irar."',
      'Efésios 4:2 - "Com toda a humildade e mansidão, com longanimidade, suportando-vos uns aos outros em amor."'
    ]
  },
  Melancólico: {
    description: 'Analítico, pensativo e detalhista. Você é criativo e aprecia estrutura.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=500',
    strengths: ['Analítico', 'Detalhista', 'Organizado', 'Perfeccionista'],
    weaknesses: ['Pessimista', 'Crítico', 'Rígido', 'Indeciso'],
    improvements: 'Trabalhe para ser mais otimista e menos crítico. Aprenda a aceitar imperfeições e a tomar decisões mais rapidamente.',
    verses: [
      'Filipenses 4:8 - "Finalmente, irmãos, tudo o que é verdadeiro, tudo o que é honesto, tudo o que é justo, tudo o que é puro, tudo o que é amável, tudo o que é de boa fama, se há alguma virtude, e se há algum louvor, nisso pensai."',
      'Isaías 41:10 - "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça."'
    ]
  },
  Fleumático: {
    description: 'Calmo, relaxado e tranquilo. Você é pacífico e apoiador dos outros.',
    image: 'https://images.unsplash.com/photo-1471898554234-bcbfedd35134?auto=format&fit=crop&q=80&w=500',
    strengths: ['Calmo', 'Paciente', 'Diplomático', 'Confiável'],
    weaknesses: ['Passivo', 'Indeciso', 'Desmotivado', 'Resistente a mudanças'],
    improvements: 'Desenvolva mais iniciativa e disposição para mudanças. Estabeleça metas pessoais e trabalhe para alcançá-las.',
    verses: [
      '2 Timóteo 1:7 - "Porque Deus não nos deu espírito de covardia, mas de poder, de amor e de moderação."',
      'Josué 1:9 - "Não to mandei eu? Esforça-te, e tem bom ânimo; não temas, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares."'
    ]
  },
};

export default function ResultadosScreen() {
  const { results } = useLocalSearchParams<{ results: string }>();
  const temperament = results ? JSON.parse(results) as string[] : null;
  const temperamentType = temperament ? temperament[0] as keyof typeof temperamentInfo : null;

  if (!temperamentType) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Faça o teste para ver seus resultados!</Text>
      </View>
    );
  }

  const info = temperamentInfo[temperamentType];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Seu Temperamento</Text>
        <Text style={styles.result}>{temperamentType}</Text>
        
        <Image
          source={{ uri: info.image }}
          style={styles.image}
        />
        
        <Text style={styles.description}>{info.description}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pontos Fortes</Text>
          <View style={styles.traits}>
            {info.strengths.map((strength, index) => (
              <View key={index} style={styles.traitItem}>
                <Text style={styles.traitText}>{strength}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pontos Fracos</Text>
          <View style={styles.traits}>
            {info.weaknesses.map((weakness, index) => (
              <View key={index} style={styles.traitItem}>
                <Text style={styles.traitText}>{weakness}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como Melhorar</Text>
          <Text style={styles.paragraphText}>{info.improvements}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Versículos Bíblicos</Text>
          {info.verses.map((verse, index) => (
            <Text key={index} style={styles.verseText}>{verse}</Text>
          ))}
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
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
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
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  traits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  traitItem: {
    backgroundColor: '#E8F0FE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  traitText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  paragraphText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  verseText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 12,
  },
});