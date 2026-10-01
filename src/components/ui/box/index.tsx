import { View, type ViewProps } from 'react-native';
import { tva } from '@gluestack-ui/utils/nativewind-utils';

const boxStyle = tva({ base: '' });

export type BoxProps = ViewProps & { className?: string };

/** Generic layout container. A `View` that accepts Tailwind `className`s. */
export function Box({ className, ...props }: BoxProps) {
  return <View className={boxStyle({ class: className })} {...props} />;
}
