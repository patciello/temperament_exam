import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '@/constants/theme';

interface CompatibilityTableProps {
  primaryTemperament: string;
}

const temperamentCompatibility = {
  Sanguíneo: {
    goodMatch: ['Fleumático', 'Sanguíneo'],
    badMatch: ['Colérico', 'Melancólico'],
    description:
      'Sanguíneos são extrovertidos e energéticos, combinando bem com personalidades calmas e equilibradas.',
  },
  Colérico: {
    goodMatch: ['Melancólico', 'Fleumático'],
    badMatch: ['Colérico', 'Sanguíneo'],
    description:
      'Coléricos são líderes naturais e combinam bem com personalidades detalhistas e calmas.',
  },
  Melancólico: {
    goodMatch: ['Fleumático', 'Colérico'],
    badMatch: ['Melancólico', 'Sanguíneo'],
    description:
      'Melancólicos são perfeccionistas e analíticos, combinando bem com personalidades calmas e decididas.',
  },
  Fleumático: {
    goodMatch: ['Sanguíneo', 'Colérico'],
    badMatch: ['Fleumático', 'Melancólico'],
    description:
      'Fleumáticos são calmos e equilibrados, combinando bem com personalidades energéticas e decididas.',
  },
};

const CompatibilityTable: React.FC<CompatibilityTableProps> = ({
  primaryTemperament,
}) => {
  const compatibility =
    temperamentCompatibility[
      primaryTemperament as keyof typeof temperamentCompatibility
    ];

  if (!compatibility) {
    return <Text style={styles.errorText}>Temperamento não encontrado</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compatibilidade de Personalidade</Text>
      <Text style={styles.description}>{compatibility.description}</Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>Combina Bem</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>Não Combina</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.goodMatchCell]}>
            {compatibility.goodMatch.map((temp, index) => (
              <Text key={`good-${index}`} style={styles.tableCellText}>
                {temp}
              </Text>
            ))}
          </View>
          <View style={[styles.tableCell, styles.badMatchCell]}>
            {compatibility.badMatch.map((temp, index) => (
              <Text key={`bad-${index}`} style={styles.tableCellText}>
                {temp}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.dark.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: theme.dark.text,
    marginBottom: 15,
    textAlign: 'center',
  },
  tableContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#444',
  },
  tableRow: {
    flexDirection: 'row',
    width: '100%',
  },
  tableHeaderCell: {
    flex: 1,
    padding: 10,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableHeaderText: {
    color: theme.dark.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableCell: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goodMatchCell: {
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  badMatchCell: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  tableCellText: {
    color: theme.dark.text,
    fontSize: 14,
    marginVertical: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});

export default CompatibilityTable;
