import { Tabs } from 'expo-router';
import { ChartBar as BarChart, FileText, User } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { ColorValue } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.dark.quiz.background,
          borderTopColor: theme.dark.border,
        },
        tabBarActiveTintColor: theme.dark.text,
        tabBarInactiveTintColor: theme.dark.subtext,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null, // This hides the tab from the tab bar
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'Quiz',
          tabBarIcon: ({
            color,
            size,
          }: {
            color: ColorValue;
            size: number;
          }) => <BarChart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="resultados"
        options={{
          title: 'Resultados',
          tabBarIcon: ({
            color,
            size,
          }: {
            color: ColorValue;
            size: number;
          }) => <FileText size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({
            color,
            size,
          }: {
            color: ColorValue;
            size: number;
          }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
