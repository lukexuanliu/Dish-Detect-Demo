import { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Platform, Pressable, Share } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { spacing } from '@/constants/Spacing';
import { ArrowLeft, Clock, MapPin, ChevronDown, ChevronUp, Share2, ThumbsUp, ThumbsDown } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

// Mock data for the detailed result
const mockDish = {
  id: '1',
  name: 'Margherita Pizza',
  description: 'Classic Neapolitan pizza with San Marzano tomato sauce, fresh mozzarella, basil leaves, salt, and extra-virgin olive oil. Baked at high temperature in a wood-fired oven.',
  price: '$14.99',
  imageUrl: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg',
  restaurant: 'Napoli Pizzeria',
  address: '123 Italian Street, New York, NY',
  confidence: 0.95,
  ingredients: [
    'San Marzano tomatoes',
    'Fresh mozzarella cheese',
    'Fresh basil',
    'Salt',
    'Extra-virgin olive oil'
  ],
  nutritionFacts: {
    calories: '266 kcal',
    fat: '10.4g',
    carbs: '33g',
    protein: '11g'
  },
  similarDishes: [
    {
      id: '11',
      name: 'Marinara Pizza',
      price: '$12.99',
      imageUrl: 'https://images.pexels.com/photos/6941028/pexels-photo-6941028.jpeg',
      confidence: 0.75
    },
    {
      id: '12',
      name: 'Margherita with Buffalo Mozzarella',
      price: '$17.99',
      imageUrl: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg',
      confidence: 0.72
    }
  ]
};

export default function ResultsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [showNutrition, setShowNutrition] = useState(false);
  const [showSimilar, setShowSimilar] = useState(true);
  const [feedbackGiven, setFeedbackGiven] = useState<'like' | 'dislike' | null>(null);
  
  const goBack = () => {
    router.back();
  };
  
  const shareResult = async () => {
    try {
      await Share.share({
        message: `Check out this ${mockDish.name} from ${mockDish.restaurant}! I identified it using DishDetect.`,
        url: mockDish.imageUrl,
        title: `DishDetect - ${mockDish.name}`
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  const renderConfidenceBar = () => {
    const percentage = mockDish.confidence * 100;
    let color = colors.success;
    let label = 'High match';
    
    if (mockDish.confidence < 0.5) {
      color = colors.error;
      label = 'Low match';
    } else if (mockDish.confidence < 0.8) {
      color = colors.warning;
      label = 'Medium match';
    }
    
    return (
      <View style={styles.confidenceContainer}>
        <ThemedText variant="label" style={styles.confidenceLabel}>{label}</ThemedText>
        <View style={styles.confidenceBarContainer}>
          <View 
            style={[
              styles.confidenceBar, 
              { width: `${percentage}%`, backgroundColor: color }
            ]} 
          />
        </View>
        <ThemedText variant="caption">{Math.round(percentage)}% confident</ThemedText>
      </View>
    );
  };
  
  const renderSimilarDishes = () => {
    return (
      <View style={styles.section}>
        <Pressable 
          style={styles.sectionHeader} 
          onPress={() => setShowSimilar(!showSimilar)}
        >
          <ThemedText variant="heading3">Similar Dishes</ThemedText>
          {showSimilar ? <ChevronUp size={20} color={colors.text} /> : <ChevronDown size={20} color={colors.text} />}
        </Pressable>
        
        {showSimilar && (
          <View style={styles.similarDishesContainer}>
            {mockDish.similarDishes.map((dish) => (
              <View key={dish.id} style={styles.similarDish}>
                <Image source={{ uri: dish.imageUrl }} style={styles.similarImage} />
                <View style={styles.similarContent}>
                  <ThemedText variant="body" style={styles.similarName}>{dish.name}</ThemedText>
                  <ThemedText variant="caption">{dish.price}</ThemedText>
                  <View style={styles.similarConfidence}>
                    <ThemedText variant="caption" lightColor={colors.muted}>
                      {Math.round(dish.confidence * 100)}% match
                    </ThemedText>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };
  
  return (
    <ThemedView variant="primary" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Button
            title="Back"
            variant="ghost"
            size="medium"
            leftIcon={<ArrowLeft size={20} color={colors.tint} />}
            onPress={goBack}
          />
          <Button
            title="Share"
            variant="ghost"
            size="medium"
            rightIcon={<Share2 size={20} color={colors.tint} />}
            onPress={shareResult}
          />
        </View>
        
        <View style={styles.imageContainer}>
          <Image source={{ uri: mockDish.imageUrl }} style={styles.image} />
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <ThemedText variant="heading1">{mockDish.name}</ThemedText>
            <ThemedText variant="heading2" style={styles.price}>{mockDish.price}</ThemedText>
          </View>
          
          <View style={styles.restaurantContainer}>
            <ThemedText variant="body" style={styles.restaurant}>{mockDish.restaurant}</ThemedText>
            <View style={styles.addressContainer}>
              <MapPin size={16} color={colors.muted} />
              <ThemedText variant="caption" style={styles.address} lightColor={colors.muted}>
                {mockDish.address}
              </ThemedText>
            </View>
          </View>
          
          {renderConfidenceBar()}
          
          <View style={styles.section}>
            <ThemedText variant="heading3" style={styles.sectionTitle}>Description</ThemedText>
            <ThemedText variant="body" style={styles.description}>
              {mockDish.description}
            </ThemedText>
          </View>
          
          <View style={styles.section}>
            <ThemedText variant="heading3" style={styles.sectionTitle}>Ingredients</ThemedText>
            <View style={styles.ingredientsList}>
              {mockDish.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={[styles.bullet, { backgroundColor: colors.tint }]} />
                  <ThemedText variant="body">{ingredient}</ThemedText>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Pressable 
              style={styles.sectionHeader} 
              onPress={() => setShowNutrition(!showNutrition)}
            >
              <ThemedText variant="heading3">Nutrition Facts</ThemedText>
              {showNutrition ? <ChevronUp size={20} color={colors.text} /> : <ChevronDown size={20} color={colors.text} />}
            </Pressable>
            
            {showNutrition && (
              <View style={styles.nutritionContainer}>
                <View style={styles.nutritionItem}>
                  <ThemedText variant="body">Calories</ThemedText>
                  <ThemedText variant="body" style={styles.nutritionValue}>
                    {mockDish.nutritionFacts.calories}
                  </ThemedText>
                </View>
                <View style={styles.nutritionItem}>
                  <ThemedText variant="body">Fat</ThemedText>
                  <ThemedText variant="body" style={styles.nutritionValue}>
                    {mockDish.nutritionFacts.fat}
                  </ThemedText>
                </View>
                <View style={styles.nutritionItem}>
                  <ThemedText variant="body">Carbs</ThemedText>
                  <ThemedText variant="body" style={styles.nutritionValue}>
                    {mockDish.nutritionFacts.carbs}
                  </ThemedText>
                </View>
                <View style={styles.nutritionItem}>
                  <ThemedText variant="body">Protein</ThemedText>
                  <ThemedText variant="body" style={styles.nutritionValue}>
                    {mockDish.nutritionFacts.protein}
                  </ThemedText>
                </View>
              </View>
            )}
          </View>
          
          {renderSimilarDishes()}
          
          <View style={styles.feedbackContainer}>
            <ThemedText variant="body" style={styles.feedbackTitle}>Was this identification correct?</ThemedText>
            <View style={styles.feedbackButtonsContainer}>
              <Pressable 
                style={[
                  styles.feedbackButton, 
                  feedbackGiven === 'like' && [styles.feedbackButtonActive, { borderColor: colors.success }]
                ]}
                onPress={() => setFeedbackGiven('like')}
              >
                <ThumbsUp 
                  size={20} 
                  color={feedbackGiven === 'like' ? colors.success : colors.muted} 
                />
                <ThemedText 
                  variant="label" 
                  style={styles.feedbackLabel}
                  lightColor={feedbackGiven === 'like' ? colors.success : colors.muted}
                >
                  Yes
                </ThemedText>
              </Pressable>
              
              <Pressable 
                style={[
                  styles.feedbackButton, 
                  feedbackGiven === 'dislike' && [styles.feedbackButtonActive, { borderColor: colors.error }]
                ]}
                onPress={() => setFeedbackGiven('dislike')}
              >
                <ThumbsDown 
                  size={20} 
                  color={feedbackGiven === 'dislike' ? colors.error : colors.muted} 
                />
                <ThemedText 
                  variant="label" 
                  style={styles.feedbackLabel}
                  lightColor={feedbackGiven === 'dislike' ? colors.error : colors.muted}
                >
                  No
                </ThemedText>
              </Pressable>
            </View>
          </View>
          
          <View style={styles.timestamp}>
            <Clock size={14} color={colors.muted} />
            <ThemedText variant="caption" style={styles.timestampText} lightColor={colors.muted}>
              Identified on June 10, 2025
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    paddingTop: Platform.OS === 'web' ? spacing.xl : spacing.lg,
  },
  imageContainer: {
    width: '100%',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: spacing.lg,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  price: {
    color: Colors.shared.primary[500],
  },
  restaurantContainer: {
    marginBottom: spacing.lg,
  },
  restaurant: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    marginLeft: spacing.xs,
  },
  confidenceContainer: {
    marginBottom: spacing.lg,
  },
  confidenceLabel: {
    marginBottom: spacing.xs,
  },
  confidenceBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: spacing.xs,
    overflow: 'hidden',
  },
  confidenceBar: {
    height: '100%',
    borderRadius: 4,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    lineHeight: 24,
  },
  ingredientsList: {
    marginTop: spacing.sm,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.sm,
  },
  nutritionContainer: {
    backgroundColor: 'rgba(255, 107, 53, 0.05)',
    borderRadius: 8,
    padding: spacing.md,
  },
  nutritionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  nutritionValue: {
    fontWeight: '600',
  },
  similarDishesContainer: {
    marginTop: spacing.sm,
  },
  similarDish: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'rgba(240, 240, 240, 0.5)',
  },
  similarImage: {
    width: 80,
    height: 80,
  },
  similarContent: {
    flex: 1,
    padding: spacing.sm,
  },
  similarName: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  similarConfidence: {
    marginTop: spacing.xs,
  },
  feedbackContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    padding: spacing.md,
    backgroundColor: 'rgba(240, 240, 240, 0.5)',
    borderRadius: 8,
  },
  feedbackTitle: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  feedbackButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
    borderRadius: 8,
    marginHorizontal: spacing.sm,
  },
  feedbackButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 2,
  },
  feedbackLabel: {
    marginLeft: spacing.xs,
  },
  timestamp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timestampText: {
    marginLeft: spacing.xs,
  },
});