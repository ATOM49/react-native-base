/**
 * Example persisted Zustand store: state survives app restarts via
 * AsyncStorage. Keep persisted stores small and version them when the
 * shape changes: https://zustand.docs.pmnd.rs/integrations/persisting-store-data
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SettingsState = {
  notificationsEnabled: boolean;
  analyticsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  setAnalyticsEnabled: (enabled: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notificationsEnabled: true,
      analyticsEnabled: false,
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setAnalyticsEnabled: (enabled) => set({ analyticsEnabled: enabled }),
    }),
    {
      name: 'settings',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
