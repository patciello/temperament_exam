import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  LayoutChangeEvent,
  GestureResponderEvent,
} from 'react-native';
import { theme } from '@/constants/theme';

interface VerticalSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  height?: number;
  width?: number;
  showLabels?: boolean;
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({
  value,
  onValueChange,
  min,
  max,
  step = 1,
  height = 220,
  width = 60,
  showLabels = true,
}) => {
  const [sliderHeight, setSliderHeight] = useState(height);
  const [isSliding, setIsSliding] = useState(false);
  const pan = useRef(new Animated.Value(0)).current;
  const valueRef = useRef(value);

  // Calcula a posição inicial do thumb com base no valor atual
  useEffect(() => {
    if (!isSliding) {
      // Ajustamos o cálculo para considerar a altura do thumb (20px)
      // e garantir que ele fique alinhado com os valores
      const thumbHeight = 20;
      const availableHeight = sliderHeight - thumbHeight;
      const position = ((max - value) / (max - min)) * availableHeight;
      pan.setValue(position);
    }
  }, [value, min, max, sliderHeight, isSliding, pan]);

  // Atualiza a referência do valor quando ele muda
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsSliding(true);
        pan.setOffset(pan.__getValue());
        pan.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        // Ajustamos o cálculo para considerar a altura do thumb
        const thumbHeight = 20;
        const availableHeight = sliderHeight - thumbHeight;
        const newPosition = Math.max(
          0,
          Math.min(availableHeight, pan.__getValue() + gestureState.dy)
        );
        pan.setValue(gestureState.dy);

        // Calcula o novo valor com base na posição
        const ratio = 1 - newPosition / availableHeight;
        const newValue = min + ratio * (max - min);

        // Arredonda para o step mais próximo se necessário
        const steppedValue =
          step > 0 ? Math.round(newValue / step) * step : newValue;

        // Garante que o valor esteja dentro dos limites
        const clampedValue = Math.max(min, Math.min(max, steppedValue));

        if (clampedValue !== valueRef.current) {
          onValueChange(clampedValue);
        }
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
        setIsSliding(false);
      },
      onPanResponderTerminate: () => {
        pan.flattenOffset();
        setIsSliding(false);
      },
    })
  ).current;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setSliderHeight(height);
  };

  const handleBarPress = (event: GestureResponderEvent) => {
    const { locationY } = event.nativeEvent;
    const thumbHeight = 20;
    const availableHeight = sliderHeight - thumbHeight;

    // Ajustamos o cálculo para considerar a altura do thumb
    // Invertemos a escala para que valores mais altos (Concordo) estejam no topo
    const ratio = 1 - Math.min(locationY, availableHeight) / availableHeight;
    const newValue = min + ratio * (max - min);
    const steppedValue =
      step > 0 ? Math.round(newValue / step) * step : newValue;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));
    onValueChange(clampedValue);
  };

  // Calcula a altura da barra preenchida
  const fillHeight = ((value - min) / (max - min)) * 100;

  // Calcula a cor da barra com base no valor (vermelho para discordo, verde para concordo)
  const getFillColor = () => {
    // Normaliza o valor entre 0 e 1
    const normalizedValue = (value - min) / (max - min);

    // Vermelho para valores baixos, verde para valores altos
    if (normalizedValue <= 0.5) {
      // De vermelho a amarelo
      const r = 255;
      const g = Math.round(255 * (normalizedValue * 2));
      return `rgb(${r}, ${g}, 0)`;
    } else {
      // De amarelo a verde
      const r = Math.round(255 * (1 - (normalizedValue - 0.5) * 2));
      const g = 255;
      return `rgb(${r}, ${g}, 0)`;
    }
  };

  return (
    <View style={[styles.container, { height, width }]}>
      {showLabels && (
        <View style={styles.labelsContainer}>
          {Array.from({ length: max - min + 1 }).map((_, index) => {
            const labelValue = max - index;
            return (
              <Text
                key={labelValue}
                style={[
                  styles.label,
                  labelValue === value && styles.activeLabel,
                ]}
              >
                {labelValue}
              </Text>
            );
          })}
        </View>
      )}

      <View
        style={[styles.track, { height }]}
        onLayout={handleLayout}
        onStartShouldSetResponder={() => true}
        onResponderGrant={handleBarPress}
      >
        <View
          style={[
            styles.fill,
            {
              height: `${fillHeight}%`,
              backgroundColor: getFillColor(),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateY: pan }],
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelsContainer: {
    height: '100%',
    justifyContent: 'space-between',
    marginRight: 15,
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    color: theme.dark.subtext,
    textAlign: 'center',
    width: 20,
    height: 20,
    lineHeight: 20,
  },
  activeLabel: {
    color: theme.dark.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  track: {
    width: 60,
    backgroundColor: theme.dark.quiz.sliderTrack,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  fill: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderRadius: 6,
  },
  thumb: {
    width: 80,
    height: 40,
    borderRadius: 8,
    backgroundColor: theme.dark.quiz.sliderThumb,
    position: 'absolute',
    left: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default VerticalSlider;
