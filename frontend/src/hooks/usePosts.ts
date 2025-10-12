import { useState, useEffect } from 'react';
import { getPosts } from '@/lib/api';
import type { Post, GetPostsParams, ApiResponse } from '@/types/api';

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: Error | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
  refetch: () => Promise<void>;
}

/**
 * 게시글 목록을 가져오는 훅
 */
export function usePosts(params?: GetPostsParams): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<UsePostsReturn['pagination']>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: ApiResponse<Post[]> = await getPosts(params);
      setPosts(response.data);
      if (response.meta) {
        setPagination(response.meta);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [params?.category, params?.page, params?.limit]); // 파라미터 변경 시 재조회

  return {
    posts,
    loading,
    error,
    pagination,
    refetch: fetchPosts,
  };
}
