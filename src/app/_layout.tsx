import '@/global.css';

import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { queryClient, setupAppStateFocusManager, setupOnlineManager } from '@/lib/query-client';

export const unstable_settings = {
  // Ensures back navigation always has the tabs as an anchor after deep links.
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const teardownFocus = setupAppStateFocusManager();
    const teardownOnline = setupOnlineManager();
    return () => {
      teardownFocus();
      teardownOnline();
    };
  }, []);

  return (
    <GluestackUIProvider mode="system">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
