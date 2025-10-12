# Frontend 빠른 시작 가이드

## 📦 설치 및 실행

### 1단계: 의존성 설치

```bash
cd frontend
npm install
```

설치되는 주요 패키지:
- Next.js 14
- React 18
- TypeScript 5
- Tailwind CSS 3
- Zustand (상태 관리)
- TanStack Query (데이터 fetching)
- React Hook Form + Zod (폼 관리)
- Axios (HTTP 클라이언트)

### 2단계: 환경 변수 설정

```bash
cp .env.local.example .env.local
```

`.env.local` 파일을 열고 필요한 값을 입력:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_S3_BUCKET_URL=https://your-bucket.s3.amazonaws.com
```

### 3단계: 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 을 열면 프로젝트를 확인할 수 있습니다.

## ✅ 설정 완료 확인

개발 서버가 정상적으로 실행되면 다음을 확인할 수 있습니다:

1. **메인 페이지** (http://localhost:3000)
   - 한국수상안전협회 홈페이지
   - Header와 Footer 포함
   - 3개의 주요 섹션 카드

2. **로그인 페이지** (http://localhost:3000/login)
   - 이메일/비밀번호 입력 폼
   - 회원가입 링크

## 🏗 생성된 구조

```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/login/         ✅ 로그인 페이지
│   │   ├── (main)/                ✅ 메인 레이아웃
│   │   ├── layout.tsx             ✅ Root 레이아웃
│   │   └── page.tsx               ✅ 임시 홈페이지
│   ├── components/
│   │   └── layout/
│   │       ├── Header.tsx         ✅ 헤더 컴포넌트
│   │       └── Footer.tsx         ✅ 푸터 컴포넌트
│   ├── lib/
│   │   ├── constants/routes.ts   ✅ 라우트 상수
│   │   └── utils/cn.ts           ✅ 클래스 병합 유틸
│   └── styles/globals.css        ✅ 글로벌 스타일
├── package.json                   ✅ 의존성 설정
├── tsconfig.json                  ✅ TypeScript 설정
├── tailwind.config.ts            ✅ Tailwind 설정
├── next.config.js                ✅ Next.js 설정
├── .eslintrc.json                ✅ ESLint 설정
├── .prettierrc                   ✅ Prettier 설정
└── .env.local.example            ✅ 환경 변수 예시
```

## 🎨 사용 가능한 스타일 클래스

### 버튼

```tsx
<button className="btn-primary">Primary 버튼</button>
<button className="btn-secondary">Secondary 버튼</button>
<button className="btn-outline">Outline 버튼</button>
```

### 카드

```tsx
<div className="card">
  <h3>카드 제목</h3>
  <p>카드 내용</p>
</div>
```

### 입력 필드

```tsx
<input className="input" type="text" placeholder="입력하세요" />
<textarea className="textarea" placeholder="내용을 입력하세요"></textarea>
```

### 유틸리티

```tsx
<div className="spinner">로딩...</div>
<p className="error-message">에러 메시지</p>
```

## 🔧 개발 도구

### 코드 품질 체크

```bash
# 린트 체크
npm run lint

# 린트 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format

# 타입 체크
npm run type-check
```

### 테스트

```bash
# 테스트 실행
npm run test

# Watch 모드
npm run test:watch

# 커버리지
npm run test:coverage
```

## 📖 다음 단계

### 1. API 클라이언트 설정

`src/lib/api/client.ts` 파일을 생성하여 Axios 클라이언트를 설정합니다.

```tsx
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Request Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 2. 상태 관리 설정

`src/lib/store/authStore.ts` 파일을 생성하여 인증 상태를 관리합니다.

```tsx
import { create } from 'zustand';

interface AuthState {
  user: any | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: async (email, password) => {
    // API 호출
  },
  logout: () => set({ user: null, token: null }),
}));
```

### 3. 페이지 개발 시작

아키텍처 문서의 로드맵을 참고하여 Phase 1부터 개발을 시작합니다.

**Phase 1 (Week 1-4):**
- ✅ 프로젝트 초기 설정 (완료)
- 🔄 인증 시스템 구현
- 🔄 사용자 관리 구현
- 🔄 메인 페이지 및 협회 소개 페이지 개발

## 🚨 문제 해결

### Port 3000이 이미 사용 중인 경우

```bash
# 다른 포트로 실행
PORT=3001 npm run dev
```

### 의존성 설치 오류

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### TypeScript 에러

```bash
# 타입 체크 실행
npm run type-check

# next-env.d.ts 재생성
rm next-env.d.ts
npm run dev
```

## 📚 참고 문서

- [프로젝트 README](./README.md)
- [프론트엔드 아키텍처 문서](../claudedocs/architecture/05_frontend_architecture.md)
- [개발 로드맵](../claudedocs/architecture/08_development_roadmap.md)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)

## 💡 팁

1. **VS Code 확장 프로그램 추천**
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript Vue Plugin (Volar)

2. **개발 시 유용한 단축키**
   - `Ctrl/Cmd + S`: 자동 포맷팅 (Prettier)
   - `Shift + Alt + F`: 수동 포맷팅

3. **브라우저 확장 프로그램 추천**
   - React Developer Tools
   - Redux DevTools (상태 관리 디버깅)

---

설정에 문제가 있거나 질문이 있으시면 팀에 문의하세요!
