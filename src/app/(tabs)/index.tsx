import { ActivityIndicator, FlatList } from 'react-native';

import { usePosts } from '@/api/posts';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useCounterStore } from '@/stores/counter-store';

export default function HomeScreen() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const reset = useCounterStore((state) => state.reset);
  const { data: posts, isPending, isError, refetch } = usePosts();

  return (
    <VStack space="lg" className="flex-1 bg-background p-4">
      <VStack space="sm">
        <Heading size="md">Zustand</Heading>
        <Text muted>Client state lives in stores under src/stores.</Text>
        <HStack space="md" className="items-center">
          <Button action="primary" onPress={increment}>
            <ButtonText>Count: {count}</ButtonText>
          </Button>
          <Button action="secondary" variant="outline" onPress={reset}>
            <ButtonText>Reset</ButtonText>
          </Button>
        </HStack>
      </VStack>

      <VStack space="sm" className="flex-1">
        <Heading size="md">TanStack Query</Heading>
        <Text muted>Server state lives in hooks under src/api.</Text>
        {isPending ? (
          <ActivityIndicator className="mt-6" />
        ) : isError ? (
          <HStack space="md" className="items-center">
            <Text className="text-destructive">Failed to load posts.</Text>
            <Button variant="link" onPress={() => refetch()}>
              <ButtonText>Retry</ButtonText>
            </Button>
          </HStack>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(post) => String(post.id)}
            contentContainerClassName="gap-2 pb-6"
            renderItem={({ item }) => (
              <Box className="gap-1 rounded-lg bg-secondary p-4">
                <Text bold numberOfLines={1}>
                  {item.title}
                </Text>
                <Text size="sm" muted numberOfLines={2}>
                  {item.body}
                </Text>
              </Box>
            )}
          />
        )}
      </VStack>
    </VStack>
  );
}
