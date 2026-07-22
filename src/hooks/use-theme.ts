/**
 * Resolves the current color palette from the device color scheme.
 * Learn more: https://docs.expo.dev/develop/user-interface/color-themes/
 */
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const scheme = useColorScheme();

  return Colors[scheme === 'dark' ? 'dark' : 'light'];
}
