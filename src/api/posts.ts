/**
 * Example server-state module: one file per resource, exporting query options
 * and hooks. Delete this once you wire up your own API.
 */
import { queryOptions, useQuery } from '@tanstack/react-query';

import { apiFetch } from '@/api/client';

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: () => apiFetch<Post[]>('/posts?_limit=10'),
});

export function usePosts() {
  return useQuery(postsQueryOptions);
}
