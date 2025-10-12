# Prisma Seed 스크립트 사용 가이드

## 개요

이 문서는 한국수상안전협회 데이터베이스의 시드 데이터 생성 및 사용 방법을 안내합니다.

## 생성되는 샘플 데이터

### 1. 사용자 계정 (4개)

#### 관리자 계정
- **이메일**: `admin@watersafety.org`
- **역할**: ADMIN (관리자)
- **이름**: 관리자
- **전화**: 042-123-4567

#### 강사 계정
- **이메일**: `instructor@watersafety.org`
- **역할**: INSTRUCTOR (강사)
- **이름**: 김강사
- **전화**: 010-1234-5678

#### 일반 사용자 계정 1
- **이메일**: `user1@example.com`
- **역할**: USER (일반 회원)
- **이름**: 홍길동
- **전화**: 010-2345-6789

#### 일반 사용자 계정 2
- **이메일**: `user2@example.com`
- **역할**: USER (일반 회원)
- **이름**: 이영희
- **전화**: 010-3456-7890

> ⚠️ **중요**: 모든 계정의 비밀번호는 bcrypt로 해시 처리가 필요합니다.
> 현재는 플레이스홀더(`$2a$10$YourHashedPasswordHere`)가 설정되어 있습니다.

### 2. 교육 프로그램 (10개)

1. **생존수영 지도자 양성과정**
   - 기간: 40시간
   - 가격: 350,000원
   - 정원: 30명

2. **수상인명구조사 자격과정**
   - 기간: 80시간
   - 가격: 600,000원
   - 정원: 25명

3. **수상레저 안전교육 지도자과정**
   - 기간: 32시간
   - 가격: 280,000원
   - 정원: 20명

4. **어린이 수상안전 교육과정**
   - 기간: 16시간
   - 가격: 80,000원
   - 정원: 40명

5. **심폐소생술(CPR) 자격과정**
   - 기간: 8시간
   - 가격: 120,000원
   - 정원: 30명

6. **수영장 안전관리자 양성과정**
   - 기간: 24시간
   - 가격: 200,000원
   - 정원: 25명

7. **스노클링 지도자 자격과정**
   - 기간: 20시간
   - 가격: 250,000원
   - 정원: 15명

8. **카약 안전교육 지도자과정**
   - 기간: 28시간
   - 가격: 320,000원
   - 정원: 20명

9. **수상안전 응급처치 전문과정**
   - 기간: 16시간
   - 가격: 180,000원
   - 정원: 30명

10. **수상안전 강사 보수교육**
    - 기간: 8시간
    - 가격: 100,000원
    - 정원: 50명

### 3. 공지사항 게시글 (20개)

다양한 카테고리의 게시글:
- **NOTICE** (공지사항): 9개
- **NEWS** (새소식): 6개
- **EVENT** (행사): 4개
- **FAQ** (자주 묻는 질문): 1개

주요 게시글:
- 교육 과정 모집 공고
- 자격시험 일정 안내
- 창립기념식 개최
- 봉사단 모집
- 무료 교육 안내
- 안전수칙 안내
- 이벤트 공지 등

### 4. 첨부파일 (3개)

일부 공지사항에 PDF 첨부파일 포함:
- 생존수영 지도자 모집 공고
- 수상인명구조사 시험 일정
- 창립기념식 초청장

## 사용 방법

### 1. 데이터베이스 준비

먼저 PostgreSQL 데이터베이스가 실행 중인지 확인하고, `.env` 파일에 올바른 DATABASE_URL이 설정되어 있는지 확인하세요.

```bash
# PostgreSQL 데이터베이스 생성 (아직 생성하지 않았다면)
createdb water_safety_association
```

### 2. 마이그레이션 실행

데이터베이스 스키마를 생성합니다.

```bash
cd backend
npm run prisma:migrate
```

마이그레이션 이름을 입력하라는 메시지가 나타나면 의미 있는 이름을 입력하세요:
```
Enter a name for the new migration: › init
```

### 3. 시드 데이터 생성

두 가지 방법으로 시드 데이터를 생성할 수 있습니다.

#### 방법 1: npm 스크립트 사용 (권장)

```bash
npm run prisma:seed
```

#### 방법 2: Prisma CLI 직접 사용

```bash
npx prisma db seed
```

### 4. 결과 확인

시드 스크립트 실행 후 다음과 같은 통계가 출력됩니다:

```
🌱 Starting database seeding...

🧹 Cleaning existing data...
✅ Existing data cleaned

👤 Creating admin account...
✅ Admin created: admin@watersafety.org

👥 Creating test users...
✅ 3 test users created

📚 Creating education programs...
✅ 10 education programs created

📢 Creating notice posts...
✅ 20 notice posts created

📎 Adding attachments to some posts...
✅ 3 attachments added

📊 Seeding completed successfully!

=================================
👥 Users: 4
📚 Education Programs: 10
📢 Posts: 20
📎 Attachments: 3
=================================

🔑 Test Accounts:
Admin: admin@watersafety.org
Instructor: instructor@watersafety.org
User 1: user1@example.com
User 2: user2@example.com

⚠️  Default password needs to be hashed with bcrypt
    Use: await bcrypt.hash("your-password", 10)
```

### 5. Prisma Studio로 확인

GUI를 통해 생성된 데이터를 확인할 수 있습니다.

```bash
npm run prisma:studio
```

브라우저에서 `http://localhost:5555`가 자동으로 열립니다.

## 비밀번호 해시 처리

실제 운영 환경에서 사용하기 전에 비밀번호를 bcrypt로 해시 처리해야 합니다.

### bcrypt 설치

```bash
npm install bcrypt
npm install -D @types/bcrypt
```

### 비밀번호 해시 생성 예제

```typescript
import bcrypt from 'bcrypt';

// 비밀번호 해시 생성
const password = 'your-secure-password';
const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword);

// seed.ts에서 사용
const admin = await prisma.user.create({
  data: {
    email: 'admin@watersafety.org',
    password: hashedPassword, // 해시된 비밀번호 사용
    // ... 나머지 필드
  },
});
```

### 권장 테스트 비밀번호 설정

개발 환경에서는 다음과 같이 간단한 비밀번호를 사용할 수 있습니다:

```typescript
const testPassword = await bcrypt.hash('test1234', 10);
```

## 데이터 초기화

개발 중에 데이터베이스를 초기화하고 다시 시드 데이터를 생성하려면:

```bash
# 방법 1: 마이그레이션 리셋 (시드 자동 실행)
npx prisma migrate reset

# 방법 2: 수동으로 데이터 삭제 후 시드 실행
npm run prisma:seed
```

> ⚠️ **주의**: `migrate reset` 명령은 모든 데이터를 삭제하므로 개발 환경에서만 사용하세요!

## 트러블슈팅

### 문제: "Cannot connect to database"

**해결책**:
1. PostgreSQL이 실행 중인지 확인
2. `.env` 파일의 DATABASE_URL이 올바른지 확인
3. 데이터베이스가 생성되어 있는지 확인

```bash
# PostgreSQL 상태 확인
pg_isready

# 데이터베이스 목록 확인
psql -U postgres -c "\l"
```

### 문제: "Unique constraint failed"

**해결책**:
이미 데이터가 존재하는 경우 발생합니다. 데이터베이스를 리셋하세요.

```bash
npx prisma migrate reset
```

### 문제: "Cannot find module '@prisma/client'"

**해결책**:
Prisma Client를 생성하세요.

```bash
npm run prisma:generate
```

## 다음 단계

시드 데이터 생성 후:

1. **API 엔드포인트 테스트**: 생성된 데이터로 API 기능 테스트
2. **프론트엔드 연동**: 프론트엔드에서 백엔드 API 호출
3. **인증 시스템 구현**: JWT 기반 로그인 기능 추가
4. **추가 시드 데이터**: 필요에 따라 더 많은 샘플 데이터 추가

## 참고 자료

- [Prisma Seeding Documentation](https://www.prisma.io/docs/guides/database/seed-database)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
