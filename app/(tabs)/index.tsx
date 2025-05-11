import { StyleSheet, View, ScrollView, Image, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { spacing } from '@/constants/Spacing';
import { Camera, Link, ListRestart as Restaurant, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter();

  const navigateToCapture = () => {
    router.push('/capture');
  };

  return (
    <ThemedView variant="primary">
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg" }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={styles.gradient}
          />
          <View style={styles.heroContent}>
            <ThemedText variant="heading1" lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.title}>
              DishDetect
            </ThemedText>
            <ThemedText variant="body" lightColor="#FFFFFF" darkColor="#FFFFFF" style={styles.subtitle}>
              Identify any restaurant dish with AI
            </ThemedText>
          </View>
        </View>

        <View style={styles.featuresContainer}>
          <ThemedText variant="heading2" style={styles.sectionTitle}>
            How It Works
          </ThemedText>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Camera size={24} color="#FF6B35" />
            </View>
            <View style={styles.featureContent}>
              <ThemedText variant="heading3">Snap a Photo</ThemedText>
              <ThemedText variant="body">
                Take a picture of any dish at a restaurant or upload one from your gallery
              </ThemedText>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Restaurant size={24} color="#FF6B35" />
            </View>
            <View style={styles.featureContent}>
              <ThemedText variant="heading3">Identify Restaurant</ThemedText>
              <ThemedText variant="body">
                We'll automatically detect your location or you can enter the restaurant name
              </ThemedText>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Search size={24} color="#FF6B35" />
            </View>
            <View style={styles.featureContent}>
              <ThemedText variant="heading3">Discover Dish Details</ThemedText>
              <ThemedText variant="body">
                Our AI will identify the dish, show you its name, ingredients, and price
              </ThemedText>
            </View>
          </View>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Link size={24} color="#FF6B35" />
            </View>
            <View style={styles.featureContent}>
              <ThemedText variant="heading3">Paste a URL</ThemedText>
              <ThemedText variant="body">
                You can also paste a link to a food photo and we'll analyze it
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.ctaContainer}>
          <Button
            title="Identify a Dish Now"
            variant="primary"
            size="large"
            leftIcon={<Camera size={20} color="#FFFFFF" />}
            onPress={navigateToCapture}
            fullWidth
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xl,
  },
  heroContainer: {
    position: 'relative',
    height: 300,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  heroContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: spacing.xl,
    paddingTop: Platform.OS === 'web' ? spacing.xxxl : spacing.xl,
  },
  title: {
    marginBottom: spacing.sm,
    fontSize: 36,
  },
  subtitle: {
    fontSize: 18,
  },
  featuresContainer: {
    padding: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.lg,
  },
  featureCard: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: 'rgba(255, 107, 53, 0.05)',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B35',
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  ctaContainer: {
    margin: spacing.lg,
  },
});