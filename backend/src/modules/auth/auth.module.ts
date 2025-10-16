import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: {
        expiresIn: (process.env.JWT_EXPIRES_IN || '24h') as any,
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
