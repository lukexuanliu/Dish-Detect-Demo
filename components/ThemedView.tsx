import { View, ViewProps, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export type ViewVariant = 'primary' | 'secondary' | 'card';

interface ThemedViewProps extends ViewProps {
  variant?: ViewVariant;
  lightBg?: string;
  darkBg?: string;
}

export function ThemedView({ 
  variant = 'primary', 
  style, 
  lightBg, 
  darkBg, 
  ...otherProps 
}: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const backgroundColor = colorScheme === 'dark' ? darkBg : lightBg;
  
  const variantStyle = styles[variant];
  const bgColor = backgroundColor ?? Colors[colorScheme][variantStyle.key];
  
  return (
    <View 
      style={[
        variantStyle.style, 
        { backgroundColor: bgColor },
        style
      ]} 
      {...otherProps} 
    />
  );
}

const styles = {
  primary: {
    key: 'background',
    style: {
      flex: 1,
    },
  },
  secondary: {
    key: 'card',
    style: {
      padding: 16,
    },
  },
  card: {
    key: 'card',
    style: {
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
  },
};