import { Switch } from 'react-native';

import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useSettingsStore } from '@/stores/settings-store';

export default function SettingsScreen() {
  const notificationsEnabled = useSettingsStore((state) => state.notificationsEnabled);
  const analyticsEnabled = useSettingsStore((state) => state.analyticsEnabled);
  const setNotificationsEnabled = useSettingsStore((state) => state.setNotificationsEnabled);
  const setAnalyticsEnabled = useSettingsStore((state) => state.setAnalyticsEnabled);

  return (
    <VStack space="md" className="flex-1 bg-background p-4">
      <Text muted>
        These toggles are persisted with Zustand + AsyncStorage and survive app restarts.
      </Text>
      <HStack className="items-center justify-between rounded-lg bg-secondary px-4 py-2">
        <Text>Notifications</Text>
        <Switch
          accessibilityLabel="Notifications"
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </HStack>
      <HStack className="items-center justify-between rounded-lg bg-secondary px-4 py-2">
        <Text>Analytics</Text>
        <Switch
          accessibilityLabel="Analytics"
          value={analyticsEnabled}
          onValueChange={setAnalyticsEnabled}
        />
      </HStack>
    </VStack>
  );
}
