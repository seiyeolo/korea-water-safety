import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Welcome to Water Safety Association API! 🌊';
  }

  async getHealthStatus() {
    try {
      // 데이터베이스 연결 확인
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: 'connected',
        version: '1.0.0',
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getDatabaseStats() {
    try {
      const [userCount, programCount, postCount, certificateCount] =
        await Promise.all([
          this.prisma.user.count(),
          this.prisma.educationProgram.count(),
          this.prisma.post.count(),
          this.prisma.certificate.count(),
        ]);

      return {
        users: userCount,
        programs: programCount,
        posts: postCount,
        certificates: certificateCount,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to get database stats: ${message}`);
    }
  }
}
