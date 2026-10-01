import {
  ActivityIndicator,
  Pressable,
  Text as RNText,
  type PressableProps,
  type TextProps as RNTextProps,
} from 'react-native';
import {
  cn,
  tva,
  useStyleContext,
  withStyleContext,
  type VariantProps,
} from '@gluestack-ui/utils/nativewind-utils';

const SCOPE = 'BUTTON';

const buttonStyle = tva({
  base: 'flex-row items-center justify-center gap-2 rounded-md',
  variants: {
    action: { primary: '', secondary: '', negative: '' },
    variant: { solid: '', outline: 'border bg-transparent', link: 'bg-transparent px-0' },
    size: { sm: 'h-9 px-3', md: 'h-11 px-4', lg: 'h-12 px-5' },
  },
  compoundVariants: [
    { action: 'primary', variant: 'solid', class: 'bg-primary' },
    { action: 'secondary', variant: 'solid', class: 'bg-secondary' },
    { action: 'negative', variant: 'solid', class: 'bg-destructive' },
    { action: 'primary', variant: 'outline', class: 'border-primary' },
    { action: 'secondary', variant: 'outline', class: 'border-border' },
    { action: 'negative', variant: 'outline', class: 'border-destructive' },
  ],
  defaultVariants: { action: 'primary', variant: 'solid', size: 'md' },
});

const buttonTextStyle = tva({
  base: 'font-semibold',
  variants: {
    action: { primary: '', secondary: '', negative: '' },
    variant: { solid: '', outline: '', link: 'underline' },
    size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' },
  },
  compoundVariants: [
    { action: 'primary', variant: 'solid', class: 'text-primary-foreground' },
    { action: 'secondary', variant: 'solid', class: 'text-secondary-foreground' },
    { action: 'negative', variant: 'solid', class: 'text-destructive-foreground' },
    { action: 'primary', variant: 'outline', class: 'text-primary' },
    { action: 'primary', variant: 'link', class: 'text-primary' },
    { action: 'secondary', variant: 'outline', class: 'text-foreground' },
    { action: 'negative', variant: 'outline', class: 'text-destructive' },
    { action: 'negative', variant: 'link', class: 'text-destructive' },
  ],
  defaultVariants: { action: 'primary', variant: 'solid', size: 'md' },
});

type ButtonContext = VariantProps<typeof buttonStyle>;

const ButtonRoot = withStyleContext(Pressable, SCOPE);

export type ButtonProps = PressableProps & ButtonContext & { className?: string };

/**
 * Pressable button. Pair with `ButtonText` / `ButtonSpinner`, which read the
 * button's `action`/`variant`/`size` from context to style themselves.
 */
export function Button({
  action = 'primary',
  variant = 'solid',
  size = 'md',
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <ButtonRoot
      accessibilityRole="button"
      disabled={disabled}
      context={{ action, variant, size }}
      className={cn(
        buttonStyle({ action, variant, size, class: className }),
        disabled && 'opacity-50'
      )}
      {...props}
    />
  );
}

export type ButtonTextProps = RNTextProps & { className?: string };

export function ButtonText({ className, ...props }: ButtonTextProps) {
  const { action, variant, size } = (useStyleContext(SCOPE) ?? {}) as ButtonContext;
  return (
    <RNText className={buttonTextStyle({ action, variant, size, class: className })} {...props} />
  );
}

export type ButtonSpinnerProps = { className?: string; color?: string };

export function ButtonSpinner({ color, className }: ButtonSpinnerProps) {
  return <ActivityIndicator color={color} className={className} />;
}
