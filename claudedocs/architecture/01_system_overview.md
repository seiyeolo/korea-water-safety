# 한국수상안전협회 홈페이지 시스템 아키텍처 개요

## 1. 프로젝트 개요

### 1.1 목적
한국수상안전협회의 디지털 전환을 위한 종합 웹 플랫폼 구축으로, 교육 프로그램 관리, 자격증 발급, 회원 관리, 안전 정보 제공을 통합하는 시스템입니다.

### 1.2 주요 기능 모듈

```
┌─────────────────────────────────────────────────────────────┐
│                    한국수상안전협회 홈페이지                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   메인페이지    │  │   협회소개     │  │  교육프로그램   │    │
│  │   (Main)     │  │   (About)    │  │  (Education)  │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │    자격증      │  │   안전정보     │  │   봉사활동     │    │
│  │(Certification)│  │   (Safety)   │  │  (Volunteer)  │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐                       │
│  │   회원관리     │  │   공지사항     │                       │
│  │   (Member)    │  │   (Notice)   │                       │
│  └──────────────┘  └──────────────┘                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 2. 시스템 아키텍처

### 2.1 전체 아키텍처 다이어그램

```
┌──────────────────────────────────────────────────────────────────┐
│                         Client Layer                              │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  Web Browser (Desktop/Mobile)                          │     │
│  │  - Next.js SSR/CSR                                     │     │
│  │  - React Components                                    │     │
│  │  - Tailwind CSS                                        │     │
│  └────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────┘
                              ↕ HTTPS
┌──────────────────────────────────────────────────────────────────┐
│                      Presentation Layer                           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Next.js Server (SSR/API Routes)                        │    │
│  │  - Server Components                                    │    │
│  │  - API Route Handlers                                   │    │
│  │  - Middleware (Auth, Logging)                          │    │
│  └─────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
                              ↕ REST/GraphQL
┌──────────────────────────────────────────────────────────────────┐
│                      Application Layer                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Backend API Server (NestJS/Express or FastAPI)        │    │
│  │                                                         │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │    │
│  │  │  Auth    │  │ Program  │  │  Cert    │           │    │
│  │  │ Service  │  │ Service  │  │ Service  │           │    │
│  │  └──────────┘  └──────────┘  └──────────┘           │    │
│  │                                                         │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │    │
│  │  │  User    │  │ Content  │  │Volunteer │           │    │
│  │  │ Service  │  │ Service  │  │ Service  │           │    │
│  │  └──────────┘  └──────────┘  └──────────┘           │    │
│  │                                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
                              ↕ SQL/ORM
┌──────────────────────────────────────────────────────────────────┐
│                         Data Layer                                │
│  ┌──────────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   PostgreSQL     │  │    Redis     │  │  S3 Storage  │      │
│  │  (Main DB)       │  │   (Cache)    │  │  (Files)     │      │
│  │  - Users         │  │  - Sessions  │  │  - Certs     │      │
│  │  - Programs      │  │  - Temp Data │  │  - Images    │      │
│  │  - Certs         │  │              │  │  - Documents │      │
│  └──────────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────────────────────────────────────────────────┘
```

### 2.2 아키텍처 패턴
- **3-Tier Architecture**: Presentation, Application, Data 계층 분리
- **Microservices-Ready**: 도메인별 서비스 모듈화로 향후 마이크로서비스 전환 용이
- **API-First Design**: Frontend와 Backend의 명확한 분리
- **Stateless Backend**: JWT 기반 무상태 인증으로 확장성 확보

## 3. 핵심 구성 요소

### 3.1 Frontend (Next.js)
- **역할**: 사용자 인터페이스 및 SEO 최적화
- **기술**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **특징**:
  - Server-Side Rendering (SSR)로 초기 로딩 속도 및 SEO 개선
  - Static Site Generation (SSG)으로 정적 콘텐츠 최적화
  - API Routes로 BFF (Backend for Frontend) 패턴 구현

### 3.2 Backend API (NestJS 또는 FastAPI)
- **역할**: 비즈니스 로직 처리 및 데이터 관리
- **기술**:
  - Option 1: Node.js + NestJS + TypeScript
  - Option 2: Python + FastAPI + Pydantic
- **특징**:
  - RESTful API 설계
  - JWT 기반 인증/인가
  - Role-Based Access Control (RBAC)
  - 입력 검증 및 에러 핸들링

### 3.3 Database (PostgreSQL)
- **역할**: 영구 데이터 저장소
- **기술**: PostgreSQL 15+
- **특징**:
  - ACID 트랜잭션 보장
  - 복잡한 쿼리 및 조인 지원
  - Full-text search 지원 (한글 검색)
  - JSON 컬럼 지원으로 유연한 데이터 구조

### 3.4 Cache (Redis)
- **역할**: 세션 관리 및 성능 최적화
- **기술**: Redis 7+
- **특징**:
  - 세션 데이터 저장
  - API 응답 캐싱
  - Rate limiting
  - 실시간 데이터 처리

### 3.5 File Storage (S3-Compatible)
- **역할**: 파일 및 미디어 저장
- **기술**: AWS S3 또는 호환 스토리지
- **특징**:
  - 자격증 PDF 파일
  - 프로필 이미지
  - 교육 자료
  - 안전 정보 문서

## 4. 데이터 흐름

### 4.1 일반적인 요청 흐름
```
User → Browser → Next.js Server → Backend API → Database → Response
```

### 4.2 인증이 필요한 요청
```
User → Login → Backend → JWT Token → Store in Cookie/LocalStorage
  → Subsequent Requests with JWT → Validation → Protected Resources
```

### 4.3 파일 업로드 흐름
```
User → Upload Form → Backend API → Validation → S3 Storage
  → URL → Database (metadata) → Response
```

## 5. 비기능 요구사항

### 5.1 성능
- 페이지 로딩 시간: 3초 이내 (First Contentful Paint)
- API 응답 시간: 200ms 이내 (평균)
- 동시 사용자: 1,000명 이상 지원

### 5.2 보안
- HTTPS 필수
- JWT 토큰 만료 시간 관리
- XSS, CSRF, SQL Injection 방어
- 개인정보보호법 준수
- 민감 정보 암호화 (AES-256)

### 5.3 확장성
- 수평 확장 가능한 아키텍처
- 데이터베이스 읽기 복제본 지원
- CDN을 통한 정적 자산 배포
- 마이크로서비스 전환 가능한 구조

### 5.4 가용성
- 99.5% 이상 가동률 목표
- 자동 백업 (일일)
- 장애 복구 계획
- 모니터링 및 알림 시스템

## 6. 통합 및 외부 서비스

### 6.1 결제 시스템
- 한국 PG사 연동 (예: 토스페이먼츠, 나이스페이, KG이니시스)
- 교육 프로그램 수강료 결제
- 자격증 발급 수수료 결제

### 6.2 알림 서비스
- 이메일: SMTP 서버 (AWS SES, SendGrid 등)
- SMS: 알림톡/문자 API (카카오, 네이버 클라우드 등)
- 푸시 알림: Firebase Cloud Messaging (선택사항)

### 6.3 문서 생성
- 자격증 PDF 생성: PDF 라이브러리 (pdf-lib, PDFKit 등)
- 수료증 템플릿 시스템

### 6.4 인증 통합
- 소셜 로그인: 카카오, 네이버 OAuth (선택사항)
- 기본 이메일/비밀번호 인증

## 7. 개발 환경 및 도구

### 7.1 버전 관리
- Git + GitHub/GitLab
- Feature branch workflow
- Pull Request 기반 코드 리뷰

### 7.2 CI/CD
- GitHub Actions 또는 GitLab CI
- 자동 테스트 실행
- 자동 배포 (Staging/Production)

### 7.3 모니터링
- Application: Sentry (에러 추적)
- Infrastructure: Prometheus + Grafana
- Logs: ELK Stack 또는 CloudWatch

### 7.4 개발 도구
- IDE: VS Code
- API Testing: Postman, Insomnia
- Database Management: pgAdmin, DBeaver

## 8. 배포 전략

### 8.1 환경 구성
- Development: 로컬 개발 환경
- Staging: 프로덕션과 동일한 구성의 테스트 환경
- Production: 실제 서비스 환경

### 8.2 배포 방식
- 컨테이너화: Docker
- 오케스트레이션: Docker Compose (간단한 구성) 또는 Kubernetes (확장 시)
- Zero-downtime deployment: Blue-green 또는 Rolling update

### 8.3 호스팅 옵션
- **Option 1**: Naver Cloud Platform (한국 시장 최적화)
- **Option 2**: AWS Seoul Region (글로벌 표준)
- **Option 3**: KT Cloud (국내 기업 지원)
- **Option 4**: Vultr, DigitalOcean (비용 효율)

## 9. 다음 단계

이 시스템 개요를 바탕으로 다음 문서들을 참조하세요:
- [02_technology_stack.md](./02_technology_stack.md): 기술 스택 상세 명세
- [03_database_schema.md](./03_database_schema.md): 데이터베이스 설계
- [04_api_specification.md](./04_api_specification.md): API 명세서
- [05_frontend_architecture.md](./05_frontend_architecture.md): 프론트엔드 구조
- [06_security_compliance.md](./06_security_compliance.md): 보안 및 컴플라이언스
- [07_deployment_architecture.md](./07_deployment_architecture.md): 배포 아키텍처
- [08_development_roadmap.md](./08_development_roadmap.md): 개발 로드맵
