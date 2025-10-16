import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  ApiResponse,
  HealthStatus,
  DatabaseStats,
  EducationProgram,
  Post,
  User,
  Registration,
  Certificate,
  GetProgramsParams,
  GetPostsParams,
  GetUsersParams,
} from '@/types/api';

// API 베이스 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://strong-wholeness-production.up.railway.app/api';

// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10초 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // CORS credentials 포함
});

// 요청 인터셉터 (JWT 토큰 추가)
apiClient.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 에러 응답 타입
interface ApiErrorResponse {
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  message?: string;
  statusCode?: number;
}

// 응답 인터셉터 (토큰 저장 + 에러 핸들링)
apiClient.interceptors.response.use(
  (response) => {
    // 응답에 accessToken이 있으면 로컬스토리지에 저장
    if (typeof window !== 'undefined') {
      const { accessToken, expiresIn } = response.data;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('expiresIn', expiresIn);
        // 사용자 정보도 저장 (선택)
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
    }
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    // 사용자 친화적 에러 메시지 생성
    if (error.response) {
      // 서버가 응답을 보냈지만 2xx 범위를 벗어난 상태 코드
      const status = error.response.status;
      const data = error.response.data;

      const errorMessage = data?.error?.message || data?.message || '요청 처리에 실패했습니다';

      console.error(`[API Error] ${status}:`, errorMessage);

      // 토큰 만료 시 로컬스토리지 정리
      if (status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('user');
      }
    } else if (error.request) {
      // 요청이 전송되었지만 응답을 받지 못함
      console.error('Network Error: 서버에 연결할 수 없습니다');
    } else {
      // 요청 설정 중 오류 발생
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ==================== API 함수들 ====================

/**
 * 헬스 체크
 */
export const getHealth = async (): Promise<HealthStatus> => {
  const response = await apiClient.get<HealthStatus>('/health');
  return response.data;
};

/**
 * 데이터베이스 통계
 */
export const getStats = async (): Promise<DatabaseStats> => {
  const response = await apiClient.get<DatabaseStats>('/stats');
  return response.data;
};

// ==================== 교육 프로그램 ====================

/**
 * 교육 프로그램 목록 조회
 */
export const getPrograms = async (params?: GetProgramsParams): Promise<EducationProgram[]> => {
  const response = await apiClient.get<EducationProgram[]>('/programs', {
    params,
  });
  return response.data;
};

/**
 * 교육 프로그램 상세 조회
 */
export const getProgramById = async (id: string): Promise<EducationProgram> => {
  const response = await apiClient.get<EducationProgram>(`/programs/${id}`);
  return response.data;
};

// ==================== 게시글 ====================

/**
 * 게시글 목록 조회 (페이지네이션)
 */
export const getPosts = async (params?: GetPostsParams): Promise<ApiResponse<Post[]>> => {
  const response = await apiClient.get<ApiResponse<Post[]>>('/posts', {
    params,
  });
  return response.data;
};

/**
 * 게시글 상세 조회
 */
export const getPostById = async (id: string): Promise<Post> => {
  const response = await apiClient.get<Post>(`/posts/${id}`);
  return response.data;
};

// ==================== 회원 ====================

/**
 * 회원 목록 조회
 */
export const getUsers = async (params?: GetUsersParams): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users', {
    params,
  });
  return response.data;
};

/**
 * 회원 상세 조회
 */
export const getUserById = async (id: string): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data;
};

/**
 * 회원의 교육 신청 내역 조회
 */
export const getUserRegistrations = async (userId: string): Promise<Registration[]> => {
  const response = await apiClient.get<Registration[]>(`/users/${userId}/registrations`);
  return response.data;
};

/**
 * 회원의 자격증 목록 조회
 */
export const getUserCertificates = async (userId: string): Promise<Certificate[]> => {
  const response = await apiClient.get<Certificate[]>(`/users/${userId}/certificates`);
  return response.data;
};

// ==================== 내보내기 ====================

export default apiClient;

// 편의를 위한 API 객체
export const api = {
  // 기본
  health: getHealth,
  stats: getStats,

  // 교육 프로그램
  programs: {
    list: getPrograms,
    get: getProgramById,
  },

  // 게시글
  posts: {
    list: getPosts,
    get: getPostById,
  },

  // 회원
  users: {
    list: getUsers,
    get: getUserById,
    registrations: getUserRegistrations,
    certificates: getUserCertificates,
  },
};
