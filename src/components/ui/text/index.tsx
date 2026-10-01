import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { tva, type VariantProps } from '@gluestack-ui/utils/nativewind-utils';

const textStyle = tva({
  base: 'text-foreground',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    bold: {
      true: 'font-semibold',
    },
    muted: {
      true: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type TextProps = RNTextProps & VariantProps<typeof textStyle> & { className?: string };

/** Themed text primitive. Colors follow the active gluestack color scheme. */
export function Text({ size, bold, muted, className, ...props }: TextProps) {
  return <RNText className={textStyle({ size, bold, muted, class: className })} {...props} />;
}
