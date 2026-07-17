import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';

import { usePosts } from '@/api/posts';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useCounterStore } from '@/stores/counter-store';

export default function HomeScreen() {
  const theme = useTheme();
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const reset = useCounterStore((state) => state.reset);
  const { data: posts, isPending, isError, refetch } = usePosts();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.section}>
        <ThemedText type="subtitle">Zustand</ThemedText>
        <ThemedText themeColor="textSecondary">
          Client state lives in stores under src/stores.
        </ThemedText>
        <View style={styles.row}>
          <Pressable
            accessibilityRole="button"
            onPress={increment}
            style={[styles.button, { backgroundColor: theme.tint }]}
          >
            <ThemedText style={styles.buttonLabel}>Count: {count}</ThemedText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={reset}
            style={[styles.button, { backgroundColor: theme.backgroundElement }]}
          >
            <ThemedText>Reset</ThemedText>
          </Pressable>
        </View>
      </View>

      <View style={[styles.section, styles.grow]}>
        <ThemedText type="subtitle">TanStack Query</ThemedText>
        <ThemedText themeColor="textSecondary">
          Server state lives in hooks under src/api.
        </ThemedText>
        {isPending ? (
          <ActivityIndicator style={styles.spinner} />
        ) : isError ? (
          <View style={styles.row}>
            <ThemedText themeColor="danger">Failed to load posts.</ThemedText>
            <Pressable accessibilityRole="button" onPress={() => refetch()}>
              <ThemedText themeColor="tint">Retry</ThemedText>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(post) => String(post.id)}
            renderItem={({ item }) => (
              <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
                <ThemedText type="smallBold" numberOfLines={1}>
                  {item.title}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
                  {item.body}
                </ThemedText>
              </View>
            )}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
    gap: Spacing.lg,
  },
  section: {
    gap: Spacing.sm,
  },
  grow: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  buttonLabel: {
    color: '#ffffff',
  },
  spinner: {
    marginTop: Spacing.lg,
  },
  list: {
    gap: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
  card: {
    borderRadius: 8,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
});
