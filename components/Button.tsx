import { Pressable, StyleSheet, Text, View, PressableProps } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { spacing } from '@/constants/Spacing';
import { ThemedText } from './ThemedText';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({ 
  title, 
  variant = 'primary', 
  size = 'medium',
  leftIcon,
  rightIcon,
  fullWidth = false,
  loading = false,
  style, 
  ...props 
}: ButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const isLight = colorScheme === 'light';
  
  // Get styles based on variant and size
  const variantStyle = buttonVariants[variant][colorScheme];
  const sizeStyle = buttonSizes[size];
  
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variantStyle.container,
        sizeStyle,
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        style,
      ]}
      accessibilityRole="button"
      disabled={loading}
      {...props}
    >
      <View style={styles.contentContainer}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        
        <ThemedText 
          style={[styles.text, variantStyle.text]}
          lightColor={variantStyle.textColor}
          darkColor={variantStyle.textColor}
        >
          {loading ? 'Loading...' : title}
        </ThemedText>
        
        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  fullWidth: {
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },
});

const buttonSizes = {
  small: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    minHeight: 32,
  },
  medium: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 40,
  },
  large: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
};

const buttonVariants = {
  primary: {
    light: {
      container: {
        backgroundColor: Colors.shared.primary[500],
      },
      text: {
        fontSize: 16,
      },
      textColor: '#FFFFFF',
    },
    dark: {
      container: {
        backgroundColor: Colors.shared.primary[500],
      },
      text: {
        fontSize: 16,
      },
      textColor: '#FFFFFF',
    },
  },
  secondary: {
    light: {
      container: {
        backgroundColor: Colors.shared.secondary[500],
      },
      text: {
        fontSize: 16,
      },
      textColor: '#FFFFFF',
    },
    dark: {
      container: {
        backgroundColor: Colors.shared.secondary[500],
      },
      text: {
        fontSize: 16,
      },
      textColor: '#FFFFFF',
    },
  },
  outline: {
    light: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.shared.primary[500],
      },
      text: {
        fontSize: 16,
      },
      textColor: Colors.shared.primary[500],
    },
    dark: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.shared.primary[400],
      },
      text: {
        fontSize: 16,
      },
      textColor: Colors.shared.primary[400],
    },
  },
  ghost: {
    light: {
      container: {
        backgroundColor: 'transparent',
      },
      text: {
        fontSize: 16,
      },
      textColor: Colors.shared.primary[500],
    },
    dark: {
      container: {
        backgroundColor: 'transparent',
      },
      text: {
        fontSize: 16,
      },
      textColor: Colors.shared.primary[400],
    },
  },
};