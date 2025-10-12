# 빠른 참조 가이드 (Quick Reference)

## 🎯 핵심 정보 한눈에 보기

### 프로젝트 개요
- **이름**: 한국수상안전협회 홈페이지
- **유형**: 풀스택 웹 애플리케이션
- **주요 기능**: 교육 프로그램, 자격증 관리, 봉사 활동, 회원 관리
- **개발 기간**: 16주 (4개월)
- **팀 규모**: 4-6명

---

## 🛠 기술 스택 요약

### Frontend
```
Framework:  Next.js 14
Language:   TypeScript 5+
Styling:    Tailwind CSS 3+
State:      Zustand
Data:       TanStack Query (React Query)
Forms:      React Hook Form + Zod
UI:         Shadcn/ui
```

### Backend
```
Framework:  NestJS (추천) or FastAPI
Language:   TypeScript or Python
ORM:        Prisma or SQLAlchemy
Auth:       JWT + bcrypt
```

### Database
```
Primary:    PostgreSQL 15+
Cache:      Redis 7+
Storage:    AWS S3 or compatible
```

### DevOps
```
Container:  Docker + Docker Compose
CI/CD:      GitHub Actions
Proxy:      Nginx
Monitor:    Prometheus + Grafana
```

---

## 📊 데이터베이스 테이블 (13개)

| 테이블 | 설명 | 주요 컬럼 |
|--------|------|-----------|
| users | 사용자 계정 | email, password_hash, role |
| programs | 교육 프로그램 | title, category, price, duration_days |
| program_schedules | 프로그램 일정 | start_date, end_date, capacity |
| enrollments | 수강 신청 | user_id, program_id, status |
| certification_types | 자격증 종류 | name, valid_years, price |
| certifications | 발급 자격증 | cert_number, issued_at, expires_at |
| volunteer_activities | 봉사 활동 | title, activity_date, capacity |
| volunteer_registrations | 봉사 신청 | user_id, activity_id, status |
| content_posts | 게시글 | category, title, content |
| comments | 댓글 | post_id, user_id, content |
| payments | 결제 내역 | amount, status, transaction_id |
| attachments | 첨부파일 | entity_type, entity_id, file_url |
| audit_logs | 감사 로그 | user_id, action, entity_type |

---

## 🌐 주요 API 엔드포인트

### 인증
```
POST   /auth/register        회원가입
POST   /auth/login           로그인
POST   /auth/refresh         토큰 갱신
POST   /auth/logout          로그아웃
```

### 사용자
```
GET    /users/me             내 프로필
PATCH  /users/me             프로필 수정
DELETE /users/me             회원 탈퇴
```

### 교육 프로그램
```
GET    /programs             프로그램 목록
GET    /programs/:id         프로그램 상세
POST   /enrollments          수강 신청
GET    /enrollments/me       내 수강 신청
```

### 자격증
```
GET    /certification-types  자격증 종류
GET    /certifications/me    내 자격증
GET    /certifications/verify/:certNumber  자격증 검증
GET    /certifications/:id/download        자격증 다운로드
```

### 봉사 활동
```
GET    /volunteer-activities           봉사 활동 목록
POST   /volunteer-registrations        봉사 활동 신청
GET    /volunteer-registrations/me     내 봉사 신청
```

### 콘텐츠
```
GET    /content/notices      공지사항 목록
GET    /content/notices/:id  공지사항 상세
GET    /content/safety-info  안전정보 목록
GET    /content/faqs         FAQ 목록
```

---

## 🗂 프로젝트 구조

### Frontend (Next.js)
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 페이지
│   ├── (main)/            # 공개 페이지
│   ├── (dashboard)/       # 회원 대시보드
│   └── (admin)/           # 관리자 페이지
├── components/
│   ├── ui/               # 기본 UI 컴포넌트
│   ├── features/         # 기능별 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   └── shared/           # 공유 컴포넌트
├── lib/
│   ├── api/              # API 클라이언트
│   ├── hooks/            # Custom Hooks
│   ├── store/            # Zustand Store
│   └── utils/            # 유틸리티
└── types/                # TypeScript 타입
```

### Backend (NestJS)
```
src/
├── auth/                 # 인증 모듈
├── users/                # 사용자 모듈
├── programs/             # 프로그램 모듈
├── enrollments/          # 수강 신청 모듈
├── certifications/       # 자격증 모듈
├── volunteer/            # 봉사 활동 모듈
├── content/              # 콘텐츠 모듈
├── payments/             # 결제 모듈
├── common/               # 공통 모듈
└── main.ts               # 엔트리 포인트
```

---

## 🔐 보안 체크리스트

### 필수 사항
- [x] HTTPS 강제
- [x] JWT 토큰 인증
- [x] 비밀번호 해싱 (bcrypt)
- [x] CORS 설정
- [x] Rate Limiting
- [x] XSS 방어 (CSP)
- [x] SQL Injection 방어 (ORM)
- [x] 민감 정보 암호화 (AES-256)

### 컴플라이언스
- [x] 개인정보보호법 준수
- [x] 전자금융거래법 준수
- [x] 감사 로그 기록
- [x] 개인정보 처리방침 게시

---

## 📅 개발 로드맵 (16주)

| Phase | 기간 | 핵심 작업 |
|-------|------|----------|
| Phase 1 | Week 1-4 | 인증, 사용자 관리, 메인 페이지 |
| Phase 2 | Week 5-7 | 교육 프로그램, 수강 신청, 결제 |
| Phase 3 | Week 8-10 | 자격증 발급, 검증, 갱신 |
| Phase 4 | Week 11-12 | 공지사항, 안전정보, FAQ |
| Phase 5 | Week 13-14 | 봉사 활동 신청 및 관리 |
| Phase 6 | Week 15-16 | 관리자 시스템, 최적화, 배포 |

---

## 🚀 빠른 시작

### 1. 환경 설정
```bash
# 저장소 클론
git clone [repository-url]

# Frontend 설정
cd frontend
npm install
cp .env.example .env.local

# Backend 설정
cd backend
npm install
cp .env.example .env

# Docker 실행
docker-compose up -d
```

### 2. 개발 서버 실행
```bash
# Frontend (http://localhost:3000)
cd frontend
npm run dev

# Backend (http://localhost:4000)
cd backend
npm run start:dev
```

### 3. 데이터베이스 마이그레이션
```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

---

## 🔧 주요 명령어

### Docker
```bash
docker-compose up -d          # 서비스 시작
docker-compose down           # 서비스 종료
docker-compose logs -f        # 로그 확인
docker-compose ps             # 상태 확인
```

### Database
```bash
npx prisma migrate dev        # 마이그레이션 생성 및 실행
npx prisma migrate deploy     # 프로덕션 마이그레이션
npx prisma studio             # DB GUI 실행
npx prisma db seed            # 시드 데이터 삽입
```

### Testing
```bash
npm test                      # 테스트 실행
npm run test:watch            # Watch 모드
npm run test:cov              # 커버리지
npm run test:e2e              # E2E 테스트
```

### Build & Deploy
```bash
npm run build                 # 프로덕션 빌드
npm run start                 # 프로덕션 실행
docker build -t app .         # Docker 이미지 빌드
docker-compose -f docker-compose.prod.yml up -d  # 프로덕션 배포
```

---

## 📊 성능 목표

| 지표 | 목표 |
|------|------|
| API 응답 시간 | < 200ms (평균) |
| 페이지 로딩 | < 3초 (FCP) |
| 테스트 커버리지 | > 80% |
| 동시 사용자 | 1,000명+ |
| 가동률 | 99.5%+ |

---

## 🐛 트러블슈팅

### 일반적인 문제

#### 1. Docker 컨테이너가 시작되지 않음
```bash
# 포트 충돌 확인
lsof -i :3000
lsof -i :4000
lsof -i :5432

# 컨테이너 재시작
docker-compose restart
```

#### 2. 데이터베이스 연결 실패
```bash
# 데이터베이스 상태 확인
docker-compose logs postgres

# 연결 테스트
psql -h localhost -U postgres -d watersafety
```

#### 3. 마이그레이션 실패
```bash
# 마이그레이션 상태 확인
npx prisma migrate status

# 마이그레이션 리셋 (개발 환경만!)
npx prisma migrate reset
```

---

## 📞 추가 리소스

### 문서
- [시스템 개요](./01_system_overview.md)
- [기술 스택](./02_technology_stack.md)
- [API 명세](./04_api_specification.md)

### 외부 링크
- [Next.js 문서](https://nextjs.org/docs)
- [NestJS 문서](https://docs.nestjs.com/)
- [Prisma 문서](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**빠른 참조 버전**: 1.0.0
**업데이트**: 2024-01-15
