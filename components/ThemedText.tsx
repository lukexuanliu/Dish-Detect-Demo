import { Text, TextProps, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export type TextVariant = 'heading1' | 'heading2' | 'heading3' | 'body' | 'label' | 'caption';

interface ThemedTextProps extends TextProps {
  variant?: TextVariant;
  lightColor?: string;
  darkColor?: string;
}

export function ThemedText({ 
  variant = 'body', 
  style, 
  lightColor, 
  darkColor, 
  ...otherProps 
}: ThemedTextProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const color = lightColor ?? Colors.light.text;
  const colorFromProps = colorScheme === 'dark' ? darkColor : lightColor;
  
  const variantStyle = styles[variant];
  
  return (
    <Text 
      style={[
        variantStyle, 
        { color: colorFromProps ?? Colors[colorScheme].text },
        style
      ]} 
      {...otherProps} 
    />
  );
}

const styles = StyleSheet.create({
  heading1: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    fontFamily: 'Poppins-Bold',
  },
  heading2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    fontFamily: 'Poppins-SemiBold',
  },
  heading3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    fontFamily: 'Poppins-SemiBold',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: 'Outfit-Regular',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: 'Outfit-Medium',
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    fontFamily: 'Outfit-Regular',
  },
});