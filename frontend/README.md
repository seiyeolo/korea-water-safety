# 한국수상안전협회 홈페이지 - Frontend

Next.js 14, TypeScript, Tailwind CSS로 구축된 한국수상안전협회 웹 애플리케이션 프론트엔드입니다.

## 🚀 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Form Management**: React Hook Form + Zod
- **HTTP Client**: Axios

## 📁 프로젝트 구조

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # 인증 페이지 (로그인, 회원가입)
│   │   ├── (main)/            # 공개 페이지 (메인, 프로그램 등)
│   │   ├── (dashboard)/       # 회원 대시보드
│   │   ├── (admin)/           # 관리자 페이지
│   │   ├── api/               # API Routes
│   │   ├── layout.tsx         # Root Layout
│   │   └── page.tsx           # Home Page
│   ├── components/            # React 컴포넌트
│   │   ├── ui/               # 기본 UI 컴포넌트
│   │   ├── features/         # 기능별 컴포넌트
│   │   ├── layout/           # 레이아웃 컴포넌트 (Header, Footer)
│   │   └── shared/           # 공유 컴포넌트
│   ├── lib/                  # 유틸리티 및 설정
│   │   ├── api/             # API 클라이언트
│   │   ├── hooks/           # Custom Hooks
│   │   ├── store/           # Zustand Store
│   │   ├── utils/           # 유틸리티 함수
│   │   └── constants/       # 상수 정의
│   ├── types/               # TypeScript 타입 정의
│   └── styles/              # 글로벌 스타일
├── public/                  # 정적 파일
├── .env.local.example       # 환경 변수 예시
├── next.config.js           # Next.js 설정
├── tailwind.config.ts       # Tailwind 설정
├── tsconfig.json            # TypeScript 설정
└── package.json
```

## 🛠 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local.example` 파일을 복사하여 `.env.local` 파일을 생성하고 필요한 값을 입력합니다.

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_S3_BUCKET_URL=https://your-bucket.s3.amazonaws.com
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 📝 주요 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 체크
npm run lint

# 린트 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format

# 타입 체크
npm run type-check

# 테스트 실행
npm run test

# 테스트 (Watch 모드)
npm run test:watch

# 테스트 커버리지
npm run test:coverage
```

## 🎨 스타일링

### Tailwind CSS

이 프로젝트는 Tailwind CSS를 사용합니다. 커스텀 스타일은 다음 위치에 정의되어 있습니다:

- **글로벌 스타일**: `src/styles/globals.css`
- **Tailwind 설정**: `tailwind.config.ts`

### 사전 정의된 스타일 클래스

```tsx
// 버튼
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<button className="btn-outline">Outline Button</button>

// 카드
<div className="card">Card Content</div>

// 입력 필드
<input className="input" />
<textarea className="textarea" />

// 에러 메시지
<p className="error-message">Error message</p>

// 로딩 스피너
<div className="spinner" />
```

## 🔧 코드 품질

### ESLint

ESLint는 코드 품질을 유지하기 위해 설정되어 있습니다.

```bash
npm run lint
npm run lint:fix  # 자동 수정
```

### Prettier

Prettier는 일관된 코드 포맷팅을 위해 설정되어 있습니다.

```bash
npm run format
```

### TypeScript

타입 체크:

```bash
npm run type-check
```

## 📖 개발 가이드

### 1. 새 페이지 추가

App Router를 사용하므로 `src/app` 디렉토리에 폴더를 생성합니다.

```tsx
// src/app/(main)/programs/page.tsx
export default function ProgramsPage() {
  return <div>Programs Page</div>;
}
```

### 2. 새 컴포넌트 추가

컴포넌트는 기능별로 분류하여 추가합니다.

```tsx
// src/components/features/programs/ProgramCard.tsx
export function ProgramCard({ program }) {
  return (
    <div className="card">
      <h3>{program.title}</h3>
      <p>{program.description}</p>
    </div>
  );
}
```

### 3. API 호출

API 클라이언트를 통해 백엔드와 통신합니다.

```tsx
// src/lib/api/programs.ts
import { api } from './client';

export const programsApi = {
  getPrograms: async (params) => {
    const response = await api.get('/programs', { params });
    return response.data;
  },
};
```

### 4. 상태 관리 (Zustand)

전역 상태는 Zustand로 관리합니다.

```tsx
// src/lib/store/authStore.ts
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

## 🔐 인증

인증은 JWT 토큰 기반으로 구현됩니다.

- Access Token: 1시간 유효
- Refresh Token: 7일 유효

토큰은 쿠키 또는 LocalStorage에 저장됩니다.

## 🌐 라우팅

### Route Groups

- **(auth)**: 인증 페이지 (로그인, 회원가입)
- **(main)**: 공개 페이지 (메인, 프로그램, 자격증 등)
- **(dashboard)**: 회원 전용 페이지
- **(admin)**: 관리자 전용 페이지

### Protected Routes

인증이 필요한 페이지는 middleware에서 보호됩니다.

```tsx
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');

  if (!token && request.nextUrl.pathname.startsWith('/my')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

## 📦 빌드 및 배포

### 프로덕션 빌드

```bash
npm run build
```

### Docker

Docker를 사용한 배포는 프로젝트 루트의 `docker-compose.yml`을 참조하세요.

```bash
docker build -t watersafety-frontend .
docker run -p 3000:3000 watersafety-frontend
```

## 🧪 테스팅

Vitest와 React Testing Library를 사용하여 테스트합니다.

```bash
# 테스트 실행
npm run test

# Watch 모드
npm run test:watch

# 커버리지 리포트
npm run test:coverage
```

### 테스트 예시

```tsx
// __tests__/components/ProgramCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ProgramCard } from '@/components/features/programs/ProgramCard';

describe('ProgramCard', () => {
  it('renders program information', () => {
    const program = {
      title: 'Test Program',
      description: 'Test Description',
    };

    render(<ProgramCard program={program} />);

    expect(screen.getByText('Test Program')).toBeInTheDocument();
  });
});
```

## 📚 추가 문서

- [시스템 아키텍처](../claudedocs/architecture/01_system_overview.md)
- [프론트엔드 아키텍처](../claudedocs/architecture/05_frontend_architecture.md)
- [API 명세서](../claudedocs/architecture/04_api_specification.md)

## 🤝 기여

1. Feature branch 생성 (`git checkout -b feature/amazing-feature`)
2. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
3. Branch에 Push (`git push origin feature/amazing-feature`)
4. Pull Request 생성

## 📄 라이선스

이 프로젝트는 한국수상안전협회의 소유입니다.
