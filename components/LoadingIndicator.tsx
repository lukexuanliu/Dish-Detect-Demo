import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from './ThemedText';
import Colors from '@/constants/Colors';
import { spacing } from '@/constants/Spacing';
import { useColorScheme } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import { UtensilsCrossed } from 'lucide-react-native';

interface LoadingIndicatorProps {
  message?: string;
  useCustomAnimation?: boolean;
}

export function LoadingIndicator({ 
  message = 'Identifying your dish...', 
  useCustomAnimation = true 
}: LoadingIndicatorProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const rotation = useSharedValue(0);
  
  // Animated rotation for the custom icon
  rotation.value = withRepeat(
    withTiming(360, { 
      duration: 2000, 
      easing: Easing.linear 
    }), 
    -1
  );
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
  
  return (
    <View style={styles.container}>
      {useCustomAnimation ? (
        <Animated.View style={[styles.iconContainer, animatedStyle]}>
          <UtensilsCrossed 
            size={48} 
            color={Colors.shared.primary[500]} 
          />
        </Animated.View>
      ) : (
        <ActivityIndicator 
          size="large" 
          color={Colors.shared.primary[500]} 
        />
      )}
      <ThemedText variant="body" style={styles.message}>
        {message}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  message: {
    textAlign: 'center',
    marginTop: spacing.md,
  },
});