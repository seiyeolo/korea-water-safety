# 한국수상안전협회 홈페이지 | Korea Water Safety Association Website

<div align="center">

**전문 교육과 자격증 발급을 통해 수상안전 문화를 선도하는 전문기관**

[🌐 프로젝트 데모](#) | [📖 문서](#프로젝트-구조) | [🚀 시작하기](#설치-및-실행-방법)

</div>

---

## 📋 목차 | Table of Contents

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행 방법](#설치-및-실행-방법)
- [환경 변수 설정](#환경-변수-설정)
- [배포](#배포)
- [향후 계획](#향후-계획)

---

## 🌊 프로젝트 소개

한국수상안전협회 홈페이지는 수상안전 교육 프로그램 안내, 자격증 발급, 공지사항 관리를 위한 풀스택 웹 애플리케이션입니다.

### ✨ 핵심 가치
- **전문 교육**: 체계적인 수상안전 교육 프로그램 제공
- **자격증 관리**: 국가 및 민간 자격증 발급 및 관리
- **안전한 플랫폼**: 사용자 인증 및 데이터 보안 강화

---

## 🎯 주요 기능

### 1. 사용자 인증 시스템
- ✅ 회원가입 (이메일, 비밀번호, 개인정보)
- ✅ 로그인 / 로그아웃
- ✅ bcrypt 비밀번호 해싱
- ✅ localStorage 기반 세션 관리

### 2. 교육 프로그램 관리
- 📚 교육 프로그램 목록 조회
- 📝 프로그램 상세 정보 제공
- 👥 교육 신청 및 관리
- 📅 일정 및 모집 기간 관리

### 3. 자격증 관리
- 🏆 자격증 발급 및 조회
- 📄 자격증 상태 관리 (유효/만료/취소)
- 💾 자격증 파일 관리

### 4. 공지사항 시스템
- 📢 공지사항, 새소식, 이벤트 게시
- 📎 첨부파일 업로드
- 👁️ 조회수 및 중요 게시글 고정

### 5. 관리자 기능
- 🔐 역할 기반 접근 제어 (USER, INSTRUCTOR, ADMIN)
- 📊 대시보드 및 통계
- ⚙️ 회원 및 콘텐츠 관리

---

## 🛠 기술 스택

### Frontend
- **Framework**: [Next.js 15.0.3](https://nextjs.org/) (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.x
- **Icons**: Lucide React
- **HTTP Client**: Fetch API

### Backend
- **Framework**: [NestJS 11.x](https://nestjs.com/)
- **Language**: TypeScript 5.x
- **ORM**: [Prisma 6.17.1](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Validation**: class-validator, class-transformer
- **Security**: bcrypt (password hashing)

### DevOps & Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Code Quality**: ESLint, TypeScript
- **Deployment**: Vercel (Frontend), Docker/Railway (Backend)

---

## 📁 프로젝트 구조

```
korea-water-safety/
├── frontend/                 # Next.js 프론트엔드
│   ├── src/
│   │   ├── app/             # App Router 페이지
│   │   │   ├── (admin)/    # 관리자 페이지 그룹
│   │   │   ├── (auth)/     # 인증 페이지 그룹
│   │   │   ├── (dashboard)/# 대시보드 그룹
│   │   │   ├── (main)/     # 메인 페이지 그룹
│   │   │   ├── login/      # 로그인 페이지
│   │   │   ├── register/   # 회원가입 페이지
│   │   │   ├── about/      # 협회 소개
│   │   │   ├── programs/   # 교육 프로그램
│   │   │   ├── certificates/# 자격증 안내
│   │   │   ├── notices/    # 공지사항
│   │   │   └── api/        # API Routes
│   │   └── components/      # React 컴포넌트
│   │       ├── layout/     # 레이아웃 컴포넌트
│   │       └── features/   # 기능별 컴포넌트
│   └── public/             # 정적 파일
│
├── backend/                 # NestJS 백엔드
│   ├── src/
│   │   ├── modules/        # 기능 모듈
│   │   │   ├── users/      # 사용자 관리
│   │   │   ├── programs/   # 교육 프로그램
│   │   │   └── posts/      # 게시글 관리
│   │   ├── prisma/         # Prisma 서비스
│   │   ├── app.module.ts   # 루트 모듈
│   │   └── main.ts         # 애플리케이션 진입점
│   └── prisma/
│       ├── schema.prisma   # 데이터베이스 스키마
│       ├── seed.ts         # 샘플 데이터
│       └── migrations/     # 마이그레이션 파일
│
├── claudedocs/             # 개발 문서
│   └── session_*.md        # 세션 기록
│
└── README.md              # 프로젝트 문서 (이 파일)
```

---

## 🚀 설치 및 실행 방법

### Prerequisites
- Node.js 18.x 이상
- PostgreSQL 14.x 이상
- npm 또는 yarn

### 1. 저장소 클론
```bash
git clone https://github.com/seiyeolo/korea-water-safety.git
cd korea-water-safety
```

### 2. 백엔드 설정 및 실행

```bash
# 백엔드 디렉토리로 이동
cd backend

# 의존성 설치
npm install

# 환경 변수 설정 (.env 파일 생성)
# DATABASE_URL="postgresql://user:password@localhost:5432/hansuhyup"
# PORT=4000
# CORS_ORIGIN=http://localhost:3000

# Prisma 클라이언트 생성
npm run prisma:generate

# 데이터베이스 마이그레이션
npm run prisma:migrate

# 샘플 데이터 생성 (선택사항)
npm run prisma:seed

# 개발 서버 실행
npm run dev
```

백엔드 서버: http://localhost:4000

### 3. 프론트엔드 설정 및 실행

```bash
# 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치
npm install

# 환경 변수 설정 (.env.local 파일 생성)
# NEXT_PUBLIC_API_URL=http://localhost:4000/api

# 개발 서버 실행
npm run dev
```

프론트엔드 서버: http://localhost:3000

---

## ⚙️ 환경 변수 설정

### Backend `.env`
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/hansuhyup"

# Server
PORT=4000
CORS_ORIGIN=http://localhost:3000
```

### Frontend `.env.local`
```env
# API Endpoint
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

---

## 🌐 배포

### Frontend (Vercel)
1. GitHub 저장소와 Vercel 연동
2. Root Directory: `frontend` 설정
3. Environment Variables 설정
4. 자동 배포 활성화

```bash
# 또는 Vercel CLI 사용
cd frontend
vercel --prod
```

### Backend (Railway / Docker)
```bash
# Docker로 배포
docker build -t hansuhyup-backend ./backend
docker run -p 4000:4000 hansuhyup-backend
```

### 배포 URL
- **Frontend**: [https://korea-water-safety.vercel.app](#) (배포 예정)
- **Backend**: [https://api.korea-water-safety.com](#) (배포 예정)

---

## 🗓 향후 계획

### Phase 1: 핵심 기능 강화 (완료)
- [x] 사용자 인증 시스템
- [x] 교육 프로그램 관리
- [x] 자격증 관리
- [x] 공지사항 시스템

### Phase 2: 사용자 경험 개선 (진행 중)
- [ ] 결제 시스템 통합
- [ ] 이메일 알림 기능
- [ ] 모바일 앱 개발
- [ ] 실시간 채팅 지원

### Phase 3: 고급 기능 추가
- [ ] 온라인 교육 플랫폼 (비디오 강의)
- [ ] AI 기반 학습 추천 시스템
- [ ] 다국어 지원 (영어, 일본어)
- [ ] 관리자 대시보드 고도화

### Phase 4: 확장 및 최적화
- [ ] 성능 최적화 (캐싱, CDN)
- [ ] SEO 최적화
- [ ] 접근성 개선 (WCAG 2.1 AA)
- [ ] PWA (Progressive Web App) 지원

---

## 📝 개발 문서

상세한 개발 문서는 [claudedocs/](./claudedocs/) 디렉토리를 참고하세요.

- [Session Log](./claudedocs/session_20251012.md): 개발 세션 기록

---

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

이 프로젝트는 비공개 라이선스로 관리됩니다. 무단 복제 및 배포를 금지합니다.

---

## 📧 연락처

**한국수상안전협회**
- Website: [http://www.example.com](#)
- Email: info@example.com
- GitHub: [@seiyeolo](https://github.com/seiyeolo)

---

## 🙏 감사의 글

이 프로젝트는 [Claude Code](https://claude.com/claude-code)와 함께 개발되었습니다.

---

<div align="center">

**한국수상안전협회와 함께하는 안전한 수상 환경**

Made with ❤️ by Korea Water Safety Association

</div>

---

# English Version

## 🌊 Project Overview

Korea Water Safety Association Website is a full-stack web application for water safety education programs, certification management, and announcements.

### ✨ Core Values
- **Professional Education**: Systematic water safety training programs
- **Certification Management**: National and private certification issuance
- **Secure Platform**: Enhanced user authentication and data security

---

## 🎯 Key Features

### 1. User Authentication System
- ✅ User Registration (email, password, personal info)
- ✅ Login / Logout
- ✅ bcrypt password hashing
- ✅ localStorage-based session management

### 2. Education Program Management
- 📚 Program listing and search
- 📝 Detailed program information
- 👥 Program registration management
- 📅 Schedule and recruitment period management

### 3. Certification Management
- 🏆 Certificate issuance and inquiry
- 📄 Certificate status management (active/expired/revoked)
- 💾 Certificate file management

### 4. Notice Board System
- 📢 Announcements, news, and events
- 📎 File attachment support
- 👁️ View count and pinned posts

### 5. Admin Features
- 🔐 Role-based access control (USER, INSTRUCTOR, ADMIN)
- 📊 Dashboard and statistics
- ⚙️ Member and content management

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 15.0.3](https://nextjs.org/) (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.x
- **Icons**: Lucide React
- **HTTP Client**: Fetch API

### Backend
- **Framework**: [NestJS 11.x](https://nestjs.com/)
- **Language**: TypeScript 5.x
- **ORM**: [Prisma 6.17.1](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Validation**: class-validator, class-transformer
- **Security**: bcrypt (password hashing)

### DevOps & Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Code Quality**: ESLint, TypeScript
- **Deployment**: Vercel (Frontend), Docker/Railway (Backend)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- PostgreSQL 14.x or higher
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/seiyeolo/korea-water-safety.git
cd korea-water-safety

# Backend setup
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:4000

---

## 🗓 Roadmap

### Phase 1: Core Features (Completed)
- [x] User authentication system
- [x] Education program management
- [x] Certification management
- [x] Notice board system

### Phase 2: User Experience Enhancement (In Progress)
- [ ] Payment system integration
- [ ] Email notification
- [ ] Mobile app development
- [ ] Real-time chat support

### Phase 3: Advanced Features
- [ ] Online education platform (video lectures)
- [ ] AI-based learning recommendation
- [ ] Multi-language support (English, Japanese)
- [ ] Advanced admin dashboard

### Phase 4: Expansion & Optimization
- [ ] Performance optimization (caching, CDN)
- [ ] SEO optimization
- [ ] Accessibility improvement (WCAG 2.1 AA)
- [ ] PWA (Progressive Web App) support

---

## 📝 Documentation

For detailed development documentation, please refer to [claudedocs/](./claudedocs/) directory.

---

## 📄 License

This project is under private license. Unauthorized reproduction and distribution are prohibited.

---

## 📧 Contact

**Korea Water Safety Association**
- Website: [http://www.example.com](#)
- Email: info@example.com
- GitHub: [@seiyeolo](https://github.com/seiyeolo)

---

<div align="center">

**Creating a Safe Water Environment with Korea Water Safety Association**

Made with ❤️ by Korea Water Safety Association

</div>
