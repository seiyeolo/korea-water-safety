import { PrismaClient } from '@prisma/client';

// PrismaClient 싱글톤 인스턴스 생성
// 개발 환경에서는 hot reload 시 연결이 누적되지 않도록 global 객체 사용
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// 데이터베이스 연결 테스트 함수
export async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// 애플리케이션 종료 시 연결 해제
export async function disconnect() {
  await prisma.$disconnect();
}
