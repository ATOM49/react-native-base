import { StyleSheet, Switch, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useSettingsStore } from '@/stores/settings-store';

export default function SettingsScreen() {
  const theme = useTheme();
  const notificationsEnabled = useSettingsStore((state) => state.notificationsEnabled);
  const analyticsEnabled = useSettingsStore((state) => state.analyticsEnabled);
  const setNotificationsEnabled = useSettingsStore((state) => state.setNotificationsEnabled);
  const setAnalyticsEnabled = useSettingsStore((state) => state.setAnalyticsEnabled);

  return (
    <ThemedView style={styles.container}>
      <ThemedText themeColor="textSecondary">
        These toggles are persisted with Zustand + AsyncStorage and survive app restarts.
      </ThemedText>
      <View style={[styles.item, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText>Notifications</ThemedText>
        <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
      </View>
      <View style={[styles.item, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText>Analytics</ThemedText>
        <Switch value={analyticsEnabled} onValueChange={setAnalyticsEnabled} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
});
