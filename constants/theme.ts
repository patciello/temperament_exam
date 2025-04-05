// Theme colors for the app
export const theme = {
  dark: {
    background: '#1A1A1A', // Dark background but not pure black
    card: '#242424',
    text: '#FFFFFF',
    subtext: '#CCCCCC',
    border: '#333333',
    quiz: {
      background: '#1A1A1A',
      card: '#242424',
      progressBar: '#444444',
      progressFill: '#FFFFFF',
      sliderTrack: '#444444',
      sliderThumb: '#FFFFFF',
      buttonBackground: '#333333',
      buttonText: '#FFFFFF',
    },
    // Temperament specific colors
    temperaments: {
      Sanguíneo: {
        primary: '#FFD700', // Yellow
        secondary: '#332B00',
        accent: '#FFF0AA',
        card: '#2A2500',
      },
      Colérico: {
        primary: '#FF4D4D', // Red
        secondary: '#330000',
        accent: '#FFAAAA',
        card: '#2A0000',
      },
      Fleumático: {
        primary: '#4DFF4D', // Green
        secondary: '#003300',
        accent: '#AAFFAA',
        card: '#002A00',
      },
      Melancólico: {
        primary: '#4D4DFF', // Blue
        secondary: '#000033',
        accent: '#AAAAFF',
        card: '#00002A',
      },
    },
  },
  light: {
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#000000',
    subtext: '#666666',
    border: '#DDDDDD',
  },
};
