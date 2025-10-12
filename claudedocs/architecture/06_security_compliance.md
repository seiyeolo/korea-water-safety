# 보안 및 컴플라이언스

## 1. 보안 개요

### 1.1 보안 목표
- 데이터 기밀성 (Confidentiality): 민감 정보 보호
- 데이터 무결성 (Integrity): 데이터 변조 방지
- 가용성 (Availability): 서비스 지속성 보장
- 인증 (Authentication): 사용자 신원 확인
- 인가 (Authorization): 접근 권한 관리
- 추적성 (Traceability): 감사 로그 기록

### 1.2 위협 모델
- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- 인증/세션 탈취
- DDoS 공격
- 데이터 유출
- 무단 접근

## 2. 인증 및 인가

### 2.1 JWT 기반 인증

#### 토큰 구조
```typescript
// Access Token (유효기간: 1시간)
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "member",
  "iat": 1705320000,
  "exp": 1705323600
}

// Refresh Token (유효기간: 7일)
{
  "sub": "user_id",
  "type": "refresh",
  "iat": 1705320000,
  "exp": 1705924800
}
```

#### 구현 예시 (NestJS)
```typescript
// auth.service.ts
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(
        { ...payload, type: 'refresh' },
        { expiresIn: '7d' }
      )
    };
  }
}
```

#### JWT Guard
```typescript
// jwt-auth.guard.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다');
    }
    return user;
  }
}
```

### 2.2 Role-Based Access Control (RBAC)

#### 역할 정의
```typescript
export enum UserRole {
  MEMBER = 'member',       // 일반 회원
  INSTRUCTOR = 'instructor', // 강사
  ADMIN = 'admin'          // 관리자
}

// 권한 매트릭스
const permissions = {
  member: [
    'read:programs',
    'create:enrollments',
    'read:own_profile',
    'update:own_profile'
  ],
  instructor: [
    ...permissions.member,
    'create:programs',
    'update:own_programs',
    'read:enrollments'
  ],
  admin: [
    ...permissions.instructor,
    'create:users',
    'update:users',
    'delete:users',
    'manage:certifications',
    'manage:payments'
  ]
};
```

#### Roles Guard
```typescript
// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler()
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return requiredRoles.some((role) => user.role === role);
  }
}

// 사용 예시
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Get('users')
  @Roles('admin')
  getUsers() {
    return this.usersService.findAll();
  }
}
```

### 2.3 비밀번호 정책

#### 요구사항
- 최소 길이: 8자 이상
- 복잡도: 대소문자, 숫자, 특수문자 포함
- 비밀번호 재사용 제한: 최근 3개
- 비밀번호 만료: 90일 (선택사항)

#### 검증 로직
```typescript
// validation/password.validator.ts
import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
  .regex(/[a-z]/, '소문자를 포함해야 합니다')
  .regex(/[A-Z]/, '대문자를 포함해야 합니다')
  .regex(/[0-9]/, '숫자를 포함해야 합니다')
  .regex(/[@$!%*?&#]/, '특수문자를 포함해야 합니다');

export function validatePassword(password: string): boolean {
  return passwordSchema.safeParse(password).success;
}
```

## 3. 데이터 보안

### 3.1 민감 정보 암호화

#### AES-256 암호화
```typescript
// encryption/aes.service.ts
import * as crypto from 'crypto';

export class AESService {
  private algorithm = 'aes-256-gcm';
  private secretKey: Buffer;

  constructor(secretKey: string) {
    // 32바이트 키 생성
    this.secretKey = crypto.scryptSync(secretKey, 'salt', 32);
  }

  encrypt(text: string): { encrypted: string; iv: string; tag: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const tag = cipher.getAuthTag();

    return {
      encrypted,
      iv: iv.toString('hex'),
      tag: tag.toString('hex')
    };
  }

  decrypt(encrypted: string, iv: string, tag: string): string {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.secretKey,
      Buffer.from(iv, 'hex')
    );

    decipher.setAuthTag(Buffer.from(tag, 'hex'));

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}

// 사용 예시
const aes = new AESService(process.env.ENCRYPTION_KEY);

// 전화번호 암호화
const { encrypted, iv, tag } = aes.encrypt('010-1234-5678');

// DB에 저장
await prisma.user.create({
  data: {
    phone: encrypted,
    phoneIv: iv,
    phoneTag: tag
  }
});
```

### 3.2 개인정보보호법 준수

#### 수집하는 개인정보
- **필수**: 이메일, 비밀번호, 이름, 전화번호
- **선택**: 생년월일, 성별, 주소

#### 처리 원칙
```typescript
// 개인정보 처리 동의
interface ConsentForm {
  requiredConsent: boolean;        // 필수 동의
  marketingConsent?: boolean;      // 마케팅 동의 (선택)
  thirdPartyConsent?: boolean;     // 제3자 제공 동의 (선택)
}

// 개인정보 보유 기간
const retentionPeriods = {
  active_user: 'unlimited',        // 회원 탈퇴 시까지
  inactive_user: '1년',            // 1년 미접속 시 분리 보관
  deleted_user: '5년',             // 법적 의무 (전자금융거래법)
  payment_records: '5년'           // 전자상거래법
};
```

#### 개인정보 처리 방침
```markdown
# 개인정보 처리방침

## 1. 수집하는 개인정보 항목
- 필수: 이메일, 비밀번호, 이름, 전화번호
- 선택: 생년월일, 성별, 주소

## 2. 수집 및 이용 목적
- 회원 가입 및 관리
- 교육 프로그램 신청 및 관리
- 자격증 발급 및 관리
- 공지사항 전달

## 3. 보유 및 이용 기간
- 회원 탈퇴 시까지 (단, 법령에서 정한 경우 예외)

## 4. 개인정보 제3자 제공
- 결제 대행사 (PG사): 결제 처리 목적
```

### 3.3 데이터 마스킹

#### 프론트엔드 마스킹
```typescript
// utils/mask.ts
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@');
  const maskedUsername = username.slice(0, 2) + '***';
  return `${maskedUsername}@${domain}`;
}

export function maskPhone(phone: string): string {
  return phone.replace(/(\d{3})-?(\d{3,4})-?(\d{4})/, '$1-****-$3');
}

// 예시
maskEmail('user@example.com') // 'us***@example.com'
maskPhone('010-1234-5678')    // '010-****-5678'
```

#### 백엔드 로깅 시 마스킹
```typescript
// logging/logger.service.ts
export class LoggerService {
  private maskSensitiveData(data: any): any {
    if (typeof data === 'object') {
      const masked = { ...data };

      // 민감 필드 마스킹
      const sensitiveFields = ['password', 'phone', 'ssn', 'cardNumber'];

      for (const field of sensitiveFields) {
        if (masked[field]) {
          masked[field] = '***';
        }
      }

      return masked;
    }

    return data;
  }

  log(message: string, context?: any) {
    const maskedContext = this.maskSensitiveData(context);
    console.log(message, maskedContext);
  }
}
```

## 4. API 보안

### 4.1 Rate Limiting

#### Express Rate Limit
```typescript
// middleware/rate-limit.ts
import rateLimit from 'express-rate-limit';

export const globalRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1분
  max: 100,            // 최대 100 요청
  message: '요청 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.',
  standardHeaders: true,
  legacyHeaders: false
});

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 5,                    // 최대 5회 시도
  skipSuccessfulRequests: true,
  message: '로그인 시도 횟수를 초과했습니다. 15분 후 다시 시도해주세요.'
});

// 사용
app.use('/api', globalRateLimit);
app.use('/api/auth/login', authRateLimit);
```

### 4.2 CORS 설정

```typescript
// main.ts (NestJS)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://watersafety.org',
      'https://www.watersafety.org',
      process.env.NODE_ENV === 'development' && 'http://localhost:3000'
    ].filter(Boolean),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  });

  await app.listen(4000);
}
```

### 4.3 CSRF 보호

#### Double Submit Cookie 패턴
```typescript
// middleware/csrf.middleware.ts
import { v4 as uuidv4 } from 'uuid';

export function csrfProtection(req, res, next) {
  if (req.method === 'GET') {
    // CSRF 토큰 생성 및 쿠키 설정
    const csrfToken = uuidv4();
    res.cookie('XSRF-TOKEN', csrfToken, {
      httpOnly: false, // JS에서 읽을 수 있어야 함
      secure: true,
      sameSite: 'strict'
    });
    return next();
  }

  // POST/PUT/DELETE 요청 시 검증
  const tokenFromHeader = req.headers['x-csrf-token'];
  const tokenFromCookie = req.cookies['XSRF-TOKEN'];

  if (!tokenFromHeader || tokenFromHeader !== tokenFromCookie) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  next();
}
```

#### 프론트엔드 (Axios)
```typescript
// lib/api/client.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  // 쿠키에서 CSRF 토큰 읽기
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

  if (csrfToken && config.method !== 'get') {
    config.headers['X-CSRF-Token'] = csrfToken;
  }

  return config;
});
```

### 4.4 XSS 방어

#### 입력 검증 및 이스케이핑
```typescript
// validation/sanitize.ts
import sanitizeHtml from 'sanitize-html';

export function sanitizeInput(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [], // HTML 태그 모두 제거
    allowedAttributes: {}
  });
}

export function sanitizeRichText(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li'],
    allowedAttributes: {
      a: ['href', 'target']
    },
    allowedSchemes: ['http', 'https', 'mailto']
  });
}

// DTO에서 사용
import { Transform } from 'class-transformer';

export class CreatePostDto {
  @Transform(({ value }) => sanitizeInput(value))
  title: string;

  @Transform(({ value }) => sanitizeRichText(value))
  content: string;
}
```

#### Content Security Policy (CSP)
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: https: blob:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://api.watersafety.org;
      frame-ancestors 'none';
    `.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  }
};
```

### 4.5 SQL Injection 방어

#### Prisma (Safe by default)
```typescript
// ✅ 안전 - Prisma는 자동으로 파라미터화
const user = await prisma.user.findUnique({
  where: { email: userInput }
});

// ⚠️ Raw Query 사용 시 주의
const users = await prisma.$queryRaw`
  SELECT * FROM users WHERE email = ${userInput}
`; // 파라미터화되어 안전

// ❌ 위험 - 절대 사용 금지
const query = `SELECT * FROM users WHERE email = '${userInput}'`;
```

## 5. 파일 업로드 보안

### 5.1 파일 검증
```typescript
// validation/file.validator.ts
import * as fileType from 'file-type';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf'
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function validateFile(buffer: Buffer, filename: string) {
  // 파일 크기 확인
  if (buffer.length > MAX_FILE_SIZE) {
    throw new Error('파일 크기가 너무 큽니다 (최대 10MB)');
  }

  // MIME 타입 확인 (파일 시그니처 검사)
  const type = await fileType.fromBuffer(buffer);

  if (!type || !ALLOWED_MIME_TYPES.includes(type.mime)) {
    throw new Error('허용되지 않는 파일 형식입니다');
  }

  // 파일명 검증 (경로 순회 공격 방지)
  if (filename.includes('..') || filename.includes('/')) {
    throw new Error('잘못된 파일명입니다');
  }

  return true;
}
```

### 5.2 안전한 파일명 생성
```typescript
// utils/filename.ts
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export function generateSafeFilename(originalFilename: string): string {
  const ext = path.extname(originalFilename).toLowerCase();
  const timestamp = Date.now();
  const uuid = uuidv4();

  return `${timestamp}-${uuid}${ext}`;
}

// 예시: '1705320000-abc123-def456.pdf'
```

## 6. 감사 로그 (Audit Logging)

### 6.1 로깅 전략
```typescript
// logging/audit-log.service.ts
interface AuditLog {
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  oldValues?: any;
  newValues?: any;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

@Injectable()
export class AuditLogService {
  constructor(private prisma: PrismaService) {}

  async log(data: AuditLog) {
    await this.prisma.auditLog.create({
      data: {
        ...data,
        oldValues: data.oldValues ? JSON.stringify(data.oldValues) : null,
        newValues: data.newValues ? JSON.stringify(data.newValues) : null
      }
    });
  }

  // 중요 작업 로깅
  async logCertificationIssue(userId: string, certId: string, req: Request) {
    await this.log({
      userId,
      action: 'CERTIFICATION_ISSUED',
      entityType: 'certification',
      entityId: certId,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      timestamp: new Date()
    });
  }
}
```

### 6.2 로그 보관 및 분석
```typescript
// 로그 보관 정책
const logRetention = {
  auditLogs: '7년',        // 법적 요구사항
  accessLogs: '1년',
  errorLogs: '90일',
  debugLogs: '30일'
};

// 로그 검색 및 분석
export class AuditLogAnalyzer {
  async findSuspiciousActivity(userId: string) {
    // 비정상적 로그인 시도
    const failedLogins = await prisma.auditLog.count({
      where: {
        userId,
        action: 'LOGIN_FAILED',
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // 24시간
        }
      }
    });

    if (failedLogins > 10) {
      await this.alertSecurity(`Suspicious activity for user ${userId}`);
    }
  }
}
```

## 7. HTTPS 및 TLS

### 7.1 SSL/TLS 설정
```nginx
# nginx.conf
server {
    listen 443 ssl http2;
    server_name watersafety.org;

    ssl_certificate /etc/letsencrypt/live/watersafety.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/watersafety.org/privkey.pem;

    # TLS 버전
    ssl_protocols TLSv1.2 TLSv1.3;

    # 암호화 스위트
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers on;

    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 8. 보안 체크리스트

### 8.1 배포 전 확인사항
- [ ] 모든 민감 정보는 환경 변수로 관리
- [ ] HTTPS 강제 적용
- [ ] JWT 시크릿 키 안전하게 관리
- [ ] Rate limiting 설정
- [ ] CORS 정책 확인
- [ ] CSRF 보호 활성화
- [ ] XSS 방어 (CSP 헤더)
- [ ] SQL Injection 방어 (ORM 사용)
- [ ] 파일 업로드 검증
- [ ] 에러 메시지에 민감 정보 노출 금지
- [ ] 보안 헤더 설정
- [ ] 로그에 비밀번호 등 민감 정보 기록 금지

### 8.2 정기 보안 점검
- 월간: 의존성 취약점 검사 (`npm audit`)
- 분기별: 침투 테스트
- 연간: 보안 감사

## 9. 침해 사고 대응

### 9.1 사고 대응 절차
1. **탐지**: 비정상 활동 감지
2. **격리**: 영향 범위 제한
3. **분석**: 원인 파악
4. **복구**: 서비스 정상화
5. **사후 조치**: 재발 방지

### 9.2 알림 시스템
```typescript
// security/alert.service.ts
export class SecurityAlertService {
  async sendAlert(severity: 'low' | 'medium' | 'high' | 'critical', message: string) {
    // 이메일, SMS, Slack 등으로 알림
    await this.emailService.send({
      to: 'security@watersafety.org',
      subject: `[${severity.toUpperCase()}] Security Alert`,
      body: message
    });

    if (severity === 'critical') {
      await this.smsService.send({
        to: '+82-10-xxxx-xxxx',
        message: `Critical security alert: ${message}`
      });
    }
  }
}
```

## 10. 컴플라이언스

### 10.1 개인정보보호법 준수
- 동의 관리 시스템
- 개인정보 처리방침 게시
- 개인정보 열람/정정/삭제 요청 처리
- 개인정보 유출 시 신고 의무

### 10.2 전자금융거래법 준수
- 거래 내역 5년 보관
- 접근 기록 관리
- 보안 인증서 적용

## 11. 다음 단계

- [07_deployment_architecture.md](./07_deployment_architecture.md): 보안이 적용된 배포 아키텍처
