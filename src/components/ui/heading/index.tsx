import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { tva, type VariantProps } from '@gluestack-ui/utils/nativewind-utils';

const headingStyle = tva({
  base: 'text-foreground font-bold',
  variants: {
    size: {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
      xl: 'text-3xl',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

export type HeadingProps = RNTextProps & VariantProps<typeof headingStyle> & { className?: string };

/** Section heading primitive. */
export function Heading({ size, className, ...props }: HeadingProps) {
  return <RNText role="heading" className={headingStyle({ size, class: className })} {...props} />;
}
