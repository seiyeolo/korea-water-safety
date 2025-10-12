# 프론트엔드 아키텍처

## 1. 프론트엔드 개요

### 1.1 기술 스택
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Form Management**: React Hook Form + Zod
- **UI Components**: Shadcn/ui

### 1.2 프로젝트 구조
```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # 인증 관련 라우트 그룹
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── layout.tsx
│   │   ├── (main)/            # 메인 라우트 그룹
│   │   │   ├── page.tsx       # 홈페이지
│   │   │   ├── about/         # 협회소개
│   │   │   ├── programs/      # 교육프로그램
│   │   │   ├── certifications/ # 자격증
│   │   │   ├── safety/        # 안전정보
│   │   │   ├── volunteer/     # 봉사활동
│   │   │   ├── notices/       # 공지사항
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/       # 회원 대시보드
│   │   │   ├── my/
│   │   │   │   ├── profile/
│   │   │   │   ├── enrollments/
│   │   │   │   ├── certifications/
│   │   │   │   └── volunteer/
│   │   │   └── layout.tsx
│   │   ├── (admin)/           # 관리자 페이지
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   ├── programs/
│   │   │   └── layout.tsx
│   │   ├── api/               # API Routes
│   │   ├── layout.tsx         # Root Layout
│   │   └── not-found.tsx
│   ├── components/            # React 컴포넌트
│   │   ├── ui/               # 기본 UI 컴포넌트 (Shadcn)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── layout/           # 레이아웃 컴포넌트
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navigation.tsx
│   │   ├── features/         # 기능별 컴포넌트
│   │   │   ├── auth/
│   │   │   ├── programs/
│   │   │   ├── certifications/
│   │   │   └── ...
│   │   └── shared/           # 공유 컴포넌트
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── Pagination.tsx
│   │       └── ...
│   ├── lib/                  # 유틸리티 및 설정
│   │   ├── api/             # API 클라이언트
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   ├── programs.ts
│   │   │   └── ...
│   │   ├── hooks/           # Custom Hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── usePrograms.ts
│   │   │   └── ...
│   │   ├── store/           # Zustand Store
│   │   │   ├── authStore.ts
│   │   │   └── uiStore.ts
│   │   ├── utils/           # 유틸리티 함수
│   │   │   ├── format.ts
│   │   │   ├── validation.ts
│   │   │   └── ...
│   │   └── constants/       # 상수
│   │       ├── routes.ts
│   │       └── config.ts
│   ├── types/               # TypeScript 타입 정의
│   │   ├── api.ts
│   │   ├── models.ts
│   │   └── ...
│   └── styles/              # 글로벌 스타일
│       └── globals.css
├── public/                  # 정적 파일
│   ├── images/
│   ├── fonts/
│   └── ...
├── .env.local              # 환경 변수
├── next.config.js          # Next.js 설정
├── tailwind.config.ts      # Tailwind 설정
├── tsconfig.json           # TypeScript 설정
└── package.json
```

## 2. 라우팅 구조

### 2.1 Public Routes (인증 불필요)
```typescript
// app/(main)/page.tsx - 메인페이지
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedPrograms />
      <RecentNotices />
      <SafetyTips />
    </>
  );
}

// app/(main)/about/page.tsx - 협회소개
export default function AboutPage() {
  return <AboutContent />;
}

// app/(main)/programs/page.tsx - 교육프로그램 목록
export default function ProgramsPage() {
  return <ProgramsList />;
}

// app/(main)/programs/[id]/page.tsx - 프로그램 상세
export default function ProgramDetailPage({ params }: { params: { id: string } }) {
  return <ProgramDetail programId={params.id} />;
}
```

### 2.2 Auth Routes (인증 관련)
```typescript
// app/(auth)/login/page.tsx
export default function LoginPage() {
  return <LoginForm />;
}

// app/(auth)/register/page.tsx
export default function RegisterPage() {
  return <RegisterForm />;
}
```

### 2.3 Protected Routes (인증 필요)
```typescript
// app/(dashboard)/my/profile/page.tsx
import { requireAuth } from '@/lib/auth';

export default async function MyProfilePage() {
  await requireAuth();
  return <ProfileContent />;
}

// middleware.ts - 인증 미들웨어
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');

  if (!token && request.nextUrl.pathname.startsWith('/my')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

### 2.4 Admin Routes (관리자 전용)
```typescript
// app/(admin)/dashboard/page.tsx
import { requireAdmin } from '@/lib/auth';

export default async function AdminDashboardPage() {
  await requireAdmin();
  return <AdminDashboard />;
}
```

## 3. 컴포넌트 아키텍처

### 3.1 레이아웃 컴포넌트

#### Header.tsx
```typescript
'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';

export function Header() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            한국수상안전협회
          </Link>

          <ul className="flex gap-6">
            <li><Link href="/about">협회소개</Link></li>
            <li><Link href="/programs">교육프로그램</Link></li>
            <li><Link href="/certifications">자격증</Link></li>
            <li><Link href="/safety">안전정보</Link></li>
            <li><Link href="/volunteer">봉사활동</Link></li>
            <li><Link href="/notices">공지사항</Link></li>
          </ul>

          <div>
            {isAuthenticated ? (
              <Link href="/my/profile">{user?.name}</Link>
            ) : (
              <Link href="/login">로그인</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
```

### 3.2 Feature 컴포넌트

#### ProgramsList.tsx
```typescript
'use client';

import { usePrograms } from '@/lib/hooks/usePrograms';
import { ProgramCard } from './ProgramCard';
import { Pagination } from '@/components/shared/Pagination';

export function ProgramsList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = usePrograms({ page, limit: 12 });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">교육 프로그램</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={data?.pagination.totalPages || 1}
        onPageChange={setPage}
      />
    </div>
  );
}
```

#### ProgramCard.tsx
```typescript
import Link from 'next/link';
import Image from 'next/image';
import { Program } from '@/types/models';

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Link href={`/programs/${program.id}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
        <Image
          src={program.thumbnailUrl || '/default-program.jpg'}
          alt={program.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {program.description}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {program.durationDays}일 과정
            </span>
            <span className="text-lg font-bold text-blue-600">
              {program.price.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
```

### 3.3 Form 컴포넌트

#### LoginForm.tsx
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/lib/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다')
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      // 로그인 성공 시 리다이렉트
      router.push('/my/profile');
    } catch (error) {
      // 에러 처리
      toast.error('로그인에 실패했습니다');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="이메일"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="비밀번호"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
}
```

## 4. 상태 관리

### 4.1 Zustand Store

#### authStore.ts
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../api/client';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        const { user, accessToken } = response.data.data;

        set({
          user,
          token: accessToken,
          isAuthenticated: true
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },

      refreshToken: async () => {
        // 토큰 갱신 로직
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);
```

## 5. 데이터 Fetching

### 5.1 TanStack Query (React Query)

#### usePrograms.ts
```typescript
import { useQuery } from '@tanstack/react-query';
import { programsApi } from '@/lib/api/programs';

interface UseProgramsParams {
  page?: number;
  limit?: number;
  category?: string;
}

export function usePrograms(params: UseProgramsParams = {}) {
  return useQuery({
    queryKey: ['programs', params],
    queryFn: () => programsApi.getPrograms(params),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000 // 10분
  });
}

export function useProgram(id: string) {
  return useQuery({
    queryKey: ['program', id],
    queryFn: () => programsApi.getProgram(id),
    enabled: !!id
  });
}

export function useEnrollProgram() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EnrollmentData) => programsApi.enroll(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      toast.success('수강 신청이 완료되었습니다');
    },
    onError: (error) => {
      toast.error('수강 신청에 실패했습니다');
    }
  });
}
```

### 5.2 API Client

#### client.ts
```typescript
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor (토큰 추가)
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (에러 처리)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 갱신 시도
      const { refreshToken } = useAuthStore.getState();
      try {
        await refreshToken();
        return api.request(error.config);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
```

## 6. 스타일링

### 6.1 Tailwind Config
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8'
        }
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
```

### 6.2 글로벌 스타일
```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition;
  }
}
```

## 7. 최적화

### 7.1 이미지 최적화
```typescript
import Image from 'next/image';

export function OptimizedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      loading="lazy"
      placeholder="blur"
      blurDataURL="/placeholder.jpg"
    />
  );
}
```

### 7.2 코드 스플리팅
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false // 클라이언트 사이드에서만 로드
});
```

### 7.3 메타데이터 (SEO)
```typescript
// app/programs/[id]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const program = await getProgram(params.id);

  return {
    title: `${program.title} | 한국수상안전협회`,
    description: program.description,
    openGraph: {
      title: program.title,
      description: program.description,
      images: [program.thumbnailUrl]
    }
  };
}
```

## 8. 테스팅

### 8.1 컴포넌트 테스트
```typescript
// __tests__/components/ProgramCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ProgramCard } from '@/components/features/programs/ProgramCard';

describe('ProgramCard', () => {
  const mockProgram = {
    id: '1',
    title: '테스트 프로그램',
    description: '설명',
    price: 50000,
    durationDays: 3
  };

  it('renders program information correctly', () => {
    render(<ProgramCard program={mockProgram} />);

    expect(screen.getByText('테스트 프로그램')).toBeInTheDocument();
    expect(screen.getByText('50,000원')).toBeInTheDocument();
  });
});
```

## 9. 접근성 (Accessibility)

### 9.1 시맨틱 HTML
```typescript
export function AccessibleButton() {
  return (
    <button
      type="button"
      aria-label="수강 신청하기"
      className="btn-primary"
    >
      수강 신청
    </button>
  );
}
```

### 9.2 키보드 네비게이션
```typescript
export function AccessibleNav() {
  return (
    <nav aria-label="주요 메뉴">
      <ul role="menubar">
        <li role="none">
          <Link href="/programs" role="menuitem">교육프로그램</Link>
        </li>
      </ul>
    </nav>
  );
}
```

## 10. 환경 변수

### .env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_S3_BUCKET_URL=https://s3.amazonaws.com/bucket-name
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 11. 다음 단계

- [06_security_compliance.md](./06_security_compliance.md): 프론트엔드 보안
- [07_deployment_architecture.md](./07_deployment_architecture.md): 배포 설정
