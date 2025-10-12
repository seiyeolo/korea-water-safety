import { useState, useEffect } from 'react';
import { getPrograms } from '@/lib/api';
import type { EducationProgram, GetProgramsParams } from '@/types/api';

interface UseProgramsReturn {
  programs: EducationProgram[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * 교육 프로그램 목록을 가져오는 훅
 */
export function usePrograms(params?: GetProgramsParams): UseProgramsReturn {
  const [programs, setPrograms] = useState<EducationProgram[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPrograms(params);
      setPrograms(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch programs'));
      console.error('Error fetching programs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [params?.isActive]); // isActive 파라미터가 변경될 때마다 재조회

  return {
    programs,
    loading,
    error,
    refetch: fetchPrograms,
  };
}
