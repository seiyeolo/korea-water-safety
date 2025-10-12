# API 명세서

## 1. API 개요

### 1.1 기본 정보
- **Base URL**: `https://api.watersafety.org/v1`
- **Protocol**: HTTPS only
- **Format**: JSON
- **Authentication**: JWT Bearer Token
- **Rate Limiting**: 100 requests/minute per IP

### 1.2 공통 응답 형식

#### 성공 응답
```json
{
  "success": true,
  "data": { /* 응답 데이터 */ },
  "message": "작업이 성공적으로 완료되었습니다",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지",
    "details": { /* 상세 정보 */ }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### 페이지네이션 응답
```json
{
  "success": true,
  "data": [ /* 데이터 배열 */ ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### 1.3 HTTP 상태 코드
- `200 OK`: 성공
- `201 Created`: 생성 성공
- `204 No Content`: 삭제 성공
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 실패
- `403 Forbidden`: 권한 없음
- `404 Not Found`: 리소스 없음
- `409 Conflict`: 중복 또는 충돌
- `422 Unprocessable Entity`: 유효성 검증 실패
- `429 Too Many Requests`: Rate limit 초과
- `500 Internal Server Error`: 서버 에러

## 2. 인증 (Authentication)

### 2.1 회원가입
```
POST /auth/register
```

**Request Body**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "홍길동",
  "phone": "010-1234-5678",
  "birthDate": "1990-01-01",
  "gender": "male"
}
```

**Response (201)**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "홍길동",
      "role": "member"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2.2 로그인
```
POST /auth/login
```

**Request Body**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "홍길동",
      "role": "member"
    },
    "accessToken": "jwt_token",
    "refreshToken": "jwt_refresh_token",
    "expiresIn": 3600
  }
}
```

### 2.3 토큰 갱신
```
POST /auth/refresh
```

**Request Body**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

### 2.4 로그아웃
```
POST /auth/logout
Authorization: Bearer {token}
```

### 2.5 비밀번호 재설정 요청
```
POST /auth/password/reset-request
```

**Request Body**
```json
{
  "email": "user@example.com"
}
```

### 2.6 비밀번호 재설정
```
POST /auth/password/reset
```

**Request Body**
```json
{
  "token": "reset_token",
  "newPassword": "NewSecurePass123!"
}
```

## 3. 사용자 (Users)

### 3.1 내 프로필 조회
```
GET /users/me
Authorization: Bearer {token}
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "홍길동",
    "phone": "010-1234-5678",
    "profileImageUrl": "https://...",
    "role": "member",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### 3.2 프로필 수정
```
PATCH /users/me
Authorization: Bearer {token}
```

**Request Body**
```json
{
  "name": "홍길동",
  "phone": "010-9876-5432",
  "address": "서울시 강남구..."
}
```

### 3.3 프로필 이미지 업로드
```
POST /users/me/profile-image
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body**
```
file: [binary data]
```

### 3.4 회원 탈퇴
```
DELETE /users/me
Authorization: Bearer {token}
```

**Request Body**
```json
{
  "password": "CurrentPassword123!",
  "reason": "탈퇴 사유"
}
```

## 4. 교육 프로그램 (Programs)

### 4.1 프로그램 목록 조회
```
GET /programs?category={category}&status={status}&page={page}&limit={limit}
```

**Query Parameters**
- `category` (optional): 카테고리 필터 (basic, advanced, instructor)
- `status` (optional): 상태 필터 (active, inactive)
- `page` (optional): 페이지 번호 (default: 1)
- `limit` (optional): 페이지당 개수 (default: 20)

**Response (200)**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "기초 수상안전 교육",
      "description": "수상안전의 기본을 배우는...",
      "category": "basic",
      "durationDays": 3,
      "price": 50000,
      "thumbnailUrl": "https://...",
      "instructor": {
        "id": "uuid",
        "name": "김강사"
      },
      "nextSchedule": {
        "id": "uuid",
        "startDate": "2024-03-01",
        "endDate": "2024-03-03",
        "availableSeats": 15
      }
    }
  ],
  "pagination": { /* ... */ }
}
```

### 4.2 프로그램 상세 조회
```
GET /programs/{programId}
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "기초 수상안전 교육",
    "description": "상세 설명...",
    "category": "basic",
    "durationDays": 3,
    "capacity": 20,
    "price": 50000,
    "syllabus": "1일차: ...\n2일차: ...",
    "requirements": "수영 가능자",
    "instructor": {
      "id": "uuid",
      "name": "김강사",
      "bio": "경력 10년..."
    },
    "schedules": [
      {
        "id": "uuid",
        "startDate": "2024-03-01",
        "endDate": "2024-03-03",
        "location": "서울시 강동구 수상안전센터",
        "currentCapacity": 5,
        "maxCapacity": 20,
        "registrationDeadline": "2024-02-25"
      }
    ]
  }
}
```

### 4.3 프로그램 일정 목록
```
GET /programs/{programId}/schedules
```

### 4.4 프로그램 등록 (Admin/Instructor)
```
POST /programs
Authorization: Bearer {token}
Role: admin, instructor
```

**Request Body**
```json
{
  "title": "고급 수상안전 교육",
  "description": "전문가를 위한...",
  "category": "advanced",
  "durationDays": 5,
  "capacity": 15,
  "price": 100000,
  "syllabus": "상세 커리큘럼...",
  "requirements": "기초 자격증 보유자"
}
```

### 4.5 프로그램 수정 (Admin/Instructor)
```
PATCH /programs/{programId}
Authorization: Bearer {token}
```

### 4.6 프로그램 삭제 (Admin)
```
DELETE /programs/{programId}
Authorization: Bearer {token}
Role: admin
```

## 5. 수강 신청 (Enrollments)

### 5.1 수강 신청
```
POST /enrollments
Authorization: Bearer {token}
```

**Request Body**
```json
{
  "scheduleId": "uuid",
  "notes": "특이사항..."
}
```

**Response (201)**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "scheduleId": "uuid",
    "status": "pending",
    "paymentRequired": true,
    "amount": 50000,
    "paymentLink": "https://payment.example.com/..."
  }
}
```

### 5.2 내 수강 신청 목록
```
GET /enrollments/me?status={status}
Authorization: Bearer {token}
```

**Query Parameters**
- `status` (optional): pending, confirmed, completed, cancelled

### 5.3 수강 신청 상세
```
GET /enrollments/{enrollmentId}
Authorization: Bearer {token}
```

### 5.4 수강 신청 취소
```
DELETE /enrollments/{enrollmentId}
Authorization: Bearer {token}
```

## 6. 자격증 (Certifications)

### 6.1 자격증 종류 목록
```
GET /certification-types
```

**Response (200)**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "수상안전요원",
      "nameEn": "Water Safety Officer",
      "description": "수상안전요원 자격증은...",
      "level": "basic",
      "validYears": 3,
      "renewalRequired": true,
      "price": 50000,
      "requirements": "만 18세 이상, 수영 능력..."
    }
  ]
}
```

### 6.2 자격증 종류 상세
```
GET /certification-types/{certTypeId}
```

### 6.3 내 자격증 목록
```
GET /certifications/me?status={status}
Authorization: Bearer {token}
```

**Response (200)**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "certType": {
        "id": "uuid",
        "name": "수상안전요원",
        "level": "basic"
      },
      "certNumber": "WSO-2024-001234",
      "issuedAt": "2024-01-15",
      "expiresAt": "2027-01-15",
      "status": "active",
      "fileUrl": "https://s3.../cert.pdf",
      "verificationCode": "ABC123XYZ"
    }
  ]
}
```

### 6.4 자격증 검증
```
GET /certifications/verify/{certNumber}
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "valid": true,
    "certNumber": "WSO-2024-001234",
    "holderName": "홍길동",
    "certType": "수상안전요원",
    "issuedAt": "2024-01-15",
    "expiresAt": "2027-01-15",
    "status": "active"
  }
}
```

### 6.5 자격증 갱신 신청
```
POST /certifications/{certId}/renewal
Authorization: Bearer {token}
```

### 6.6 자격증 PDF 다운로드
```
GET /certifications/{certId}/download
Authorization: Bearer {token}
```

## 7. 봉사 활동 (Volunteer Activities)

### 7.1 봉사 활동 목록
```
GET /volunteer-activities?category={category}&status={status}&date={date}
```

**Response (200)**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "해변 안전 캠페인",
      "description": "여름철 해변 안전 홍보...",
      "activityDate": "2024-07-15",
      "startTime": "09:00",
      "endTime": "18:00",
      "location": "부산 해운대 해수욕장",
      "capacity": 30,
      "currentRegistrations": 15,
      "availableSeats": 15,
      "category": "education",
      "thumbnailUrl": "https://...",
      "organizer": {
        "id": "uuid",
        "name": "김담당자"
      }
    }
  ]
}
```

### 7.2 봉사 활동 상세
```
GET /volunteer-activities/{activityId}
```

### 7.3 봉사 활동 신청
```
POST /volunteer-registrations
Authorization: Bearer {token}
```

**Request Body**
```json
{
  "activityId": "uuid",
  "motivation": "해양 안전에 관심이 많아서..."
}
```

### 7.4 내 봉사 활동 신청 목록
```
GET /volunteer-registrations/me?status={status}
Authorization: Bearer {token}
```

### 7.5 봉사 활동 신청 취소
```
DELETE /volunteer-registrations/{registrationId}
Authorization: Bearer {token}
```

### 7.6 봉사 활동 등록 (Admin)
```
POST /volunteer-activities
Authorization: Bearer {token}
Role: admin
```

## 8. 콘텐츠 (Content)

### 8.1 공지사항 목록
```
GET /content/notices?page={page}&limit={limit}
```

**Response (200)**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "2024년 1분기 교육 일정 안내",
      "excerpt": "2024년 1분기 교육 일정을 안내드립니다...",
      "thumbnailUrl": "https://...",
      "author": {
        "id": "uuid",
        "name": "관리자"
      },
      "views": 1234,
      "isPinned": true,
      "publishedAt": "2024-01-01T00:00:00Z",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": { /* ... */ }
}
```

### 8.2 공지사항 상세
```
GET /content/notices/{postId}
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "2024년 1분기 교육 일정 안내",
    "content": "전체 내용...",
    "thumbnailUrl": "https://...",
    "author": {
      "id": "uuid",
      "name": "관리자"
    },
    "category": "notice",
    "views": 1235,
    "publishedAt": "2024-01-01T00:00:00Z",
    "attachments": [
      {
        "id": "uuid",
        "fileName": "schedule.pdf",
        "fileUrl": "https://...",
        "fileSize": 1024000
      }
    ]
  }
}
```

### 8.3 안전정보 목록
```
GET /content/safety-info?page={page}&limit={limit}
```

### 8.4 안전정보 상세
```
GET /content/safety-info/{postId}
```

### 8.5 FAQ 목록
```
GET /content/faqs?category={category}
```

### 8.6 콘텐츠 검색
```
GET /content/search?q={query}&category={category}
```

**Query Parameters**
- `q` (required): 검색 키워드
- `category` (optional): notice, safety, news, faq

### 8.7 콘텐츠 작성 (Admin)
```
POST /content/posts
Authorization: Bearer {token}
Role: admin
```

**Request Body**
```json
{
  "category": "notice",
  "title": "제목",
  "content": "내용",
  "isPinned": false
}
```

## 9. 댓글 (Comments)

### 9.1 댓글 목록
```
GET /posts/{postId}/comments?page={page}&limit={limit}
```

### 9.2 댓글 작성
```
POST /posts/{postId}/comments
Authorization: Bearer {token}
```

**Request Body**
```json
{
  "content": "댓글 내용...",
  "parentId": "uuid" // optional, for replies
}
```

### 9.3 댓글 수정
```
PATCH /comments/{commentId}
Authorization: Bearer {token}
```

### 9.4 댓글 삭제
```
DELETE /comments/{commentId}
Authorization: Bearer {token}
```

## 10. 결제 (Payments)

### 10.1 결제 요청
```
POST /payments
Authorization: Bearer {token}
```

**Request Body**
```json
{
  "enrollmentId": "uuid",
  "amount": 50000,
  "paymentMethod": "card",
  "successUrl": "https://example.com/success",
  "failUrl": "https://example.com/fail"
}
```

**Response (201)**
```json
{
  "success": true,
  "data": {
    "paymentId": "uuid",
    "checkoutUrl": "https://payment-gateway.com/checkout/...",
    "amount": 50000
  }
}
```

### 10.2 결제 상태 확인
```
GET /payments/{paymentId}
Authorization: Bearer {token}
```

### 10.3 결제 내역
```
GET /payments/me?status={status}&page={page}
Authorization: Bearer {token}
```

### 10.4 환불 요청
```
POST /payments/{paymentId}/refund
Authorization: Bearer {token}
```

**Request Body**
```json
{
  "reason": "환불 사유",
  "amount": 50000 // optional, partial refund
}
```

## 11. 파일 업로드 (Files)

### 11.1 파일 업로드
```
POST /files/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body**
```
file: [binary data]
folder: "certifications" // optional
```

**Response (201)**
```json
{
  "success": true,
  "data": {
    "fileUrl": "https://s3.amazonaws.com/.../file.pdf",
    "fileName": "file.pdf",
    "fileSize": 1024000,
    "mimeType": "application/pdf"
  }
}
```

## 12. 관리자 (Admin)

### 12.1 대시보드 통계
```
GET /admin/dashboard
Authorization: Bearer {token}
Role: admin
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1234,
    "totalEnrollments": 567,
    "totalCertifications": 890,
    "monthlyRevenue": 5000000,
    "upcomingPrograms": 12,
    "recentActivities": [ /* ... */ ]
  }
}
```

### 12.2 사용자 관리
```
GET /admin/users?role={role}&status={status}&page={page}
Authorization: Bearer {token}
Role: admin
```

### 12.3 사용자 상세
```
GET /admin/users/{userId}
Authorization: Bearer {token}
Role: admin
```

### 12.4 사용자 권한 변경
```
PATCH /admin/users/{userId}/role
Authorization: Bearer {token}
Role: admin
```

**Request Body**
```json
{
  "role": "instructor" // member, instructor, admin
}
```

### 12.5 수강 신청 승인/거부
```
PATCH /admin/enrollments/{enrollmentId}/status
Authorization: Bearer {token}
Role: admin
```

**Request Body**
```json
{
  "status": "confirmed", // confirmed, rejected
  "notes": "승인/거부 사유"
}
```

### 12.6 자격증 발급
```
POST /admin/certifications/issue
Authorization: Bearer {token}
Role: admin
```

**Request Body**
```json
{
  "userId": "uuid",
  "certTypeId": "uuid",
  "enrollmentId": "uuid",
  "issuedAt": "2024-01-15"
}
```

## 13. Webhook (결제 알림 등)

### 13.1 결제 완료 Webhook
```
POST /webhooks/payment/success
```

**Request Body (from PG)**
```json
{
  "transactionId": "pg_transaction_id",
  "paymentId": "uuid",
  "amount": 50000,
  "status": "completed",
  "paidAt": "2024-01-15T10:30:00Z"
}
```

## 14. 에러 코드

| 코드 | 메시지 | 설명 |
|------|--------|------|
| AUTH_001 | Invalid credentials | 잘못된 인증 정보 |
| AUTH_002 | Token expired | 토큰 만료 |
| AUTH_003 | Insufficient permissions | 권한 부족 |
| USER_001 | User not found | 사용자 없음 |
| USER_002 | Email already exists | 이메일 중복 |
| PROG_001 | Program not found | 프로그램 없음 |
| PROG_002 | Schedule full | 정원 초과 |
| ENRL_001 | Already enrolled | 중복 신청 |
| CERT_001 | Certification not found | 자격증 없음 |
| PAY_001 | Payment failed | 결제 실패 |
| FILE_001 | File too large | 파일 크기 초과 |

## 15. Rate Limiting

- **Default**: 100 requests/minute per IP
- **Authenticated**: 1000 requests/minute per user
- **Response Header**:
  - `X-RateLimit-Limit`: 총 허용 횟수
  - `X-RateLimit-Remaining`: 남은 횟수
  - `X-RateLimit-Reset`: 리셋 시간 (Unix timestamp)

## 16. API 문서화

### Swagger/OpenAPI
```
GET /api-docs
```
Interactive API documentation available at the above endpoint.

## 17. 다음 단계

- [05_frontend_architecture.md](./05_frontend_architecture.md): 프론트엔드에서 API 호출 구현
- [06_security_compliance.md](./06_security_compliance.md): API 보안 강화
