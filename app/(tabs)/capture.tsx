import React, { useState } from 'react';
import { StyleSheet, View, Platform, TextInput, Image, ScrollView, Pressable, KeyboardAvoidingView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { spacing } from '@/constants/Spacing';
import { Camera, Link, Upload, MapPin } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';

export default function CaptureScreen() {
  const [imageURI, setImageURI] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [location, setLocation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'camera' | 'gallery' | 'url'>('camera');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<CameraType>('back');
  const [loading, setLoading] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  
  // Handle camera permissions
  const handleCameraAccess = async () => {
    if (!cameraPermission?.granted) {
      const permission = await requestCameraPermission();
      if (!permission.granted) {
        return;
      }
    }
    setIsCameraActive(true);
  };
  
  // Get location
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocation('Permission to access location was denied');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      const geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      
      if (geocode.length > 0) {
        const address = geocode[0];
        setLocation(`${address.name || ''} ${address.street || ''}, ${address.city || ''}`);
      }
    } catch (error) {
      setLocation('Error getting location');
    }
  };
  
  // Take a picture
  const takePicture = async (camera: React.RefObject<CameraView>) => {
    if (camera.current) {
      const photo = await camera.current.takePictureAsync();
      setImageURI(photo.uri);
      setIsCameraActive(false);
      // Automatically try to get location when picture is taken
      getLocation();
    }
  };
  
  // Pick image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
      setActiveTab('gallery');
      // Prompt for location when image is selected
      getLocation();
    }
  };
  
  // Process the image to identify the dish
  const identifyDish = () => {
    setLoading(true);
    
    // Simulate API call to Together.ai
    setTimeout(() => {
      setLoading(false);
      // Navigate to results page
      router.push('/results');
    }, 3000);
  };
  
  // Reset form
  const resetForm = () => {
    setImageURI(null);
    setImageURL('');
    setRestaurant('');
    setLocation(null);
  };
  
  // Render the active tab content
  const renderTabContent = () => {
    const cameraRef = React.createRef<CameraView>();
    
    if (loading) {
      return <LoadingIndicator message="Analyzing your dish..." />;
    }
    
    if (imageURI) {
      return (
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.keyboardAvoidingView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.previewContainer}>
              <Image source={{ uri: imageURI }} style={styles.previewImage} />
              <Pressable style={styles.resetButton} onPress={resetForm}>
                <ThemedText variant="label" lightColor={colors.error}>
                  Reset
                </ThemedText>
              </Pressable>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <MapPin size={20} color={colors.muted} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Restaurant Name"
                  placeholderTextColor={colors.placeholder}
                  value={restaurant}
                  onChangeText={setRestaurant}
                />
              </View>
              
              {location ? (
                <View style={styles.locationContainer}>
                  <ThemedText variant="caption" lightColor={colors.muted}>
                    Detected Location: {location}
                  </ThemedText>
                </View>
              ) : (
                <Button 
                  title="Detect Location" 
                  variant="outline" 
                  size="small"
                  leftIcon={<MapPin size={16} color={colors.tint} />}
                  style={styles.locationButton}
                  onPress={getLocation}
                />
              )}
              
              <Button
                title="Identify Dish"
                variant="primary"
                size="large"
                fullWidth
                style={styles.submitButton}
                onPress={identifyDish}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    }
    
    switch (activeTab) {
      case 'camera':
        if (isCameraActive && cameraPermission?.granted) {
          return (
            <View style={styles.cameraContainer}>
              <CameraView 
                ref={cameraRef}
                style={styles.camera}
                facing={cameraFacing}
              >
                <View style={styles.cameraControls}>
                  <Button
                    title="Flip"
                    variant="ghost"
                    size="small"
                    onPress={() => setCameraFacing(facing => facing === 'back' ? 'front' : 'back')}
                    lightColor="#FFFFFF"
                  />
                  <Pressable 
                    style={styles.captureButton}
                    onPress={() => takePicture(cameraRef)}
                  >
                    <View style={styles.captureButtonInner} />
                  </Pressable>
                  <Button
                    title="Cancel"
                    variant="ghost"
                    size="small"
                    onPress={() => setIsCameraActive(false)}
                    lightColor="#FFFFFF"
                  />
                </View>
              </CameraView>
            </View>
          );
        }
        return (
          <View style={styles.optionsContainer}>
            <ThemedText variant="heading2" style={styles.headerText}>
              Capture a Food Photo
            </ThemedText>
            <Button
              title="Take Photo"
              variant="primary"
              size="large"
              leftIcon={<Camera size={20} color="#FFFFFF" />}
              onPress={handleCameraAccess}
              style={styles.optionButton}
              fullWidth
            />
            <Button
              title="Choose from Gallery"
              variant="outline"
              size="large"
              leftIcon={<Upload size={20} color={Colors.shared.primary[500]} />}
              onPress={pickImage}
              style={styles.optionButton}
              fullWidth
            />
            <Button
              title="Use Image URL"
              variant="ghost"
              size="large"
              leftIcon={<Link size={20} color={Colors.shared.primary[500]} />}
              onPress={() => setActiveTab('url')}
              style={styles.optionButton}
              fullWidth
            />
          </View>
        );
        
      case 'url':
        return (
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.keyboardAvoidingView}
          >
            <View style={styles.urlContainer}>
              <ThemedText variant="heading2" style={styles.headerText}>
                Enter Image URL
              </ThemedText>
              <TextInput
                style={[styles.urlInput, { color: colors.text, borderColor: colors.border }]}
                placeholder="Paste food image URL here"
                placeholderTextColor={colors.placeholder}
                value={imageURL}
                onChangeText={setImageURL}
                multiline
              />
              
              {imageURL ? (
                <Button
                  title="Use This URL"
                  variant="primary"
                  size="large"
                  onPress={() => {
                    setImageURI(imageURL);
                    getLocation();
                  }}
                  style={styles.urlButton}
                  fullWidth
                />
              ) : null}
              
              <Button
                title="Back to Options"
                variant="ghost"
                size="medium"
                onPress={() => setActiveTab('camera')}
                style={styles.backButton}
              />
            </View>
          </KeyboardAvoidingView>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <ThemedView variant="primary" style={styles.container}>
      {renderTabContent()}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerText: {
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  optionButton: {
    marginBottom: spacing.md,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
  },
  previewContainer: {
    position: 'relative',
    height: 300,
    width: '100%',
  },
  previewImage: {
    height: '100%',
    width: '100%',
  },
  resetButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  formContainer: {
    padding: spacing.lg,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
  },
  input: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 16,
    paddingVertical: spacing.xs,
  },
  locationContainer: {
    marginBottom: spacing.md,
  },
  locationButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  submitButton: {
    marginTop: spacing.lg,
  },
  urlContainer: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  urlInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: spacing.lg,
    fontSize: 16,
  },
  urlButton: {
    marginBottom: spacing.md,
  },
  backButton: {
    marginTop: spacing.md,
  },
});