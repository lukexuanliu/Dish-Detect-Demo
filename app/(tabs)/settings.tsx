import { StyleSheet, View, Switch, ScrollView, Linking, Platform } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { spacing } from '@/constants/Spacing';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { Key, Moon, Sun, Lock, Globe, AtSign, Trash, LogOut, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  // State for toggles
  const [saveHistory, setSaveHistory] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  
  const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <ThemedText variant="heading3" style={styles.sectionTitle}>{title}</ThemedText>
      {children}
    </View>
  );
  
  const SettingItem = ({ 
    icon, 
    title, 
    description,
    rightElement,
  }: { 
    icon: React.ReactNode; 
    title: string; 
    description?: string;
    rightElement?: React.ReactNode;
  }) => (
    <View style={styles.settingItem}>
      <View style={[styles.iconContainer, { backgroundColor: `${colors.tint}20` }]}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <ThemedText variant="body" style={styles.settingTitle}>{title}</ThemedText>
        {description && (
          <ThemedText variant="caption" lightColor={colors.muted}>{description}</ThemedText>
        )}
      </View>
      {rightElement}
    </View>
  );
  
  return (
    <ThemedView variant="primary" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText variant="heading2">Settings</ThemedText>
        </View>
        
        <SettingSection title="General">
          <SettingItem
            icon={<Moon size={20} color={colors.tint} />}
            title="Dark Mode"
            description="Switch between light and dark themes"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: colors.border, true: `${colors.tint}80` }}
                thumbColor={darkMode ? colors.tint : '#f4f3f4'}
              />
            }
          />
          
          <SettingItem
            icon={<Globe size={20} color={colors.tint} />}
            title="Language"
            description="English (US)"
          />
        </SettingSection>
        
        <SettingSection title="Privacy">
          <SettingItem
            icon={<Lock size={20} color={colors.tint} />}
            title="Save History"
            description="Keep a record of your identified dishes"
            rightElement={
              <Switch
                value={saveHistory}
                onValueChange={setSaveHistory}
                trackColor={{ false: colors.border, true: `${colors.tint}80` }}
                thumbColor={saveHistory ? colors.tint : '#f4f3f4'}
              />
            }
          />
          
          <SettingItem
            icon={<Key size={20} color={colors.tint} />}
            title="API Key Settings"
            description="Manage Together.ai API credentials"
          />
          
          <SettingItem
            icon={<Trash size={20} color={colors.tint} />}
            title="Clear History"
            description="Remove all your identified dishes"
          />
        </SettingSection>
        
        <SettingSection title="Permissions">
          <SettingItem
            icon={<Globe size={20} color={colors.tint} />}
            title="Location Services"
            description="Allow the app to detect nearby restaurants"
            rightElement={
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: colors.border, true: `${colors.tint}80` }}
                thumbColor={locationEnabled ? colors.tint : '#f4f3f4'}
              />
            }
          />
          
          <SettingItem
            icon={<AtSign size={20} color={colors.tint} />}
            title="Notifications"
            description="Receive updates and recommendations"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: `${colors.tint}80` }}
                thumbColor={notificationsEnabled ? colors.tint : '#f4f3f4'}
              />
            }
          />
        </SettingSection>
        
        <SettingSection title="About">
          <SettingItem
            icon={<Info size={20} color={colors.tint} />}
            title="Version"
            description="1.0.0"
          />
          
          <SettingItem
            icon={<LogOut size={20} color={colors.tint} />}
            title="Sign Out"
          />
        </SettingSection>
        
        <View style={styles.footer}>
          <Button
            title="Contact Support"
            variant="outline"
            onPress={() => Linking.openURL('mailto:support@dishdetect.app')}
          />
          
          <ThemedText variant="caption" style={styles.copyright} lightColor={colors.muted}>
            © 2025 DishDetect. All rights reserved.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  header: {
    padding: spacing.lg,
    paddingTop: Platform.OS === 'web' ? spacing.xxl : spacing.xl,
  },
  section: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontWeight: '500',
  },
  footer: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  copyright: {
    marginTop: spacing.lg,
    textAlign: 'center',
  },
});