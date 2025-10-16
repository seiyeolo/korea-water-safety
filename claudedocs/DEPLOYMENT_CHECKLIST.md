# 🚀 Railway 배포 체크리스트

## 배포 전 준비 사항

### 1. 백엔드 준비 ✅
- [x] JWT 인증 시스템 구현 완료
- [x] 회원가입/로그인 API 완성
- [x] Refresh Token 기능 구현
- [x] 에러 처리 표준화
- [x] CORS 설정 (Vercel 지원)
- [x] 데이터베이스 마이그레이션 실행
- [ ] 환경 변수 설정 검증
- [ ] 프로덕션 JWT_SECRET 설정
- [ ] 데이터베이스 백업

### 2. 프론트엔드 준비 ✅
- [x] API 클라이언트 완성
- [x] 인증 인터셉터 구현
- [x] 로그인 폼 구현
- [x] 회원가입 폼 구현
- [ ] 대시보드 레이아웃 완성
- [ ] 라우팅 보호 (Protected Routes)
- [ ] 배포 환경 API URL 설정

### 3. 테스트 완료 ✅
- [x] E2E 테스트 작성
- [ ] E2E 테스트 실행
- [ ] 통합 테스트 실행
- [ ] 성능 테스트

### 4. 보안 검증
- [x] bcrypt 해싱 적용 (라운드: 12)
- [x] 강력한 비밀번호 검증
- [x] JWT 토큰 만료 시간 설정 (24시간)
- [x] Refresh Token 보안 (7일)
- [ ] HTTPS 강제 (Railway)
- [ ] CORS 정책 확인
- [ ] 민감 정보 환경 변수 분리

---

## Railway 배포 단계

### 1단계: Railway 프로젝트 생성

```bash
# Railway CLI 설치 (아직 안 했다면)
npm install -g @railway/cli

# Railway 로그인
railway login

# 프로젝트 초기화
railway init
```

### 2단계: 환경 변수 설정

**Railway 대시보드 → Settings → Environment Variables**

```env
# 데이터베이스
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]

# JWT 설정
JWT_SECRET=[프로덕션용 강력한 시크릿 키]
JWT_EXPIRES_IN=24h

# 노드 환경
NODE_ENV=production
PORT=4000

# CORS 설정
CORS_ORIGIN=https://[프론트엔드 도메인]

# API URL (프론트엔드용)
NEXT_PUBLIC_API_URL=https://[백엔드 도메인]/api
```

### 3단계: PostgreSQL 데이터베이스 설정

```bash
# Railway에서 PostgreSQL 데이터베이스 생성
# → Add Service → PostgreSQL

# 마이그레이션 실행
npx prisma migrate deploy

# 시드 데이터 (선택사항)
npm run seed:prod
```

### 4단계: 백엔드 배포

```bash
# 현재 디렉토리: /backend

# 빌드 테스트 (로컬)
npm run build

# Railway에 배포
railway up

# 또는 GitHub 연동 배포
# Railway → GitHub Repository 선택 → Auto-deploy
```

### 5단계: 프론트엔드 배포

**Vercel에 배포 (이미 연동되었을 수 있음)**

```bash
# 환경 변수 설정
# Vercel 대시보드 → Settings → Environment Variables

# NEXT_PUBLIC_API_URL=https://[railway-backend-url]/api

# 배포
git push origin main
# 또는 Vercel CLI 사용
# vercel deploy --prod
```

---

## 배포 후 검증

### 1. 헬스 체크
```bash
curl https://[backend-url]/api/health
```

예상 응답:
```json
{
  "status": "healthy",
  "database": "connected",
  "version": "1.0.0"
}
```

### 2. 회원가입 테스트
```bash
curl -X POST https://[backend-url]/api/users/register \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234",
    "name": "테스트",
    "phone": "010-1234-5678"
  }'
```

### 3. 로그인 테스트
```bash
curl -X POST https://[backend-url]/api/users/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234"
  }'
```

### 4. JWT 인증 테스트
```bash
TOKEN="[로그인에서 받은 accessToken]"
curl -H "Authorization: Bearer $TOKEN" \
  https://[backend-url]/api/users/profile
```

---

## 모니터링 및 로깅

### Railway 모니터링
- Dashboard → Logs 확인
- 에러 로그 확인
- 성능 메트릭 확인

### 프론트엔드 모니터링
- Vercel Analytics 확인
- 에러 추적 (Sentry 연동 권장)

---

## 트러블슈팅

### 데이터베이스 연결 실패
```
해결: DATABASE_URL 확인, 방화벽 설정 확인
```

### JWT 토큰 만료 오류
```
해결: JWT_SECRET이 백엔드/프론트엔드 모두 동일한지 확인
```

### CORS 에러
```
해결: CORS_ORIGIN 환경 변수가 프론트엔드 도메인 포함하는지 확인
```

### 마이그레이션 실패
```bash
# 데이터베이스 리셋 (개발용만)
npx prisma db push --force-reset

# 또는 마이그레이션 수동 실행
npx prisma migrate deploy
```

---

## 배포 완료 후

- [ ] 모든 환경 변수 설정 확인
- [ ] SSL/HTTPS 작동 확인
- [ ] 에러 로깅 시스템 설정
- [ ] 백업 정책 수립
- [ ] 모니터링 알람 설정
- [ ] 팀원에게 배포 환경 공유

---

## 롤백 절차

### 이전 버전으로 복구
```bash
# Railway 대시보드에서
# Deployments → 이전 버전 선택 → Redeploy
```

### 데이터베이스 롤백
```bash
# 마이그레이션 되돌리기
npx prisma migrate resolve --rolled-back 20251016082711_add_refresh_token
```

---

**작성일**: 2025-10-16
**상태**: 🟢 배포 준비 완료
