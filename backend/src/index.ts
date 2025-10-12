import { prisma, testConnection, disconnect } from './lib/prisma';

async function main() {
  console.log('🚀 Starting Water Safety Association Backend');
  
  // 데이터베이스 연결 테스트
  const isConnected = await testConnection();
  
  if (!isConnected) {
    console.error('Failed to connect to database. Please check your DATABASE_URL in .env file');
    process.exit(1);
  }

  // 간단한 쿼리 예시
  try {
    const userCount = await prisma.user.count();
    const programCount = await prisma.educationProgram.count();
    const postCount = await prisma.post.count();
    
    console.log('\n📊 Database Statistics:');
    console.log(`- Users: ${userCount}`);
    console.log(`- Education Programs: ${programCount}`);
    console.log(`- Posts: ${postCount}`);
  } catch (error) {
    console.error('Error querying database:', error);
  }
}

// 프로그램 실행
main()
  .catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await disconnect();
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n👋 Shutting down gracefully...');
  await disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n👋 Shutting down gracefully...');
  await disconnect();
  process.exit(0);
});
