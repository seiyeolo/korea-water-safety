# ⚡ Railway 배포 빠른 가이드 (5단계)

## 🎯 목표
한국수상안전협회 백엔드를 Railway에 배포하고 프로덕션 API 서버 운영

---

## ✅ 단계 1: Railway 계정 생성 (2분)

```bash
1. https://railway.app 방문
2. "GitHub로 로그인" 클릭 (또는 이메일 가입)
3. 계정 생성 완료
```

---

## ✅ 단계 2: GitHub 연동 (3분)

**Railway Dashboard**

```bash
# 새 프로젝트 생성
1. "Create a new Project" 클릭
2. "Deploy from GitHub" 선택
3. Repository: seiyeolo/korea-water-safety 선택
4. GitHub 인증 허용
```

---

## ✅ 단계 3: 서비스 구성 (5분)

**Railway Dashboard → Configure**

### A. 백엔드 애플리케이션 설정

```bash
Root Directory: backend
Build Command: npm run build
Start Command: npm start
```

### B. PostgreSQL 데이터베이스 추가

```bash
# "Add" → "Provision PostgreSQL" 클릭
# DATABASE_URL 자동 생성됨
```

---

## ✅ 단계 4: 환경 변수 설정 (3분)

**Railway Dashboard → Variables**

```env
# 자동으로 설정되는 것:
DATABASE_URL=postgresql://...

# 수동으로 추가할 것:
JWT_SECRET=your-super-secret-key-min-32-characters
NODE_ENV=production
PORT=8080
CORS_ORIGIN=https://frontend-ogbtbeweg-seiyeolo-6781s-projects.vercel.app
```

**JWT_SECRET 생성 예시:**
```bash
# 터미널에서 실행
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 출력된 값을 JWT_SECRET에 복사
```

---

## ✅ 단계 5: 배포 및 검증 (5분)

**배포 시작**

```bash
# Railway가 자동으로:
1. npm install 실행
2. npm run build 실행
3. npm start 실행
```

**배포 진행 확인**

```bash
Railway Dashboard → Deployments
- 상태가 "Initializing" → "Building" → "Deploying" 순서로 진행
```

**배포 완료 후 API URL 확인**

```bash
Railway Dashboard → Networking
# 예: https://korea-water-safety-production.up.railway.app

# API URL:
# https://korea-water-safety-production.up.railway.app/api
```

---

## 🔍 배포 검증 (필수!)

### 1. 헬스 체크

```bash
curl https://korea-water-safety-production.up.railway.app/api/health

# 예상 응답:
# {"status":"healthy","database":"connected","version":"1.0.0"}
```

### 2. 프로그램 조회

```bash
curl https://korea-water-safety-production.up.railway.app/api/programs

# 프로그램 데이터가 반환되어야 함
```

### 3. 회원가입 테스트

```bash
curl -X POST https://korea-water-safety-production.up.railway.app/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@railway.com",
    "password":"Test@1234",
    "name":"Railway Test",
    "phone":"010-1111-1111"
  }'

# 예상 응답:
# {"success":true,"user":{...},"accessToken":"...","refreshToken":"..."}
```

### 4. 로그인 테스트

```bash
curl -X POST https://korea-water-safety-production.up.railway.app/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@railway.com",
    "password":"Test@1234"
  }'
```

---

## 🔗 프론트엔드 업데이트

**Vercel Dashboard → Settings → Environment Variables**

```env
NEXT_PUBLIC_API_URL=https://korea-water-safety-production.up.railway.app/api
```

변경 후:
- Vercel이 자동으로 재배포
- 약 1-2분 후 프로덕션 프론트엔드에서 API 호출 가능

---

## ✅ 최종 확인 체크리스트

- [ ] Railway 배포 완료 (Status: "Deployed")
- [ ] 헬스 체크 통과 ✅
- [ ] 프로그램 API 응답 ✅
- [ ] 회원가입 성공 ✅
- [ ] 로그인 성공 ✅
- [ ] 프론트엔드 API URL 업데이트 ✅
- [ ] 프론트엔드에서 프로그램 페이지 데이터 로드 ✅

---

## 🎊 축하합니다!

배포 완료 시 다음 URL들이 운영 중입니다:

| 서비스 | URL |
|--------|-----|
| **Frontend** | https://frontend-ogbtbeweg-seiyeolo-6781s-projects.vercel.app/ |
| **Backend API** | https://korea-water-safety-production.up.railway.app/api |
| **Database** | PostgreSQL (Railway 관리) |

---

## 🐛 문제 해결

**Q: 배포가 실패했어요**
```bash
# 로그 확인
Railway Dashboard → Deployments → 해당 배포 → Logs
```

**Q: 데이터베이스 연결이 안 되어요**
```bash
# 마이그레이션 실행
# Railway Dashboard → PostgreSQL → Shell
npx prisma migrate deploy
```

**Q: API가 404를 반환해요**
```bash
# 1. 데이터베이스 마이그레이션 확인
# 2. 환경 변수 설정 확인
# 3. 로그에서 에러 메시지 확인
```

---

**완료하셨으면 이 문서의 최종 확인 체크리스트를 모두 체크하면 됩니다!** ✅
