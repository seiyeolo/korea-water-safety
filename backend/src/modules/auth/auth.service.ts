import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: string; // userId
  email: string;
  role: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  refreshTokenExpiry?: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Access Token 생성 (24시간)
   */
  generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: 86400, // 24 hours in seconds
    });
  }

  /**
   * Refresh Token 생성 (7일)
   */
  generateRefreshToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: 604800, // 7 days in seconds
    });
  }

  /**
   * JWT 토큰 검증
   */
  verifyToken(token: string): JwtPayload {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Access + Refresh 토큰과 함께 사용자 정보 반환
   */
  generateAuthResponse(user: any): AuthTokens {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    const expiresIn = 24 * 60 * 60; // Access Token: 24시간 (초 단위)
    const refreshTokenExpiry = 7 * 24 * 60 * 60; // Refresh Token: 7일 (초 단위)

    return {
      accessToken,
      refreshToken,
      expiresIn,
      refreshTokenExpiry,
    };
  }
}
