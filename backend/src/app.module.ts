import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import { CertificatesModule } from './certificates/certificates.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // 환경 변수 설정
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Rate Limiting 설정 (기본: 1분에 60회 요청 허용)
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1초
        limit: 3, // 초당 3회
      },
      {
        name: 'medium',
        ttl: 10000, // 10초
        limit: 20, // 10초당 20회
      },
      {
        name: 'long',
        ttl: 60000, // 1분
        limit: 100, // 분당 100회
      },
    ]),
    // Prisma 모듈
    PrismaModule,
    // Auth 모듈 (JWT, Passport)
    AuthModule,
    // Feature 모듈들
    ProgramsModule,
    PostsModule,
    UsersModule,
    CertificatesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 글로벌 Rate Limiting 가드
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
