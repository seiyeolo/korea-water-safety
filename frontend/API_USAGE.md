# API 클라이언트 사용 가이드

## 개요

프론트엔드와 백엔드 API를 연동하기 위한 axios 기반 API 클라이언트입니다.

## 설치된 파일

```
frontend/
├── src/
│   ├── lib/
│   │   └── api.ts              # API 클라이언트 (axios 인스턴스 + 함수들)
│   ├── types/
│   │   └── api.ts              # API 응답 타입 정의
│   └── hooks/
│       ├── usePrograms.ts      # 교육 프로그램 데이터 훅
│       ├── usePosts.ts         # 게시글 데이터 훅
│       └── useUsers.ts         # 회원 데이터 훅
├── .env.local                  # 환경 변수
└── API_USAGE.md                # 이 문서
```

## 환경 변수 설정

`.env.local` 파일에 API URL이 설정되어 있습니다:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## 사용 방법

### 1. 직접 API 함수 호출

```typescript
import { getPrograms, getPosts, getUsers } from '@/lib/api';

// 교육 프로그램 목록 가져오기
const programs = await getPrograms();
const activePrograms = await getPrograms({ isActive: true });

// 게시글 목록 가져오기
const posts = await getPosts();
const notices = await getPosts({ category: 'NOTICE', page: 1, limit: 10 });

// 회원 목록 가져오기
const users = await getUsers();
```

### 2. React 훅 사용 (권장)

```typescript
import { usePrograms } from '@/hooks/usePrograms';
import { usePosts } from '@/hooks/usePosts';
import { useUsers } from '@/hooks/useUsers';

function ProgramList() {
  const { programs, loading, error } = usePrograms({ isActive: true });

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      {programs.map((program) => (
        <div key={program.id}>{program.title}</div>
      ))}
    </div>
  );
}

function NoticePage() {
  const { posts, loading, error, pagination } = usePosts({
    category: 'NOTICE',
    page: 1,
    limit: 10,
  });

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <div>
        페이지: {pagination?.page} / {pagination?.totalPages}
      </div>
    </div>
  );
}
```

### 3. API 객체 사용

```typescript
import { api } from '@/lib/api';

// 헬스 체크
const health = await api.health();
console.log(health.status); // 'healthy' | 'unhealthy'

// 통계
const stats = await api.stats();
console.log(stats); // { users: 4, programs: 10, posts: 20, ... }

// 교육 프로그램
const programs = await api.programs.list();
const program = await api.programs.get('program-id');

// 게시글
const posts = await api.posts.list({ category: 'NOTICE' });
const post = await api.posts.get('post-id');

// 회원
const users = await api.users.list();
const user = await api.users.get('user-id');
const registrations = await api.users.registrations('user-id');
const certificates = await api.users.certificates('user-id');
```

## 사용 가능한 API 엔드포인트

### 기본
- `GET /api` - 웰컴 메시지
- `GET /api/health` - 헬스 체크
- `GET /api/stats` - 데이터베이스 통계

### 교육 프로그램
- `GET /api/programs` - 프로그램 목록
- `GET /api/programs?isActive=true` - 활성 프로그램만
- `GET /api/programs/:id` - 프로그램 상세

### 게시글
- `GET /api/posts` - 게시글 목록
- `GET /api/posts?category=NOTICE&page=1&limit=10` - 필터링 + 페이지네이션
- `GET /api/posts/:id` - 게시글 상세

### 회원
- `GET /api/users` - 회원 목록
- `GET /api/users/:id` - 회원 상세
- `GET /api/users/:id/registrations` - 교육 신청 내역
- `GET /api/users/:id/certificates` - 자격증 목록

## TypeScript 타입

모든 API 응답에 대한 TypeScript 타입이 정의되어 있습니다:

```typescript
import type {
  EducationProgram,
  Post,
  User,
  Registration,
  Certificate,
  GetProgramsParams,
  GetPostsParams,
  GetUsersParams,
} from '@/types/api';
```

## 에러 처리

axios 인터셉터가 자동으로 에러를 처리합니다:

```typescript
try {
  const programs = await getPrograms();
} catch (error) {
  console.error('API 호출 실패:', error);
  // 에러 처리 로직
}
```

## 인증 (향후 구현)

현재는 인증이 구현되어 있지 않지만, `api.ts`의 요청 인터셉터에 토큰 추가 로직이 준비되어 있습니다:

```typescript
// 향후 JWT 토큰 추가 예시
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 테스트

브라우저 콘솔에서 직접 테스트할 수 있습니다:

```javascript
// 개발자 도구 콘솔에서
import { api } from '@/lib/api';

// 통계 확인
api.stats().then(console.log);

// 프로그램 목록 확인
api.programs.list().then(console.log);
```

## 주의사항

1. **CORS 설정**: 백엔드에서 CORS가 `http://localhost:3000`으로 설정되어 있어야 합니다.
2. **환경 변수**: `.env.local` 파일이 `.gitignore`에 포함되어 있는지 확인하세요.
3. **타임아웃**: API 요청은 10초 타임아웃이 설정되어 있습니다.
4. **에러 로깅**: 개발 환경에서는 모든 API 에러가 콘솔에 출력됩니다.

## 다음 단계

1. 기존 페이지들을 API 연동으로 전환
2. 로딩 상태 UI 추가
3. 에러 핸들링 개선
4. 인증/인가 시스템 구현
5. 데이터 캐싱 전략 (React Query/SWR 고려)
