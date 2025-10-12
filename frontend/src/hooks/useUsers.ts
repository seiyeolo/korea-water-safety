import { useState, useEffect } from 'react';
import { getUsers } from '@/lib/api';
import type { User, GetUsersParams } from '@/types/api';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * 회원 목록을 가져오는 훅
 */
export function useUsers(params?: GetUsersParams): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsers(params);
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch users'));
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [params?.role, params?.status]); // 파라미터 변경 시 재조회

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
  };
}
