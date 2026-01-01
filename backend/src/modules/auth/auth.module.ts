import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (): JwtModuleOptions => {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          throw new Error('JWT_SECRET 환경변수가 설정되지 않았습니다. 서버를 시작하려면 JWT_SECRET을 설정해주세요.');
        }
        // JWT_EXPIRES_IN이 숫자면 초 단위, 문자열이면 그대로 사용 (예: '24h')
        const expiresInEnv = process.env.JWT_EXPIRES_IN || '86400';
        const expiresIn = /^\d+$/.test(expiresInEnv) ? parseInt(expiresInEnv, 10) : expiresInEnv;
        return {
          secret,
          signOptions: {
            expiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // JWT 인증을 글로벌 가드로 적용
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // 역할 기반 접근 제어 가드
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    Reflector,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
