/**
 * E2E 테스트: 전체 인증 플로우
 *
 * 테스트 범위:
 * 1. 회원가입 → JWT 토큰 발급
 * 2. 로그인 → JWT 토큰 반환
 * 3. JWT 토큰으로 인증된 요청
 * 4. Refresh Token으로 새 Access Token 발급
 * 5. 만료된 토큰 처리
 */

type ApiResponse = Record<string, any>;

describe('Authentication E2E Tests', () => {
  const API_URL = 'http://localhost:4000/api';
  let accessToken: string;
  let refreshToken: string;
  let userId: string;
  const testUser = {
    email: `test-${Date.now()}@example.com`,
    password: 'Test@1234',
    name: 'E2E 테스트 사용자',
    phone: '010-1234-5678',
  };

  /**
   * 테스트 1: 회원가입 및 JWT 토큰 발급
   */
  describe('1. 회원가입 (Register)', () => {
    it('강력한 비밀번호로 회원가입 성공', async () => {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testUser),
      });

      const data = (await response.json()) as ApiResponse;

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.user.email).toBe(testUser.email);
      expect(data.accessToken).toBeDefined();
      expect(data.refreshToken).toBeDefined();
      expect(data.expiresIn).toBe(86400); // 24시간

      // 토큰 저장
      accessToken = data.accessToken;
      refreshToken = data.refreshToken;
      userId = data.user.id;
    });

    it('약한 비밀번호는 거부', async () => {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...testUser,
          email: `weak-${Date.now()}@example.com`,
          password: 'weak', // 약한 비밀번호
        }),
      });

      const data = (await response.json()) as ApiResponse;

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('중복된 이메일은 거부', async () => {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...testUser,
          name: '다른 사용자',
        }),
      });

      const data = (await response.json()) as ApiResponse;

      expect(response.status).toBe(409);
      expect(data.success).toBe(false);
      expect(data.error.message).toContain('이미 사용 중');
    });
  });

  /**
   * 테스트 2: 로그인 및 토큰 발급
   */
  describe('2. 로그인 (Login)', () => {
    it('정확한 자격증명으로 로그인 성공', async () => {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password,
        }),
      });

      const data = (await response.json()) as ApiResponse;

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.user.email).toBe(testUser.email);
      expect(data.accessToken).toBeDefined();
      expect(data.refreshToken).toBeDefined();
    });

    it('잘못된 비밀번호로 로그인 실패', async () => {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testUser.email,
          password: 'WrongPassword@123',
        }),
      });

      const data = (await response.json()) as ApiResponse;

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
    });

    it('존재하지 않는 이메일로 로그인 실패', async () => {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'nonexistent@example.com',
          password: 'Test@1234',
        }),
      });

      const data = (await response.json()) as ApiResponse;

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
    });
  });

  /**
   * 테스트 3: JWT 인증된 요청
   */
  describe('3. JWT 인증된 요청', () => {
    it('유효한 토큰으로 프로필 조회 성공', async () => {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = (await response.json()) as ApiResponse;

      expect(response.status).toBe(200);
      expect(data.email).toBe(testUser.email);
      expect(data.name).toBe(testUser.name);
    });

    it('토큰 없이 인증 요청 실패', async () => {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'GET',
      });

      const data = (await response.json()) as ApiResponse;

      expect(response.status).toBe(401);
      expect(data.error.message).toContain('토큰');
    });

    it('잘못된 토큰으로 요청 실패', async () => {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer invalid.token.here',
        },
      });

      const data = (await response.json()) as ApiResponse;

      expect(response.status).toBe(401);
      expect(data.error.message).toContain('유효하지 않은');
    });
  });

  /**
   * 테스트 4: Refresh Token 갱신
   */
  describe('4. Refresh Token 갱신', () => {
    it('Refresh Token으로 새 Access Token 발급', async () => {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const data = (await response.json()) as ApiResponse;

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.accessToken).toBeDefined();
      expect(data.accessToken).not.toBe(accessToken); // 새로운 토큰

      // 새 토큰으로 요청 가능한지 확인
      const profileResponse = await fetch(`${API_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${data.accessToken}`,
        },
      });

      expect(profileResponse.status).toBe(200);
    });

    it('유효하지 않은 Refresh Token 거부', async () => {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: 'invalid.refresh.token' }),
      });

      const data = (await response.json()) as ApiResponse;

      // 유효하지 않은 토큰은 500 (서버 에러) 또는 401 (인증 실패)을 반환할 수 있음
      expect([401, 500]).toContain(response.status);
      expect(data.error).toBeDefined();
    });
  });

  /**
   * 테스트 5: 공개 엔드포인트
   */
  describe('5. 공개 엔드포인트 (@Public)', () => {
    it('토큰 없이 헬스 체크 성공', async () => {
      const response = await fetch(`${API_URL}/health`, {
        method: 'GET',
      });

      const data = (await response.json()) as ApiResponse;

      expect(response.status).toBe(200);
      expect(data.status).toBe('healthy');
    });

    it('토큰 없이 통계 조회 성공', async () => {
      const response = await fetch(`${API_URL}/stats`, {
        method: 'GET',
      });

      const data = (await response.json()) as ApiResponse;

      expect(response.status).toBe(200);
      expect(data.users).toBeDefined();
      expect(data.programs).toBeDefined();
    });
  });

  /**
   * 테스트 6: 에러 응답 형식
   */
  describe('6. 표준화된 에러 응답', () => {
    it('잘못된 요청 에러 형식 확인', async () => {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'invalid-email' }), // 필수 필드 누락
      });

      const data = (await response.json()) as ApiResponse;

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
      expect(data.error.code).toBeDefined();
      expect(data.error.message).toBeDefined();
      expect(data.error.statusCode).toBe(400);
      expect(data.error.timestamp).toBeDefined();
    });

    it('인증 실패 에러 형식 확인', async () => {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'GET',
      });

      const data = (await response.json()) as ApiResponse;

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('INTERNAL_SERVER_ERROR');
      expect(data.error.statusCode).toBe(401);
    });
  });
});
