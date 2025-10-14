import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 - 정규식 패턴 지원
  const corsPatterns = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
    : ['http://localhost:3000', 'https://frontend-.*-seiyeolo-6781s-projects.vercel.app'];

  // 패턴을 정규식으로 변환
  const allowedOrigins = corsPatterns.map(pattern => {
    // 와일드카드 패턴 (.*) 을 정규식으로 변환
    if (pattern.includes('.*')) {
      // .* 를 임시 플레이스홀더로 치환 후 . 을 이스케이프
      let regexPattern = pattern.replace(/\.\*/g, '__WILDCARD__');  // .* → __WILDCARD__
      regexPattern = regexPattern.replace(/\./g, '\\.');  // . → \.
      regexPattern = regexPattern.replace(/__WILDCARD__/g, '.*');  // __WILDCARD__ → .*
      return new RegExp(`^${regexPattern}$`);
    }
    return pattern;
  });

  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // origin이 undefined인 경우 (같은 도메인 요청) 허용
      if (!origin) return callback(null, true);

      // 패턴 매칭 확인
      const isAllowed = allowedOrigins.some(allowed => {
        if (typeof allowed === 'string') {
          return allowed === origin;
        }
        // RegExp인 경우
        return allowed.test(origin);
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 전역 Validation Pipe 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성 제거
      forbidNonWhitelisted: true, // 정의되지 않은 속성이 있으면 요청 거부
      transform: true, // 자동으로 타입 변환
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // API 경로 prefix 설정
  app.setGlobalPrefix('api');

  // 포트 설정
  const port = process.env.PORT || 4000;

  await app.listen(port);

  console.log(`🚀 Server is running on: http://localhost:${port}`);
  console.log(`📖 API Documentation: http://localhost:${port}/api`);
  console.log(`🌐 CORS enabled for patterns: ${corsPatterns.join(', ')}`);
}

bootstrap();
