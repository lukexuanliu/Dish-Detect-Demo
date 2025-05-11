import { View, StyleSheet, Image, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import Colors from '@/constants/Colors';
import { spacing } from '@/constants/Spacing';
import { Info } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  restaurant: string;
  confidence: number;
}

interface DishCardProps {
  dish: Dish;
  onPress?: () => void;
}

export function DishCard({ dish, onPress }: DishCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const renderConfidenceLabel = () => {
    let bgColor = colors.success;
    let label = 'High Match';
    
    if (dish.confidence < 0.5) {
      bgColor = colors.error;
      label = 'Low Match';
    } else if (dish.confidence < 0.8) {
      bgColor = colors.warning;
      label = 'Medium Match';
    }
    
    return (
      <View style={[styles.confidenceLabel, { backgroundColor: bgColor }]}>
        <ThemedText 
          variant="caption" 
          lightColor="#FFFFFF" 
          darkColor="#FFFFFF"
        >
          {label} ({Math.round(dish.confidence * 100)}%)
        </ThemedText>
      </View>
    );
  };
  
  return (
    <Pressable onPress={onPress}>
      <ThemedView variant="card" style={styles.container}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: dish.imageUrl }} 
            style={styles.image} 
            resizeMode="cover"
          />
          {renderConfidenceLabel()}
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <ThemedText variant="heading3" style={styles.name}>{dish.name}</ThemedText>
            <ThemedText variant="heading3" style={styles.price}>{dish.price}</ThemedText>
          </View>
          <ThemedText variant="caption" style={styles.restaurant}>{dish.restaurant}</ThemedText>
          <ThemedText variant="body" style={styles.description} numberOfLines={2}>
            {dish.description}
          </ThemedText>
          <View style={styles.infoContainer}>
            <Info size={14} color={colors.muted} />
            <ThemedText variant="caption" style={styles.infoText}>
              Tap for more details
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
    padding: 0,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 160,
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  confidenceLabel: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    flex: 1,
    marginRight: spacing.sm,
  },
  price: {
    fontWeight: '700',
  },
  restaurant: {
    marginBottom: spacing.sm,
  },
  description: {
    marginBottom: spacing.sm,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: spacing.xs,
  },
});