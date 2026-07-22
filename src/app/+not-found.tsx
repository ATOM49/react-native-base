import { Link, Stack } from 'expo-router';

import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <VStack space="md" className="flex-1 items-center justify-center bg-background p-6">
        <Heading size="md">This screen does not exist.</Heading>
        <Link href="/">
          <Text className="text-primary underline">Go to home screen</Text>
        </Link>
      </VStack>
    </>
  );
}
