import { useState } from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { spacing } from '@/constants/Spacing';
import { DishCard, Dish } from '@/components/DishCard';
import { EmptyState } from '@/components/EmptyState';
import { History as HistoryIcon } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';

// Mock data for the history tab
const MOCK_HISTORY: Dish[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: '$14.99',
    imageUrl: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg',
    restaurant: 'Napoli Pizzeria',
    confidence: 0.95,
  },
  {
    id: '2',
    name: 'Chicken Pad Thai',
    description: 'Rice noodles stir-fried with chicken, eggs, bean sprouts, and peanuts',
    price: '$16.50',
    imageUrl: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg',
    restaurant: 'Thai Delight',
    confidence: 0.78,
  },
  {
    id: '3',
    name: 'Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato, onion, and special sauce',
    price: '$12.99',
    imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    restaurant: 'Burger Joint',
    confidence: 0.42,
  },
];

export default function HistoryScreen() {
  const [history] = useState<Dish[]>(MOCK_HISTORY);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  
  const navigateToDetails = (dish: Dish) => {
    // In a real app, would navigate to a detail screen with the dish ID
    console.log('Navigate to details for dish:', dish.id);
  };
  
  // Render header with filters (not implemented in MVP)
  const renderHeader = () => (
    <View style={styles.header}>
      <ThemedText variant="heading2">Your Dish History</ThemedText>
      <Pressable style={styles.filterButton}>
        <ThemedText variant="label" lightColor={colors.muted}>Filter</ThemedText>
      </Pressable>
    </View>
  );
  
  if (history.length === 0) {
    return (
      <ThemedView variant="primary" style={styles.container}>
        <EmptyState
          icon={<HistoryIcon size={64} color={Colors.shared.primary[500]} />}
          title="No History Yet"
          description="Dishes you identify will appear here for easy reference"
          actionLabel="Identify a Dish"
          onAction={() => router.push('/capture')}
        />
      </ThemedView>
    );
  }
  
  return (
    <ThemedView variant="primary" style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DishCard dish={item} onPress={() => navigateToDetails(item)} />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  filterButton: {
    padding: spacing.sm,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
});