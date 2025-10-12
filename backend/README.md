# 한국수상안전협회 Backend API

Node.js + TypeScript + Prisma ORM + PostgreSQL 기반 백엔드 서버

## 기술 스택

- **Runtime**: Node.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Package Manager**: npm

## 프로젝트 구조

```
backend/
├── prisma/
│   ├── schema.prisma        # 데이터베이스 스키마 정의
│   └── migrations/          # 마이그레이션 파일들
├── src/
│   ├── lib/
│   │   └── prisma.ts        # Prisma Client 싱글톤
│   └── index.ts             # 애플리케이션 진입점
├── .env                     # 환경 변수 (git에 포함 안됨)
├── .env.example             # 환경 변수 예시
├── package.json
├── tsconfig.json
└── README.md
```

## 데이터베이스 스키마

### 모델 목록

1. **User** (회원)
   - 일반 회원, 강사, 관리자 역할 구분
   - 이메일 기반 인증
   - 상태 관리 (활성/비활성/정지)

2. **EducationProgram** (교육 프로그램)
   - 교육 과정 정보 관리
   - 일정, 정원, 가격 정보
   - 모집 기간 설정

3. **Registration** (교육 신청)
   - 회원의 교육 프로그램 신청 관리
   - 결제 및 수료 정보
   - 상태 관리 (대기/확정/수료/취소)

4. **Certificate** (자격증)
   - 국가자격증 및 민간자격증 관리
   - 발급 및 만료일 관리
   - 상태 관리 (유효/만료/취소)

5. **Post** (게시글)
   - 공지사항, 새소식, 행사, FAQ
   - 카테고리별 분류
   - 상태 관리 (임시저장/게시/보관)

6. **Attachment** (첨부파일)
   - 게시글의 첨부파일 관리
   - 파일 메타데이터 저장

### 관계도

```
User (1) ──< (N) Registration
User (1) ──< (N) Certificate
User (1) ──< (N) Post

EducationProgram (1) ──< (N) Registration

Post (1) ──< (N) Attachment
```

## 설치 및 실행

### 1. 환경 설정

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 DATABASE_URL 등 필요한 값 수정
```

### 2. 데이터베이스 설정

PostgreSQL이 설치되어 있어야 합니다.

```bash
# PostgreSQL 데이터베이스 생성
createdb water_safety_association

# 또는 psql에서
psql -U postgres
CREATE DATABASE water_safety_association;
\q
```

### 3. 마이그레이션 실행

```bash
# 초기 마이그레이션 생성 및 실행
npm run prisma:migrate

# Prisma Studio 실행 (데이터베이스 GUI)
npm run prisma:studio
```

### 4. 애플리케이션 실행

```bash
# 개발 모드
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

## 주요 npm 스크립트

```bash
# 개발 서버 실행
npm run dev

# TypeScript 컴파일
npm run build

# 프로덕션 서버 실행
npm start

# Prisma Client 생성
npm run prisma:generate

# 마이그레이션 실행
npm run prisma:migrate

# Prisma Studio 실행 (데이터베이스 GUI)
npm run prisma:studio

# 시드 데이터 추가
npm run prisma:seed
```

## 환경 변수

`.env` 파일에 다음 환경 변수를 설정하세요:

```env
# 데이터베이스 연결
DATABASE_URL="postgresql://username:password@localhost:5432/water_safety_association"

# JWT 설정
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# 서버 설정
NODE_ENV="development"
PORT=4000

# 파일 업로드
MAX_FILE_SIZE=10485760
UPLOAD_DIR="./uploads"

# CORS
CORS_ORIGIN="http://localhost:3000"
```

## Prisma 주요 명령어

```bash
# 스키마 변경 후 마이그레이션 생성
npx prisma migrate dev --name describe_your_change

# 프로덕션 마이그레이션 배포
npx prisma migrate deploy

# 데이터베이스 리셋 (개발 환경만!)
npx prisma migrate reset

# Prisma Client 재생성
npx prisma generate

# 데이터베이스 GUI 열기
npx prisma studio
```

## 데이터베이스 쿼리 예시

```typescript
import { prisma } from './lib/prisma';

// 사용자 생성
const user = await prisma.user.create({
  data: {
    email: 'test@example.com',
    password: 'hashed_password',
    name: '홍길동',
    role: 'USER',
  },
});

// 교육 프로그램 조회
const programs = await prisma.educationProgram.findMany({
  where: {
    isActive: true,
    startDate: {
      gte: new Date(),
    },
  },
  include: {
    registrations: true,
  },
});

// 교육 신청
const registration = await prisma.registration.create({
  data: {
    userId: user.id,
    programId: programs[0].id,
    status: 'PENDING',
    paymentAmount: programs[0].price,
  },
});

// 게시글 조회 (첨부파일 포함)
const posts = await prisma.post.findMany({
  where: {
    category: 'NOTICE',
    status: 'PUBLISHED',
  },
  include: {
    author: {
      select: {
        name: true,
        email: true,
      },
    },
    attachments: true,
  },
  orderBy: {
    publishedAt: 'desc',
  },
});
```

## 다음 단계

1. **API 라우터 구현** (Express.js 또는 Fastify)
2. **인증/인가 미들웨어** (JWT 기반)
3. **파일 업로드 처리** (Multer)
4. **이메일 발송** (Nodemailer)
5. **API 문서화** (Swagger/OpenAPI)
6. **테스트 작성** (Jest)
7. **에러 핸들링**
8. **로깅 시스템** (Winston)

## 참고 자료

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
