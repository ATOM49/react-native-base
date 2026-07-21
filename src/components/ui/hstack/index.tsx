import { View, type ViewProps } from 'react-native';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';

const hstackStyle = tva({
  base: 'flex-row',
  variants: {
    space: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
      xl: 'gap-6',
    },
    reversed: {
      true: 'flex-row-reverse',
    },
  },
});

export type HStackProps = ViewProps & VariantProps<typeof hstackStyle> & { className?: string };

/** Horizontal flex stack with an optional `space` gap scale. */
export function HStack({ space, reversed, className, ...props }: HStackProps) {
  return <View className={hstackStyle({ space, reversed, class: className })} {...props} />;
}
