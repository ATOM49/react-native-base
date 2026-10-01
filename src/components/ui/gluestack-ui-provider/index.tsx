import { useEffect } from 'react';
import { View, type ViewProps } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { ToastProvider } from '@gluestack-ui/core/toast/creator';
import { useColorScheme } from 'nativewind';

import { config } from './config';

export type ModeType = 'light' | 'dark' | 'system';

/**
 * Root gluestack-ui provider. Applies the design-token CSS variables for the
 * active color scheme and mounts the overlay/toast portals that gluestack
 * components (modals, menus, toasts) render into.
 */
export function GluestackUIProvider({
  mode = 'system',
  children,
  style,
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(mode);
  }, [mode, setColorScheme]);

  const activeScheme = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <View style={[config[activeScheme], { flex: 1 }, style]}>
      <OverlayProvider>
        <ToastProvider>{children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
