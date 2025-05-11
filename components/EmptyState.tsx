import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { Button } from './Button';
import { spacing } from '@/constants/Spacing';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <ThemedText variant="heading2" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText variant="body" style={styles.description} lightColor={colors.muted}>
        {description}
      </ThemedText>
      {actionLabel && onAction && (
        <Button 
          title={actionLabel}
          onPress={onAction}
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  button: {
    minWidth: 200,
  },
});