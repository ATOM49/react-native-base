import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

const emptySubscribe = () => () => {};

/**
 * To support static rendering, the color scheme must be re-calculated on the
 * client after hydration: the server always renders 'light'.
 */
export function useColorScheme() {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true
  );
  const colorScheme = useRNColorScheme();

  return isServer ? 'light' : colorScheme;
}
