# 한국수상안전협회 홈페이지

## 프로젝트 소개
전문 교육과 자격증 발급을 통해 수상안전 문화를 선도하는 전문기관입니다.

## 기술 스택
**Frontend:** Next.js 15, TypeScript, Tailwind CSS, Lucide Icons
**Backend:** NestJS, TypeScript, PostgreSQL, Prisma ORM, bcrypt
**Deployment:** Vercel (Frontend)

## 주요 기능
- 협회 소개 및 미션
- 교육 프로그램 목록 및 상세 정보
- 공지사항 관리
- 자격증 안내 (디자인 완료)
- 회원가입/로그인 (bcrypt 암호화)

## 구현된 API
- Users API (회원가입, 로그인, 인증)
- Programs API (교육 프로그램 CRUD)
- Posts API (공지사항 CRUD)

## 로컬 실행 방법

### 백엔드
```bash
cd backend
npm install
npm run dev
```

### 프론트엔드
```bash
cd frontend
npm install
npm run dev
```

## 배포 URL
https://frontend-njigoq9ek-seiyeolo-6781s-projects.vercel.app

## 프로젝트 구조
```
한수협_홈페이지/
├── frontend/     (Next.js)
├── backend/      (NestJS)
└── README.md
```

## 향후 계획
- [ ] 자격증 관리 API 구현
- [ ] 백엔드 배포 (Railway/Render)
- [ ] 소셜 로그인 (카카오, 네이버, 구글)
- [ ] CI/CD 자동 배포 설정

## 개발자
seiyeolo

## 라이선스
MIT
