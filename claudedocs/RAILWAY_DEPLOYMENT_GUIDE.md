# 🚂 Railway 백엔드 배포 가이드

## 📋 배포 전 체크리스트

- [x] 소스코드 준비 완료
- [x] 프로덕션 빌드 검증
- [x] 환경 변수 준비
- [x] 데이터베이스 마이그레이션 준비
- [x] E2E 테스트 통과

---

## 🚀 Railway 배포 단계별 가이드

### 1단계: Railway 계정 생성 및 프로젝트 생성

```bash
# Railway 웹사이트 방문
https://railway.app

# GitHub으로 로그인 또는 계정 생성
# "Create a new project" 클릭
```

### 2단계: 백엔드 서비스 추가

```bash
# Railway Dashboard에서 "Create" 클릭
# "Provision PostgreSQL" 선택 (데이터베이스)
# "Provision Node" 선택 (또는 GitHub에서 배포)
```

### 3단계: GitHub 리포지토리 연동

**옵션 A: GitHub 자동 배포 (권장)**

```bash
# Railway Dashboard에서 "Create" → "GitHub Repo"
# Repository: seiyeolo/korea-water-safety 선택
# Root Directory: backend 입력
# Start Command: npm start
```

**옵션 B: CLI로 배포**

```bash
# Railway CLI 설치
npm i -g @railway/cli

# 로그인
railway login

# 프로젝트 연결
railway link [project-id]

# 배포
railway up
```

### 4단계: 환경 변수 설정

Railway Dashboard → Variables에서 다음을 설정:

```env
# 데이터베이스
DATABASE_URL=postgresql://user:password@host:port/dbname
# (Railway PostgreSQL 서비스가 자동 설정)

# JWT 설정
JWT_SECRET=your-super-secret-key-min-32-characters
JWT_EXPIRES_IN=86400

# 포트
PORT=8080
NODE_ENV=production

# CORS 설정
CORS_ORIGIN=https://frontend-ogbtbeweg-seiyeolo-6781s-projects.vercel.app

# API 호스트 (Railway가 자동 할당)
# https://[project-name]-production.up.railway.app
```

### 5단계: 데이터베이스 마이그레이션

배포 후 SSH로 접속하여 마이그레이션 실행:

```bash
# Railway Shell 접속 (또는 SSH)
railway shell

# 마이그레이션 실행
npx prisma migrate deploy

# 시드 데이터 입력 (선택)
npm run seed:prod

# 데이터베이스 상태 확인
npx prisma studio
```

---

## 🔧 Railway 설정 상세

### package.json 구성

```json
{
  "scripts": {
    "build": "tsc && npx tsc prisma/seed.ts ... && prisma generate",
    "start": "npx prisma migrate deploy && (npm run seed:prod || true) && node dist/main.js",
    "start:prod": "node dist/main.js"
  }
}
```

### Railway가 실행하는 명령어

```
1. npm install          # 의존성 설치
2. npm run build        # 프로덕션 빌드
3. npm start            # 애플리케이션 시작
   - 마이그레이션 자동 실행
   - 시드 데이터 입력 (선택)
   - 메인 애플리케이션 시작
```

---

## ✅ 배포 검증

### 1. 배포 상태 확인

Railway Dashboard에서:
- ✅ Status: "Deployed" 또는 "Active"
- ✅ Build Log: 에러 없음
- ✅ Runtime: Node.js 정상 실행

### 2. 헬스 체크

```bash
curl https://[your-railway-url]/api/health

# 예상 응답:
# {"status":"healthy","database":"connected"}
```

### 3. API 테스트

```bash
# 프로그램 조회
curl https://[your-railway-url]/api/programs

# 회원가입
curl -X POST https://[your-railway-url]/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@1234","name":"Test User","phone":"010-1234-5678"}'

# 로그인
curl -X POST https://[your-railway-url]/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@1234"}'
```

### 4. 데이터베이스 확인

```bash
# Railway Shell에서
railway shell

# Prisma Studio로 데이터 확인
npx prisma studio
```

---

## 🔄 배포 후 프론트엔드 업데이트

Railway 배포 후 프론트엔드에서 API URL 업데이트:

### 1. 환경 변수 설정

**Vercel Dashboard → Settings → Environment Variables**

```env
NEXT_PUBLIC_API_URL=https://[your-railway-backend-url]/api
```

예: `https://korea-water-safety-production.up.railway.app/api`

### 2. 자동 재배포

- Vercel은 환경 변수 변경 시 자동 재배포
- 또는 수동으로 "Redeploy" 클릭

### 3. 배포 확인

```bash
# 프론트엔드에서 프로그램 페이지 확인
https://frontend-ogbtbeweg-seiyeolo-6781s-projects.vercel.app/programs

# 모든 데이터가 로드되어야 함
```

---

## 🐛 문제 해결

### 1. 배포 실패

**증상**: "Build failed" 에러

**해결책**:
```bash
# 로그 확인
railway logs -f

# 일반적인 원인:
# - Node.js 버전 호환성
# - 환경 변수 누락
# - 의존성 설치 실패

# 해결 방법:
# 1. package.json 버전 확인
# 2. 환경 변수 재설정
# 3. 로컬에서 빌드 테스트
```

### 2. 데이터베이스 연결 실패

**증상**: "Database connected: false"

**해결책**:
```bash
# 1. DATABASE_URL 환경 변수 확인
echo $DATABASE_URL

# 2. Prisma 마이그레이션 실행
npx prisma migrate deploy

# 3. 데이터베이스 상태 확인
npx prisma db execute --stdin
```

### 3. API 응답 지연

**증상**: 요청이 타임아웃

**해결책**:
```bash
# Railway 로그 확인
railway logs

# API 응답 시간 측정
time curl https://[your-url]/api/health

# 필요시 인스턴스 업그레이드
```

---

## 📊 모니터링

### Railway 대시보드에서 확인

- **Metrics**: CPU, Memory, Disk 사용률
- **Logs**: 실시간 로그 스트림
- **Health**: 애플리케이션 상태

### 프로덕션 모니터링

```bash
# 주기적인 헬스 체크
curl https://[your-railway-url]/api/health

# 에러 로그 모니터링
railway logs -f --level error

# 데이터베이스 백업
# Railway Dashboard → PostgreSQL → Backups
```

---

## 🚀 배포 완료 체크리스트

- [ ] Railway 계정 생성
- [ ] GitHub 리포지토리 연동
- [ ] 환경 변수 설정
- [ ] 프로덕션 빌드 성공
- [ ] 데이터베이스 마이그레이션 완료
- [ ] API 헬스 체크 통과
- [ ] 회원가입 테스트 성공
- [ ] 로그인 테스트 성공
- [ ] 프론트엔드 API URL 업데이트
- [ ] 프로덕션 E2E 테스트 통과

---

## 📞 배포 지원

- **Railway 문서**: https://docs.railway.app/
- **Railway 커뮤니티**: https://community.railway.app/
- **GitHub Issues**: https://github.com/seiyeolo/korea-water-safety/issues

---

**다음 단계**: 위 가이드를 따라 Railway에 백엔드를 배포합니다! 🚀
