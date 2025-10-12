# 데이터베이스 스키마 설계

## 1. 데이터베이스 개요

### 1.1 선택한 데이터베이스
- **Primary**: PostgreSQL 15+
- **Cache**: Redis 7+
- **File Storage**: S3-compatible Object Storage

### 1.2 설계 원칙
- 정규화: 3NF (Third Normal Form) 기준
- 인덱싱: 성능 최적화를 위한 전략적 인덱스
- 외래 키: 데이터 무결성 보장
- 암호화: 민감 정보 암호화 (AES-256)
- 소프트 삭제: `deleted_at` 컬럼으로 논리 삭제

## 2. ERD (Entity Relationship Diagram)

```
┌─────────────────┐         ┌──────────────────┐
│     Users       │1      ∞│   Enrollments    │
│─────────────────│◄────────│──────────────────│
│ id (PK)         │         │ id (PK)          │
│ email           │         │ user_id (FK)     │
│ password_hash   │         │ program_id (FK)  │
│ name            │         │ status           │
│ phone           │         │ enrolled_at      │
│ role            │         │ completed_at     │
│ created_at      │         │ payment_id (FK)  │
└─────────────────┘         └──────────────────┘
        │1                           │∞
        │                            │
        │∞                           │1
┌─────────────────┐         ┌──────────────────┐
│ Certifications  │         │    Programs      │
│─────────────────│         │──────────────────│
│ id (PK)         │         │ id (PK)          │
│ user_id (FK)    │         │ title            │
│ cert_type_id(FK)│         │ description      │
│ cert_number     │         │ category         │
│ issued_at       │         │ duration_days    │
│ expires_at      │         │ capacity         │
│ file_url        │         │ price            │
└─────────────────┘         │ instructor_id(FK)│
        │∞                  │ status           │
        │                   └──────────────────┘
        │1                           │∞
┌─────────────────┐                  │
│CertificationTypes│                 │1
│─────────────────│         ┌──────────────────┐
│ id (PK)         │         │ ProgramSchedules │
│ name            │         │──────────────────│
│ description     │         │ id (PK)          │
│ requirements    │         │ program_id (FK)  │
│ valid_years     │         │ start_date       │
│ price           │         │ end_date         │
└─────────────────┘         │ location         │
                            │ current_capacity │
                            └──────────────────┘

┌─────────────────┐         ┌──────────────────┐
│     Users       │1      ∞│ VolunteerRegistr.│
│─────────────────│◄────────│──────────────────│
│ (상단 참조)      │         │ id (PK)          │
└─────────────────┘         │ user_id (FK)     │
        │1                  │ activity_id (FK) │
        │                   │ status           │
        │∞                  │ registered_at    │
┌─────────────────┐         └──────────────────┘
│ ContentPosts    │                  │∞
│─────────────────│                  │
│ id (PK)         │                  │1
│ author_id (FK)  │         ┌──────────────────┐
│ category        │         │ VolunteerActivit.│
│ title           │         │──────────────────│
│ content         │         │ id (PK)          │
│ status          │         │ title            │
│ views           │         │ description      │
│ published_at    │         │ date             │
│ created_at      │         │ location         │
└─────────────────┘         │ capacity         │
        │1                  │ organizer_id(FK) │
        │                   │ status           │
        │∞                  └──────────────────┘
┌─────────────────┐
│   Comments      │         ┌──────────────────┐
│─────────────────│         │    Payments      │
│ id (PK)         │         │──────────────────│
│ post_id (FK)    │         │ id (PK)          │
│ user_id (FK)    │         │ user_id (FK)     │
│ content         │         │ amount           │
│ created_at      │         │ status           │
└─────────────────┘         │ payment_method   │
                            │ transaction_id   │
                            │ paid_at          │
                            └──────────────────┘
```

## 3. 테이블 상세 설계

### 3.1 Users (회원)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  birth_date DATE,
  gender VARCHAR(10),
  address TEXT,
  role VARCHAR(20) NOT NULL DEFAULT 'member', -- member, instructor, admin
  profile_image_url TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMP,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_deleted_at ON users(deleted_at);

-- 개인정보보호: 민감 정보는 애플리케이션 레벨에서 암호화
COMMENT ON COLUMN users.phone IS '암호화된 전화번호';
```

### 3.2 Programs (교육 프로그램)
```sql
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL, -- basic, advanced, instructor, etc.
  duration_days INTEGER NOT NULL,
  capacity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  instructor_id UUID REFERENCES users(id),
  thumbnail_url TEXT,
  syllabus TEXT,
  requirements TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'active', -- active, inactive, archived
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_programs_category ON programs(category);
CREATE INDEX idx_programs_status ON programs(status);
CREATE INDEX idx_programs_instructor ON programs(instructor_id);
```

### 3.3 Program Schedules (프로그램 일정)
```sql
CREATE TABLE program_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location VARCHAR(255),
  current_capacity INTEGER NOT NULL DEFAULT 0,
  max_capacity INTEGER NOT NULL,
  registration_deadline DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled', -- scheduled, ongoing, completed, cancelled
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_schedules_program ON program_schedules(program_id);
CREATE INDEX idx_schedules_dates ON program_schedules(start_date, end_date);
CREATE INDEX idx_schedules_status ON program_schedules(status);

-- 제약 조건
ALTER TABLE program_schedules ADD CONSTRAINT chk_capacity
  CHECK (current_capacity <= max_capacity);
ALTER TABLE program_schedules ADD CONSTRAINT chk_dates
  CHECK (end_date >= start_date);
```

### 3.4 Enrollments (수강 신청)
```sql
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  program_id UUID NOT NULL REFERENCES programs(id),
  schedule_id UUID REFERENCES program_schedules(id),
  payment_id UUID REFERENCES payments(id),
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, confirmed, completed, cancelled
  attendance_rate DECIMAL(5, 2),
  completion_certificate_url TEXT,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_program ON enrollments(program_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);

-- 제약 조건: 중복 신청 방지
CREATE UNIQUE INDEX idx_unique_enrollment
  ON enrollments(user_id, schedule_id)
  WHERE cancelled_at IS NULL;
```

### 3.5 Certification Types (자격증 종류)
```sql
CREATE TABLE certification_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  name_en VARCHAR(100),
  description TEXT,
  requirements TEXT,
  valid_years INTEGER NOT NULL DEFAULT 3,
  renewal_required BOOLEAN DEFAULT TRUE,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  level VARCHAR(20), -- basic, intermediate, advanced
  order_number INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_cert_types_active ON certification_types(is_active);
CREATE INDEX idx_cert_types_level ON certification_types(level);
```

### 3.6 Certifications (발급된 자격증)
```sql
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  cert_type_id UUID NOT NULL REFERENCES certification_types(id),
  cert_number VARCHAR(50) UNIQUE NOT NULL,
  enrollment_id UUID REFERENCES enrollments(id),
  issued_at DATE NOT NULL,
  expires_at DATE,
  file_url TEXT NOT NULL, -- PDF 파일 URL (S3)
  verification_code VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active', -- active, expired, revoked
  revoked_reason TEXT,
  revoked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_certs_user ON certifications(user_id);
CREATE INDEX idx_certs_type ON certifications(cert_type_id);
CREATE INDEX idx_certs_number ON certifications(cert_number);
CREATE INDEX idx_certs_verification ON certifications(verification_code);
CREATE INDEX idx_certs_status ON certifications(status);
```

### 3.7 Volunteer Activities (봉사 활동)
```sql
CREATE TABLE volunteer_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  activity_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  location VARCHAR(255) NOT NULL,
  capacity INTEGER NOT NULL,
  current_registrations INTEGER DEFAULT 0,
  organizer_id UUID REFERENCES users(id),
  category VARCHAR(50), -- education, rescue, cleanup, etc.
  required_cert_type_id UUID REFERENCES certification_types(id),
  thumbnail_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled', -- scheduled, ongoing, completed, cancelled
  registration_deadline DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_volunteer_date ON volunteer_activities(activity_date);
CREATE INDEX idx_volunteer_status ON volunteer_activities(status);
CREATE INDEX idx_volunteer_category ON volunteer_activities(category);
```

### 3.8 Volunteer Registrations (봉사 활동 신청)
```sql
CREATE TABLE volunteer_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  activity_id UUID NOT NULL REFERENCES volunteer_activities(id),
  status VARCHAR(20) NOT NULL DEFAULT 'registered', -- registered, attended, absent, cancelled
  motivation TEXT,
  attended_at TIMESTAMP,
  volunteer_hours DECIMAL(4, 2),
  feedback TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_vol_reg_user ON volunteer_registrations(user_id);
CREATE INDEX idx_vol_reg_activity ON volunteer_registrations(activity_id);
CREATE INDEX idx_vol_reg_status ON volunteer_registrations(status);

-- 제약 조건: 중복 신청 방지
CREATE UNIQUE INDEX idx_unique_vol_registration
  ON volunteer_registrations(user_id, activity_id)
  WHERE cancelled_at IS NULL;
```

### 3.9 Content Posts (게시글: 공지사항, 안전정보 등)
```sql
CREATE TABLE content_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES users(id),
  category VARCHAR(50) NOT NULL, -- notice, safety, news, faq, etc.
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  thumbnail_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'draft', -- draft, published, archived
  is_pinned BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_posts_category ON content_posts(category);
CREATE INDEX idx_posts_status ON content_posts(status);
CREATE INDEX idx_posts_published ON content_posts(published_at DESC);
CREATE INDEX idx_posts_pinned ON content_posts(is_pinned, published_at DESC);

-- Full-text search 인덱스 (PostgreSQL)
CREATE INDEX idx_posts_fulltext ON content_posts
  USING gin(to_tsvector('korean', title || ' ' || content));
```

### 3.10 Comments (댓글)
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES content_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  parent_id UUID REFERENCES comments(id), -- 대댓글
  content TEXT NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_comments_post ON comments(post_id, created_at);
CREATE INDEX idx_comments_user ON comments(user_id);
CREATE INDEX idx_comments_parent ON comments(parent_id);
```

### 3.11 Payments (결제)
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL, -- card, bank_transfer, virtual_account, etc.
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, completed, failed, cancelled, refunded
  transaction_id VARCHAR(255) UNIQUE, -- PG사 거래 ID
  pg_provider VARCHAR(50), -- tosspayments, nicepay, etc.
  receipt_url TEXT,
  paid_at TIMESTAMP,
  refunded_at TIMESTAMP,
  refund_amount DECIMAL(10, 2),
  refund_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_transaction ON payments(transaction_id);
```

### 3.12 Attachments (첨부파일)
```sql
CREATE TABLE attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type VARCHAR(50) NOT NULL, -- post, program, activity, etc.
  entity_id UUID NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_attachments_entity ON attachments(entity_type, entity_id);
```

### 3.13 Audit Logs (감사 로그)
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL, -- create, update, delete, login, etc.
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_audit_user ON audit_logs(user_id, created_at DESC);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);
```

## 4. 데이터베이스 뷰 (Views)

### 4.1 활성 프로그램 통계
```sql
CREATE VIEW v_program_statistics AS
SELECT
  p.id,
  p.title,
  p.category,
  COUNT(DISTINCT e.id) as total_enrollments,
  COUNT(DISTINCT CASE WHEN e.status = 'completed' THEN e.id END) as completed_enrollments,
  AVG(e.attendance_rate) as avg_attendance_rate,
  SUM(CASE WHEN py.status = 'completed' THEN py.amount ELSE 0 END) as total_revenue
FROM programs p
LEFT JOIN enrollments e ON p.id = e.program_id
LEFT JOIN payments py ON e.payment_id = py.id
WHERE p.deleted_at IS NULL
GROUP BY p.id, p.title, p.category;
```

### 4.2 회원별 학습 현황
```sql
CREATE VIEW v_user_learning_progress AS
SELECT
  u.id as user_id,
  u.name,
  u.email,
  COUNT(DISTINCT e.id) as total_enrollments,
  COUNT(DISTINCT CASE WHEN e.status = 'completed' THEN e.id END) as completed_courses,
  COUNT(DISTINCT c.id) as total_certifications,
  COUNT(DISTINCT vr.id) as volunteer_participations
FROM users u
LEFT JOIN enrollments e ON u.id = e.user_id
LEFT JOIN certifications c ON u.id = c.user_id AND c.status = 'active'
LEFT JOIN volunteer_registrations vr ON u.id = vr.user_id AND vr.status = 'attended'
WHERE u.deleted_at IS NULL
GROUP BY u.id, u.name, u.email;
```

## 5. Prisma Schema (ORM 예시)

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id              String    @id @default(uuid())
  email           String    @unique
  passwordHash    String    @map("password_hash")
  name            String
  phone           String?
  birthDate       DateTime? @map("birth_date") @db.Date
  gender          String?
  address         String?
  role            String    @default("member")
  profileImageUrl String?   @map("profile_image_url")
  emailVerified   Boolean   @default(false) @map("email_verified")
  emailVerifiedAt DateTime? @map("email_verified_at")
  lastLoginAt     DateTime? @map("last_login_at")
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")
  deletedAt       DateTime? @map("deleted_at")

  enrollments             Enrollment[]
  certifications          Certification[]
  volunteerRegistrations  VolunteerRegistration[]
  contentPosts            ContentPost[]
  comments                Comment[]
  payments                Payment[]
  instructedPrograms      Program[] @relation("ProgramInstructor")
  organizedActivities     VolunteerActivity[] @relation("ActivityOrganizer")

  @@index([email])
  @@index([role])
  @@index([deletedAt])
  @@map("users")
}

model Program {
  id            String    @id @default(uuid())
  title         String
  description   String?
  category      String
  durationDays  Int       @map("duration_days")
  capacity      Int
  price         Decimal   @db.Decimal(10, 2)
  instructorId  String?   @map("instructor_id")
  thumbnailUrl  String?   @map("thumbnail_url")
  syllabus      String?
  requirements  String?
  status        String    @default("active")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  deletedAt     DateTime? @map("deleted_at")

  instructor User?               @relation("ProgramInstructor", fields: [instructorId], references: [id])
  schedules  ProgramSchedule[]
  enrollments Enrollment[]

  @@index([category])
  @@index([status])
  @@index([instructorId])
  @@map("programs")
}

// ... 다른 모델들도 유사하게 정의
```

## 6. 데이터 마이그레이션 전략

### 6.1 초기 마이그레이션
```bash
# Prisma 사용 시
npx prisma migrate dev --name init

# Alembic 사용 시 (Python)
alembic init alembic
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

### 6.2 시드 데이터
```typescript
// prisma/seed.ts
async function main() {
  // 관리자 계정
  await prisma.user.create({
    data: {
      email: 'admin@watersafety.org',
      passwordHash: await hash('admin123'),
      name: '관리자',
      role: 'admin'
    }
  });

  // 자격증 종류
  await prisma.certificationType.createMany({
    data: [
      { name: '수상안전요원', level: 'basic', validYears: 3, price: 50000 },
      { name: '수상안전강사', level: 'advanced', validYears: 5, price: 100000 }
    ]
  });
}
```

## 7. 백업 및 복구 전략

### 7.1 자동 백업
```bash
# 일일 백업 (cron)
0 2 * * * pg_dump -U postgres watersafety_db | gzip > /backups/db_$(date +\%Y\%m\%d).sql.gz
```

### 7.2 Point-in-Time Recovery
- PostgreSQL WAL (Write-Ahead Logging) 활성화
- 연속 아카이빙 설정
- 필요 시 특정 시점으로 복구 가능

## 8. 성능 최적화

### 8.1 인덱스 전략
- 자주 조회되는 컬럼: 단일 인덱스
- 복합 조건 쿼리: 복합 인덱스
- Full-text search: GIN 인덱스

### 8.2 파티셔닝 (대용량 데이터 시)
```sql
-- 예: audit_logs 테이블을 월별로 파티셔닝
CREATE TABLE audit_logs_2024_01 PARTITION OF audit_logs
  FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

### 8.3 쿼리 최적화
- N+1 문제 해결: JOIN 또는 데이터 로더 사용
- 페이지네이션: OFFSET 대신 커서 기반
- 집계 쿼리: 적절한 인덱스 및 캐싱

## 9. 보안 고려사항

### 9.1 민감 정보 처리
- 비밀번호: bcrypt 해싱 (saltRounds: 10)
- 전화번호: AES-256 암호화
- 주민등록번호: 수집하지 않음 (가능한 경우)

### 9.2 접근 제어
- Row Level Security (RLS) 활성화
- 사용자별 데이터 접근 권한 제한

### 9.3 SQL Injection 방어
- Prepared Statements 사용
- ORM 사용 (Prisma, TypeORM)
- 입력 검증 및 이스케이핑

## 10. 다음 단계

- [04_api_specification.md](./04_api_specification.md): API 엔드포인트 설계
- [06_security_compliance.md](./06_security_compliance.md): 보안 및 컴플라이언스 상세
