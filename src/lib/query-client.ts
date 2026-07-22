import { AppState, Platform } from 'react-native';
import type { AppStateStatus } from 'react-native';
import { QueryClient, focusManager, onlineManager } from '@tanstack/react-query';
import * as Network from 'expo-network';

/**
 * A single QueryClient instance shared across the app.
 * Learn more: https://tanstack.com/query/latest/docs/framework/react/react-native
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cached data is considered fresh for 1 minute before refetching.
      staleTime: 60 * 1000,
      retry: 2,
    },
  },
});

/**
 * Refetch queries when the app comes back to the foreground (the React Native
 * equivalent of refetch-on-window-focus).
 */
export function setupAppStateFocusManager() {
  const onAppStateChange = (status: AppStateStatus) => {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  };

  const subscription = AppState.addEventListener('change', onAppStateChange);
  return () => subscription.remove();
}

/**
 * Pause queries/mutations while the device is offline and resume on reconnect.
 */
export function setupOnlineManager() {
  const subscription = Network.addNetworkStateListener((state) => {
    onlineManager.setOnline(state.isConnected ?? true);
  });
  return () => subscription.remove();
}
