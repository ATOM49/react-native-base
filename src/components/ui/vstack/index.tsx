import { View, type ViewProps } from 'react-native';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';

const vstackStyle = tva({
  base: 'flex-col',
  variants: {
    space: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
      xl: 'gap-6',
    },
    reversed: {
      true: 'flex-col-reverse',
    },
  },
});

export type VStackProps = ViewProps & VariantProps<typeof vstackStyle> & { className?: string };

/** Vertical flex stack with an optional `space` gap scale. */
export function VStack({ space, reversed, className, ...props }: VStackProps) {
  return <View className={vstackStyle({ space, reversed, class: className })} {...props} />;
}
