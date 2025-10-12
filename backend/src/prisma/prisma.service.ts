import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database connected successfully');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('👋 Database disconnected');
  }

  // 헬퍼 메서드: 트랜잭션 안전 삭제
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'development') {
      const tablenames = [
        'attachments',
        'posts',
        'certificates',
        'registrations',
        'education_programs',
        'users',
      ];

      for (const tablename of tablenames) {
        await this.$executeRawUnsafe(
          `TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE;`,
        );
      }
    }
  }
}
