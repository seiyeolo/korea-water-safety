# 기술 스택 명세

## 1. Frontend 기술 스택

### 1.1 Core Framework
- **Next.js 14+** (React Framework)
  - 이유: SSR/SSG 지원, 뛰어난 SEO, API Routes, 이미지 최적화
  - App Router 사용 (최신 아키텍처)
  - Server Components + Client Components 혼합 사용

### 1.2 UI/UX
- **React 18+**
  - Concurrent Features
  - Automatic Batching
  - Suspense for Data Fetching

- **TypeScript 5+**
  - 타입 안정성
  - 개발 생산성 향상
  - 리팩토링 안정성

- **Tailwind CSS 3+**
  - Utility-first CSS
  - 반응형 디자인
  - 다크 모드 지원
  - 한글 폰트 최적화 (Pretendard, Noto Sans KR)

### 1.3 State Management
- **Zustand** (추천) 또는 **Context API**
  - Zustand: 간단하고 가벼운 상태 관리
  - Redux Toolkit: 복잡한 상태 관리 필요 시

### 1.4 Form Management
- **React Hook Form**
  - 성능 최적화
  - 간편한 유효성 검증
  - **Zod** 또는 **Yup**: 스키마 기반 검증

### 1.5 Data Fetching
- **TanStack Query (React Query)**
  - 서버 상태 관리
  - 캐싱 및 재검증
  - Optimistic Updates
  - Infinite Scrolling

### 1.6 UI Components
- **Shadcn/ui** (추천) 또는 **Radix UI**
  - 접근성 (a11y) 지원
  - 커스터마이징 가능
  - Tailwind와 완벽한 통합

- **Lucide Icons** 또는 **Heroicons**
  - 모던하고 일관된 아이콘 세트

### 1.7 Additional Libraries
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "zustand": "^4.5.0",
    "react-hook-form": "^7.49.0",
    "zod": "^3.22.0",
    "@tanstack/react-query": "^5.17.0",
    "axios": "^1.6.0",
    "date-fns": "^3.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  }
}
```

## 2. Backend 기술 스택

### Option 1: Node.js + NestJS (추천)

#### 2.1.1 Core Framework
- **NestJS 10+**
  - 이유: TypeScript 네이티브, 모듈화, DI, 테스트 용이
  - Express 기반 (또는 Fastify로 전환 가능)
  - Decorator 기반 아키텍처

#### 2.1.2 ORM
- **Prisma**
  - 타입 안전성
  - 마이그레이션 관리
  - 직관적인 쿼리 API
  - PostgreSQL 완벽 지원

- **대안: TypeORM**
  - Decorator 기반
  - Active Record/Data Mapper 패턴

#### 2.1.3 Authentication
- **Passport.js**
  - JWT Strategy
  - OAuth2 Strategy (카카오, 네이버)

- **bcrypt**: 비밀번호 해싱

#### 2.1.4 Validation
- **class-validator** + **class-transformer**
  - DTO 검증
  - 자동 타입 변환

#### 2.1.5 Configuration
- **@nestjs/config**
  - 환경 변수 관리
  - 타입 안전한 설정

#### 2.1.6 Dependencies
```json
{
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/config": "^3.1.0",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.0",
    "@prisma/client": "^5.8.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "bcrypt": "^5.1.1",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1"
  }
}
```

### Option 2: Python + FastAPI (대안)

#### 2.2.1 Core Framework
- **FastAPI**
  - 이유: 빠른 성능, 자동 문서화, 타입 힌트
  - Async/await 지원
  - Pydantic 검증

#### 2.2.2 ORM
- **SQLAlchemy 2.0**
  - Mature ORM
  - Async 지원

- **Alembic**: 마이그레이션 도구

#### 2.2.3 Authentication
- **python-jose**: JWT
- **passlib**: 비밀번호 해싱
- **python-multipart**: 파일 업로드

#### 2.2.4 Dependencies
```txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
sqlalchemy==2.0.25
alembic==1.13.1
psycopg2-binary==2.9.9
pydantic==2.5.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
```

## 3. Database 기술 스택

### 3.1 Primary Database
- **PostgreSQL 15+**
  - 이유: ACID 보장, 복잡한 쿼리, JSON 지원
  - Extensions:
    - `pg_trgm`: Full-text search (한글)
    - `uuid-ossp`: UUID 생성
    - `pgcrypto`: 암호화

### 3.2 Cache & Session Store
- **Redis 7+**
  - In-memory 데이터 저장소
  - Session 관리
  - Rate limiting
  - Pub/Sub (실시간 기능)

### 3.3 Search Engine (선택사항)
- **Elasticsearch** (대규모 검색 필요 시)
  - 한글 형태소 분석 (nori analyzer)
  - 전문 검색 (full-text search)

## 4. File Storage

### 4.1 Object Storage
- **AWS S3** (또는 호환 스토리지)
  - 네이버 클라우드 Object Storage
  - KT Cloud Object Storage
  - MinIO (자체 호스팅 옵션)

### 4.2 CDN
- **CloudFlare** (추천)
  - 무료 플랜 제공
  - DDoS 방어
  - SSL/TLS 자동화

- **대안**: AWS CloudFront, 네이버 CDN

## 5. DevOps & Infrastructure

### 5.1 Containerization
- **Docker**
  - Dockerfile: 멀티 스테이지 빌드
  - Docker Compose: 로컬 개발 환경

```yaml
# 예시 서비스 구성
services:
  - frontend (Next.js)
  - backend (NestJS/FastAPI)
  - postgres
  - redis
  - nginx (리버스 프록시)
```

### 5.2 Orchestration (Production)
- **Docker Compose** (소규모)
  - 간단한 배포
  - 단일 서버 환경

- **Kubernetes** (대규모)
  - 자동 스케일링
  - 무중단 배포
  - 서비스 메시

### 5.3 CI/CD
- **GitHub Actions** (추천)
  ```yaml
  # .github/workflows/deploy.yml
  - name: Run tests
  - name: Build Docker images
  - name: Deploy to server
  ```

- **대안**: GitLab CI, Jenkins

### 5.4 Monitoring & Logging

#### Application Monitoring
- **Sentry**
  - 에러 추적
  - 성능 모니터링
  - 사용자 피드백

#### Infrastructure Monitoring
- **Prometheus + Grafana**
  - 메트릭 수집 및 시각화
  - 알림 시스템

#### Logging
- **Winston** (Node.js) 또는 **Loguru** (Python)
  - 구조화된 로깅
  - 로그 레벨 관리

- **ELK Stack** (Elasticsearch, Logstash, Kibana)
  - 중앙 집중식 로그 관리
  - 로그 분석 및 검색

### 5.5 Testing

#### Frontend Testing
- **Vitest**: 단위 테스트
- **React Testing Library**: 컴포넌트 테스트
- **Playwright**: E2E 테스트

#### Backend Testing
- **Jest** (NestJS) 또는 **pytest** (FastAPI)
  - 단위 테스트
  - 통합 테스트
  - API 테스트

## 6. Additional Services

### 6.1 Email Service
- **AWS SES** (비용 효율적)
- **SendGrid** (사용 편의성)
- **Mailgun** (대안)

### 6.2 SMS Service
- **네이버 클라우드 SENS**
- **카카오 알림톡**
- **Twilio** (국제 SMS)

### 6.3 Payment Gateway
- **토스페이먼츠** (추천)
  - 간편한 통합
  - 다양한 결제 수단

- **대안**: 나이스페이, KG이니시스, 카카오페이

### 6.4 Analytics
- **Google Analytics 4**
  - 사용자 행동 분석
  - 전환 추적

- **Hotjar** (선택사항)
  - 히트맵
  - 세션 리플레이

## 7. Development Tools

### 7.1 Code Quality
- **ESLint**: 린팅
- **Prettier**: 코드 포맷팅
- **Husky**: Git hooks
- **lint-staged**: Pre-commit 검사

### 7.2 API Development
- **Swagger/OpenAPI**: API 문서화
  - NestJS: `@nestjs/swagger`
  - FastAPI: 자동 생성

- **Postman**: API 테스트

### 7.3 Database Tools
- **pgAdmin** 또는 **DBeaver**: PostgreSQL 관리
- **RedisInsight**: Redis 모니터링

### 7.4 Version Control
- **Git**
- **GitHub** 또는 **GitLab**
  - 코드 저장소
  - Issue 트래킹
  - Pull Request 워크플로우

## 8. 기술 스택 결정 매트릭스

| 항목 | NestJS (Option 1) | FastAPI (Option 2) |
|------|-------------------|---------------------|
| 언어 | TypeScript | Python |
| 성능 | 매우 좋음 | 매우 좋음 |
| 타입 안전성 | 우수 | 좋음 |
| 생태계 | 풍부 (npm) | 풍부 (pip) |
| 학습 곡선 | 중간 | 낮음 |
| 엔터프라이즈 | 우수 | 좋음 |
| 커뮤니티 | 활발 | 활발 |
| 추천 | 프론트엔드가 TS인 경우 | 데이터 처리가 많은 경우 |

## 9. 권장 기술 스택 조합

### 최종 권장안
```
Frontend:  Next.js 14 + TypeScript + Tailwind CSS + Zustand
Backend:   NestJS + Prisma + PostgreSQL + Redis
Storage:   AWS S3 (or 네이버 Object Storage)
Deploy:    Docker + Docker Compose (초기) → Kubernetes (확장 시)
CI/CD:     GitHub Actions
Monitoring: Sentry + Prometheus + Grafana
```

### 이유
- TypeScript 풀스택으로 타입 안전성 극대화
- Next.js로 SEO 및 성능 최적화
- NestJS로 확장 가능한 백엔드 아키텍처
- PostgreSQL로 데이터 무결성 보장
- 한국 시장에 최적화된 서비스 통합

## 10. 개발 환경 설정

### 10.1 Required Software
```bash
# Node.js & npm
node >= 18.x
npm >= 9.x

# PostgreSQL
postgresql >= 15.x

# Redis
redis >= 7.x

# Docker
docker >= 24.x
docker-compose >= 2.x
```

### 10.2 IDE Extensions (VS Code)
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma
- GitLens
- Thunder Client (API 테스트)

### 10.3 Environment Variables Template
```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# S3
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"
AWS_REGION="ap-northeast-2"
AWS_S3_BUCKET="your-bucket"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email"
SMTP_PASS="your-password"

# App
NODE_ENV="development"
PORT="3000"
API_PORT="4000"
```

## 11. 다음 단계

기술 스택을 바탕으로 다음 문서를 참조하세요:
- [03_database_schema.md](./03_database_schema.md): 데이터베이스 스키마 설계
- [04_api_specification.md](./04_api_specification.md): API 엔드포인트 명세
- [05_frontend_architecture.md](./05_frontend_architecture.md): 프론트엔드 구조 상세
