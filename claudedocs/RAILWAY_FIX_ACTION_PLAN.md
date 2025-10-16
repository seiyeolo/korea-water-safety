# 🚀 Railway 502 에러 해결 실행 계획

## 📊 현재 상태

| 항목 | 상태 | 상세 |
|------|------|------|
| 빌드 | ✅ 성공 | "Deployment successful" |
| API 응답 | ❌ 502 | Bad Gateway - 응답 불가 |
| 근본 원인 | 🔍 환경 변수 미설정 | Railway Variables 탭에 JWT_SECRET 등이 없음 |

---

## 🎯 즉시 해야 할 일 (5분)

### 1️⃣ Railway Dashboard 접속
1. https://railway.app 접속
2. 프로젝트 선택: `korea-water-safety` (또는 `strong-wholeness`)
3. 백엔드 서비스 선택

### 2️⃣ 환경 변수 설정 (Variables 탭)

**다음 환경 변수를 추가하세요:**

```
JWT_SECRET               → 복사해서 붙여넣기 (하단 참고)
NODE_ENV                 → production
CORS_ORIGIN             → https://frontend-ogbtbeweg-seiyeolo-6781s-projects.vercel.app
```

**🔑 JWT_SECRET 생성 방법:**

터미널 열고 실행:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

출력 예시:
```
a3f5c8d2e1b4f9a7c6e2d9f3a5b7c1e4f8d2a6b9c3e7f1d5a9b2c6e8f3d7a1
```

이 값을 JWT_SECRET에 복사해서 붙여넣으세요.

### 3️⃣ 환경 변수 저장 및 재배포

1. 환경 변수 입력 후 **Save** 클릭
2. **Deployments** 탭으로 이동
3. 최신 배포의 **⋮** (더보기) 메뉴 → **Redeploy** 클릭
4. 배포 진행 상황 관찰 (30초~2분)

---

## ✅ 배포 후 검증

### 로그 확인
**Deployments → [최신 배포] → Logs** 탭에서:

```
✅ 성공 신호:
  "🚀 Server is running on: http://localhost:8080"
  "✨ Database connected successfully"
  "📦 Migrations completed"

❌ 실패 신호:
  "error: connect ECONNREFUSED"
  "Cannot find module"
  "ENOENT: no such file"
```

### API 테스트

**성공 확인 후** 다음 명령어 실행:

#### 1. 헬스 체크
```bash
curl https://strong-wholeness-production.up.railway.app/api/health
```

예상 응답:
```json
{"status":"healthy"}
```

#### 2. 프로그램 조회 (공개 API)
```bash
curl https://strong-wholeness-production.up.railway.app/api/programs
```

프로그램 데이터 배열이 반환되어야 함.

#### 3. 회원가입 테스트
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

성공 응답:
```json
{
  "success": true,
  "user": {...},
  "accessToken": "eyJ0eXAi...",
  "refreshToken": "eyJ0eXAi..."
}
```

---

## 📋 점검 사항

```
환경 변수 설정:
  [ ] JWT_SECRET ← 중요!
  [ ] NODE_ENV = production
  [ ] CORS_ORIGIN = 프론트엔드 URL

배포 후:
  [ ] Logs에서 "Server is running" 확인
  [ ] /api/health 응답 200
  [ ] /api/programs 데이터 반환
  [ ] 회원가입 테스트 성공

완료 후:
  [ ] 프론트엔드 Vercel에서 자동 재배포됨
  [ ] 프론트엔드에서 프로그램 데이터 로드 확인
```

---

## 🔄 만약 여전히 502가 나면?

### 원인별 해결 방법

| 로그 메시지 | 원인 | 해결책 |
|------------|------|--------|
| `error: connect ECONNREFUSED` | DB 미연결 | PostgreSQL 서비스 확인, DATABASE_URL 재확인 |
| `Cannot find module '@/common'` | Path alias 미해석 | tsconfig.json 확인, 재빌드 |
| `ENOENT: no such file` | 파일 누락 | `scripts/start.sh` 존재 확인 |
| `listen EADDRINUSE` | 포트 바인딩 실패 | PORT 환경 변수 확인 |

---

## 🎓 참고 자료

- **Railway 공식 문서**: [https://docs.railway.app](https://docs.railway.app)
- **NestJS 환경 변수**: [https://docs.nestjs.com/techniques/configuration](https://docs.nestjs.com/techniques/configuration)
- **Prisma 마이그레이션**: [https://www.prisma.io/docs/orm/prisma-migrate/workflows/add-to-existing-project](https://www.prisma.io/docs/orm/prisma-migrate/workflows/add-to-existing-project)

---

## 📞 다음 단계

1. ✅ **지금**: Railway 환경 변수 설정
2. ✅ **1분**: Redeploy 클릭
3. ✅ **2분**: Logs 탭에서 "Server is running" 확인
4. ✅ **3분**: curl로 API 테스트
5. ✅ **4분**: 성공 확인 후 프론트엔드 재배포 (자동)

---

**예상 총 소요 시간**: 5~10분

**마지막 업데이트**: 2025-10-16 18:00 UTC
**상태**: 🟡 대기 중 (환경 변수 설정 대기)
