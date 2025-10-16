# 🔍 Railway 502 Bad Gateway 진단 및 해결 가이드

## 📋 문제 상황

- **배포 상태**: ✅ Build successful ("Deployment successful" 상태)
- **API 상태**: ❌ 502 Bad Gateway (요청에 응답하지 않음)
- **근본 원인**: Runtime 오류 또는 환경 변수 미설정

---

## 🔴 주요 원인 분석

### 1. **환경 변수 미설정 (가장 가능성 높음)**

Railway는 빌드 성공 후 런타임에 필요한 환경 변수가 있어야 합니다:

```env
DATABASE_URL=postgresql://...  # 자동으로 생성됨
JWT_SECRET=xxx                 # 수동으로 설정 필요 ⚠️
NODE_ENV=production            # 수동으로 설정 필요 ⚠️
PORT=8080                      # Railway 기본 포트
CORS_ORIGIN=...                # 프론트엔드 URL
```

**현재 상태**:
- ❌ `JWT_SECRET`: 설정되지 않음
- ❌ `NODE_ENV`: 설정되지 않음 (default behavior)
- ✅ `DATABASE_URL`: 자동 생성됨 (PostgreSQL 연동시)

### 2. **데이터베이스 마이그레이션 미실행**

`/scripts/start.sh`에서:
```bash
npx prisma migrate deploy
```
이 명령이 실패하면 애플리케이션 시작 안 됨.

### 3. **PORT 바인딩 실패**

Railway는 특정 포트(8080)를 할당하는데, `.env`에서 다른 포트 설정시 문제 발생.

### 4. **TypeScript Path Alias 해결 실패**

빌드는 성공했지만 `@/*` 경로 별칭이 런타임에 해결되지 않을 수 있음.

---

## ✅ 해결 방법

### Step 1: Railway 환경 변수 설정

**Railway Dashboard → [프로젝트] → Variables**

다음 환경 변수를 추가하세요:

```env
# 필수 (수동 설정)
JWT_SECRET=your-super-secret-key-32-chars-min
NODE_ENV=production
CORS_ORIGIN=https://frontend-ogbtbeweg-seiyeolo-6781s-projects.vercel.app

# 선택사항 (Railway가 관리)
DATABASE_URL=postgresql://...    # Railway PostgreSQL 연동시 자동
PORT=8080                        # Railway 기본값 (보통 자동)
```

**JWT_SECRET 생성:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 2: 데이터베이스 확인

Railway Dashboard → PostgreSQL 서비스 탭에서:
1. **Status**: Connected 상태인지 확인
2. **Connection String**: 올바른지 확인
3. **Shell** 탭에서 마이그레이션 수동 실행:
   ```bash
   npx prisma migrate deploy
   ```

### Step 3: Start Script 검증

`/backend/scripts/start.sh`가 올바르게 설정되어 있는지 확인:

```bash
#!/bin/bash
set -e

echo "🚀 Starting backend application..."

# Run migrations
echo "📦 Running database migrations..."
npx prisma migrate deploy

# Seed database (optional)
echo "🌱 Seeding database (if needed)..."
npm run seed:prod || true

# Start application
echo "⚡ Starting NestJS application..."
node dist/main.js
```

### Step 4: 빌드 재실행

Railway Dashboard → [프로젝트] → Deployments:
1. 최신 배포의 "⋮" 메뉴 클릭
2. "Redeploy" 또는 "Rebuild" 선택
3. 환경 변수 설정 후 자동 재배포

---

## 🔧 실시간 문제 해결

### 런타임 로그 확인

**Railway Dashboard → Deployments → [최신 배포] → Logs**

다음을 확인하세요:

```
✅ Good:
"🚀 Server is running on: http://localhost:8080"
"✨ Database connected successfully"

❌ Bad:
"error: connect ECONNREFUSED" → DB 연결 실패
"Cannot find module" → 모듈 해석 실패
"ENOENT: no such file" → 파일 누락
"error TS" → TypeScript 오류
```

### 포트 바인딩 확인

Railway는 자동으로 포트를 할당합니다. 로그에서:
```
Listening on port 8080
```
또는 Railway Dashboard의 **Networking** 탭에서 URL 확인.

---

## 📊 체크리스트

- [ ] JWT_SECRET을 Railway Variables에 설정했다
- [ ] NODE_ENV=production을 설정했다
- [ ] CORS_ORIGIN을 프론트엔드 URL로 설정했다
- [ ] PostgreSQL 데이터베이스가 Railway에 연동되어 있다
- [ ] `scripts/start.sh` 파일이 존재하고 실행 가능하다
- [ ] railway.json에서 startCommand가 올바르다:
  ```json
  "startCommand": "./scripts/start.sh"
  ```
- [ ] 환경 변수 설정 후 Redeploy 버튼 클릭했다
- [ ] Logs 탭에서 "Server is running" 메시지 확인했다

---

## 🧪 배포 후 검증

### 1. 헬스 체크
```bash
curl https://strong-wholeness-production.up.railway.app/api/health
```

예상 응답:
```json
{"status":"healthy","database":"connected"}
```

### 2. 프로그램 조회 (공개 API)
```bash
curl https://strong-wholeness-production.up.railway.app/api/programs
```

### 3. 회원가입 테스트
```bash
curl -X POST https://strong-wholeness-production.up.railway.app/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@railway.com",
    "password":"Test@1234",
    "name":"Test User",
    "phone":"010-1111-1111"
  }'
```

---

## 🎯 다음 단계

1. **Railway Variables 탭에서 환경 변수 설정** ← 지금 해야 할 일
2. **Redeploy 클릭**
3. **Logs 탭에서 "Server is running" 메시지 대기**
4. **curl 또는 브라우저에서 API 테스트**
5. **성공하면 프론트엔드 재배포** (Vercel에서)

---

**마지막 업데이트**: 2025-10-16
**상태**: 🔴 502 에러 발생 중 (환경 변수 설정 필요)
