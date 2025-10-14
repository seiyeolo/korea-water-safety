import { PrismaClient, PostCategory, PostStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...\n');

  // 기존 데이터 확인 - 이미 데이터가 있으면 스킵
  const existingUsers = await prisma.user.count();
  if (existingUsers > 0) {
    console.log('✅ Database already has data, skipping seed...\n');
    return;
  }

  console.log('🧹 Database is empty, starting seed...\n');

  // 1. 테스트 관리자 계정 생성
  console.log('👤 Creating admin account...');
  const admin = await prisma.user.create({
    data: {
      email: 'admin@watersafety.org',
      password: '$2a$10$YourHashedPasswordHere', // 실제로는 bcrypt로 해시된 비밀번호 사용
      name: '관리자',
      phone: '042-123-4567',
      birthDate: new Date('1980-01-01'),
      address: '대전광역시 동구 동부로 168',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });
  console.log(`✅ Admin created: ${admin.email}\n`);

  // 테스트 일반 사용자 생성
  console.log('👥 Creating test users...');
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'instructor@watersafety.org',
        password: '$2a$10$YourHashedPasswordHere',
        name: '김강사',
        phone: '010-1234-5678',
        birthDate: new Date('1985-03-15'),
        address: '대전광역시 중구 대종로 373',
        role: 'INSTRUCTOR',
        status: 'ACTIVE',
      },
    }),
    prisma.user.create({
      data: {
        email: 'user1@example.com',
        password: '$2a$10$YourHashedPasswordHere',
        name: '홍길동',
        phone: '010-2345-6789',
        birthDate: new Date('1990-05-20'),
        address: '서울특별시 강남구 테헤란로 123',
        role: 'USER',
        status: 'ACTIVE',
      },
    }),
    prisma.user.create({
      data: {
        email: 'user2@example.com',
        password: '$2a$10$YourHashedPasswordHere',
        name: '이영희',
        phone: '010-3456-7890',
        birthDate: new Date('1995-08-10'),
        address: '부산광역시 해운대구 마린시티 456',
        role: 'USER',
        status: 'ACTIVE',
      },
    }),
  ]);
  console.log(`✅ ${users.length} test users created\n`);

  // 2. 교육 프로그램 10개 생성
  console.log('📚 Creating education programs...');
  const programs = [
    {
      title: '생존수영 지도자 양성과정',
      description: '생존수영 교육을 위한 전문 지도자 양성 프로그램',
      content: `<h3>교육 목표</h3>
<p>수상안전 교육의 전문성을 갖춘 생존수영 지도자를 양성합니다.</p>
<h3>교육 내용</h3>
<ul>
<li>생존수영 이론 및 실기</li>
<li>수상안전 사고 예방 교육</li>
<li>응급처치 및 심폐소생술</li>
<li>교수법 및 실습</li>
</ul>`,
      instructorName: '김강사',
      duration: 40,
      capacity: 30,
      price: 350000,
      location: '한국수상안전협회 교육장',
      address: '대전광역시 동구 동부로 168',
      thumbnailUrl: '/images/programs/survival-swimming.jpg',
      startDate: new Date('2025-11-15'),
      endDate: new Date('2025-11-19'),
      recruitStartDate: new Date('2025-10-20'),
      recruitEndDate: new Date('2025-11-10'),
      isActive: true,
    },
    {
      title: '수상인명구조사 자격과정',
      description: '국가공인 수상인명구조사 자격증 취득 과정',
      content: `<h3>자격 개요</h3>
<p>수상에서 발생하는 안전사고 예방 및 인명구조 전문가를 양성합니다.</p>
<h3>자격증 정보</h3>
<ul>
<li>국가공인 민간자격증</li>
<li>자격번호: 2015-0001</li>
<li>유효기간: 5년</li>
</ul>`,
      instructorName: '박교수',
      duration: 80,
      capacity: 25,
      price: 600000,
      location: '대전 실내수영장',
      address: '대전광역시 유성구 대학로 99',
      thumbnailUrl: '/images/programs/lifeguard.jpg',
      startDate: new Date('2025-12-01'),
      endDate: new Date('2025-12-15'),
      recruitStartDate: new Date('2025-11-01'),
      recruitEndDate: new Date('2025-11-25'),
      isActive: true,
    },
    {
      title: '수상레저 안전교육 지도자과정',
      description: '수상레저 활동의 안전교육을 담당할 지도자 양성',
      content: `<h3>과정 소개</h3>
<p>수상레저 활동의 안전한 이용을 위한 전문 지도자를 양성합니다.</p>
<h3>주요 교육내용</h3>
<ul>
<li>수상레저 기구 조종법</li>
<li>수상안전 법규</li>
<li>사고 예방 및 대처법</li>
<li>날씨와 해양 환경 이해</li>
</ul>`,
      instructorName: '최코치',
      duration: 32,
      capacity: 20,
      price: 280000,
      location: '충남 서해안 해양교육장',
      address: '충청남도 보령시 해수욕장로 456',
      thumbnailUrl: '/images/programs/water-leisure.jpg',
      startDate: new Date('2025-11-20'),
      endDate: new Date('2025-11-23'),
      recruitStartDate: new Date('2025-10-25'),
      recruitEndDate: new Date('2025-11-15'),
      isActive: true,
    },
    {
      title: '어린이 수상안전 교육과정',
      description: '초등학생 대상 수상안전 기초 교육',
      content: `<h3>대상</h3>
<p>초등학교 3~6학년 학생</p>
<h3>교육 내용</h3>
<ul>
<li>물놀이 안전수칙</li>
<li>구명조끼 착용법</li>
<li>간단한 자기구조법</li>
<li>위험 상황 대처법</li>
</ul>`,
      instructorName: '이선생',
      duration: 16,
      capacity: 40,
      price: 80000,
      location: '대전 시립수영장',
      address: '대전광역시 서구 둔산로 123',
      thumbnailUrl: '/images/programs/kids-safety.jpg',
      startDate: new Date('2025-11-10'),
      endDate: new Date('2025-11-11'),
      recruitStartDate: new Date('2025-10-15'),
      recruitEndDate: new Date('2025-11-05'),
      isActive: true,
    },
    {
      title: '심폐소생술(CPR) 자격과정',
      description: '응급상황 대처를 위한 심폐소생술 전문 교육',
      content: `<h3>자격증</h3>
<p>대한심폐소생협회 인증 CPR 자격증</p>
<h3>실습 내용</h3>
<ul>
<li>성인 심폐소생술</li>
<li>소아 심폐소생술</li>
<li>자동제세동기(AED) 사용법</li>
<li>기도폐쇄 처치법</li>
</ul>`,
      instructorName: '정의사',
      duration: 8,
      capacity: 30,
      price: 120000,
      location: '한국수상안전협회 교육장',
      address: '대전광역시 동구 동부로 168',
      thumbnailUrl: '/images/programs/cpr.jpg',
      startDate: new Date('2025-11-05'),
      endDate: new Date('2025-11-05'),
      recruitStartDate: new Date('2025-10-10'),
      recruitEndDate: new Date('2025-11-01'),
      isActive: true,
    },
    {
      title: '수영장 안전관리자 양성과정',
      description: '수영장 시설의 안전관리 전문가 양성',
      content: `<h3>과정 목표</h3>
<p>수영장 시설의 안전한 운영과 관리를 위한 전문 인력을 양성합니다.</p>
<h3>교육 과정</h3>
<ul>
<li>수영장 시설 관리</li>
<li>수질 관리 및 위생</li>
<li>안전사고 예방 및 대응</li>
<li>관련 법규 및 제도</li>
</ul>`,
      instructorName: '강시설',
      duration: 24,
      capacity: 25,
      price: 200000,
      location: '한국수상안전협회 교육장',
      address: '대전광역시 동구 동부로 168',
      thumbnailUrl: '/images/programs/pool-manager.jpg',
      startDate: new Date('2025-12-10'),
      endDate: new Date('2025-12-12'),
      recruitStartDate: new Date('2025-11-10'),
      recruitEndDate: new Date('2025-12-05'),
      isActive: true,
    },
    {
      title: '스노클링 지도자 자격과정',
      description: '스노클링 안전 교육 및 지도자 양성',
      content: `<h3>자격 정보</h3>
<p>한국수상안전협회 공인 스노클링 지도자 자격증</p>
<h3>교육 내용</h3>
<ul>
<li>스노클링 장비 사용법</li>
<li>해양 환경 이해</li>
<li>안전 수칙 및 사고 예방</li>
<li>교수법 및 실습</li>
</ul>`,
      instructorName: '오다이버',
      duration: 20,
      capacity: 15,
      price: 250000,
      location: '제주 해양교육센터',
      address: '제주특별자치도 서귀포시 해안로 789',
      thumbnailUrl: '/images/programs/snorkeling.jpg',
      startDate: new Date('2025-12-20'),
      endDate: new Date('2025-12-22'),
      recruitStartDate: new Date('2025-11-20'),
      recruitEndDate: new Date('2025-12-15'),
      isActive: true,
    },
    {
      title: '카약 안전교육 지도자과정',
      description: '카약 활동의 안전 교육 전문가 양성',
      content: `<h3>과정 특징</h3>
<p>카약 활동의 안전한 지도를 위한 전문 역량을 배양합니다.</p>
<h3>실습 과정</h3>
<ul>
<li>카약 조종 기술</li>
<li>급류 안전 기법</li>
<li>구조 기술</li>
<li>기상 및 수로 판단</li>
</ul>`,
      instructorName: '임카약',
      duration: 28,
      capacity: 20,
      price: 320000,
      location: '북한강 카약 교육장',
      address: '강원도 춘천시 북한강변로 234',
      thumbnailUrl: '/images/programs/kayak.jpg',
      startDate: new Date('2026-01-10'),
      endDate: new Date('2026-01-13'),
      recruitStartDate: new Date('2025-12-10'),
      recruitEndDate: new Date('2026-01-05'),
      isActive: true,
    },
    {
      title: '수상안전 응급처치 전문과정',
      description: '수상 환경 특화 응급처치 전문 교육',
      content: `<h3>교육 개요</h3>
<p>수상 환경에서 발생하는 응급상황에 대한 전문적 대처 능력을 배양합니다.</p>
<h3>주요 과목</h3>
<ul>
<li>수상사고 응급처치</li>
<li>저체온증 처치</li>
<li>외상 처치</li>
<li>환자 이송 기법</li>
</ul>`,
      instructorName: '한응급',
      duration: 16,
      capacity: 30,
      price: 180000,
      location: '한국수상안전협회 교육장',
      address: '대전광역시 동구 동부로 168',
      thumbnailUrl: '/images/programs/emergency.jpg',
      startDate: new Date('2025-11-25'),
      endDate: new Date('2025-11-26'),
      recruitStartDate: new Date('2025-10-25'),
      recruitEndDate: new Date('2025-11-20'),
      isActive: true,
    },
    {
      title: '수상안전 강사 보수교육',
      description: '기존 자격 소지자 대상 보수 교육',
      content: `<h3>대상</h3>
<p>수상안전 관련 자격증 소지자 (갱신 대상자)</p>
<h3>교육 내용</h3>
<ul>
<li>최신 안전 기법</li>
<li>법규 변경사항</li>
<li>사고 사례 분석</li>
<li>실기 재평가</li>
</ul>`,
      instructorName: '송강사',
      duration: 8,
      capacity: 50,
      price: 100000,
      location: '한국수상안전협회 교육장',
      address: '대전광역시 동구 동부로 168',
      thumbnailUrl: '/images/programs/refresher.jpg',
      startDate: new Date('2025-12-05'),
      endDate: new Date('2025-12-05'),
      recruitStartDate: new Date('2025-11-05'),
      recruitEndDate: new Date('2025-11-30'),
      isActive: true,
    },
  ];

  const createdPrograms = await Promise.all(
    programs.map((program) => prisma.educationProgram.create({ data: program }))
  );
  console.log(`✅ ${createdPrograms.length} education programs created\n`);

  // 3. 공지사항 20개 생성
  console.log('📢 Creating notice posts...');
  const posts = [
    {
      title: '2025년 생존수영 지도자 양성과정 모집 공고',
      content: `<p>한국수상안전협회에서 2025년 생존수영 지도자 양성과정 교육생을 모집합니다.</p>
<h3>모집 대상</h3>
<ul>
<li>생존수영 교육에 관심 있는 분</li>
<li>수영 기본 기량 보유자</li>
<li>만 19세 이상</li>
</ul>
<h3>접수 기간</h3>
<p>2025년 10월 20일 ~ 11월 10일</p>
<h3>문의</h3>
<p>전화: 042-123-4567<br>이메일: info@watersafety.org</p>`,
      category: PostCategory.NOTICE,
      status: PostStatus.PUBLISHED,
      authorId: admin.id,
      views: 245,
      isPinned: true,
      publishedAt: new Date('2025-10-15'),
    },
    {
      title: '2025년 하반기 수상인명구조사 자격시험 일정 안내',
      content: `<p>2025년 하반기 수상인명구조사 자격시험 일정을 안내드립니다.</p>
<h3>시험 일정</h3>
<ul>
<li>필기시험: 2025년 11월 30일</li>
<li>실기시험: 2025년 12월 14일</li>
</ul>
<h3>응시 자격</h3>
<p>협회 지정 교육과정 이수자</p>`,
      category: PostCategory.NOTICE,
      status: PostStatus.PUBLISHED,
      authorId: admin.id,
      views: 189,
      isPinned: true,
      publishedAt: new Date('2025-10-10'),
    },
    {
      title: '한국수상안전협회 제25주년 창립기념식 개최',
      content: `<p>한국수상안전협회가 창립 25주년을 맞아 기념식을 개최합니다.</p>
<h3>행사 정보</h3>
<ul>
<li>일시: 2025년 11월 1일 오후 2시</li>
<li>장소: 대전 컨벤션센터 그랜드볼룸</li>
<li>내용: 유공자 포상, 기념 공연</li>
</ul>
<p>많은 참여 부탁드립니다.</p>`,
      category: PostCategory.EVENT,
      status: PostStatus.PUBLISHED,
      authorId: admin.id,
      views: 312,
      isPinned: false,
      publishedAt: new Date('2025-10-05'),
    },
    {
      title: '수상안전 봉사단 모집 안내',
      content: `<p>여름철 물놀이 안전을 위한 자원봉사자를 모집합니다.</p>
<h3>활동 기간</h3>
<p>2026년 6월 ~ 8월 (주말 위주)</p>
<h3>활동 내용</h3>
<ul>
<li>해수욕장 안전 계도</li>
<li>응급처치 지원</li>
<li>안전 교육 보조</li>
</ul>`,
      category: PostCategory.NOTICE,
      status: PostStatus.PUBLISHED,
      authorId: users[0].id,
      views: 156,
      isPinned: false,
      publishedAt: new Date('2025-10-01'),
    },
    {
      title: '2025 국제 수상안전 심포지엄 참가 안내',
      content: `<p>국제 수상안전 심포지엄에 협회 대표단이 참가합니다.</p>
<h3>행사 정보</h3>
<ul>
<li>일시: 2025년 11월 20일 ~ 22일</li>
<li>장소: 부산 벡스코</li>
<li>주제: 미래 수상안전 기술과 교육</li>
</ul>`,
      category: PostCategory.NEWS,
      status: PostStatus.PUBLISHED,
      authorId: admin.id,
      views: 98,
      isPinned: false,
      publishedAt: new Date('2025-09-28'),
    },
    {
      title: '여름철 물놀이 안전수칙 안내',
      content: `<p>안전한 여름 물놀이를 위한 필수 안전수칙을 안내드립니다.</p>
<h3>기본 안전수칙</h3>
<ul>
<li>준비운동은 필수입니다</li>
<li>구명조끼를 착용하세요</li>
<li>음주 후 물놀이 금지</li>
<li>깊은 곳은 피하세요</li>
<li>어린이는 보호자와 함께</li>
</ul>
<p>안전한 물놀이 되세요!</p>`,
      category: PostCategory.NOTICE,
      status: PostStatus.PUBLISHED,
      authorId: users[0].id,
      views: 523,
      isPinned: false,
      publishedAt: new Date('2025-09-25'),
    },
    {
      title: '심폐소생술(CPR) 무료 교육 실시',
      content: `<p>지역 주민을 대상으로 무료 CPR 교육을 실시합니다.</p>
<h3>교육 일정</h3>
<p>매주 토요일 오전 10시 ~ 12시</p>
<h3>신청 방법</h3>
<p>홈페이지 또는 전화 신청 (선착순 20명)</p>`,
      category: PostCategory.EVENT,
      status: PostStatus.PUBLISHED,
      authorId: users[0].id,
      views: 267,
      isPinned: false,
      publishedAt: new Date('2025-09-20'),
    },
    {
      title: '수상안전 교육 교재 개정판 발간',
      content: `<p>최신 안전 기법을 반영한 교육 교재 개정판이 발간되었습니다.</p>
<h3>주요 개정 내용</h3>
<ul>
<li>최신 응급처치 가이드라인 반영</li>
<li>신규 교육 과정 추가</li>
<li>사진 및 삽화 전면 교체</li>
</ul>
<p>협회 사무실에서 구입 가능합니다.</p>`,
      category: PostCategory.NEWS,
      status: PostStatus.PUBLISHED,
      authorId: admin.id,
      views: 142,
      isPinned: false,
      publishedAt: new Date('2025-09-15'),
    },
    {
      title: '추석 연휴 협회 휴무 안내',
      content: `<p>추석 연휴 기간 협회 휴무를 안내드립니다.</p>
<h3>휴무 기간</h3>
<p>2025년 10월 3일(금) ~ 10월 7일(화)</p>
<h3>업무 재개</h3>
<p>2025년 10월 8일(수) 정상 업무</p>
<p>즐거운 명절 보내세요!</p>`,
      category: PostCategory.NOTICE,
      status: PostStatus.PUBLISHED,
      authorId: admin.id,
      views: 178,
      isPinned: false,
      publishedAt: new Date('2025-09-10'),
    },
    {
      title: '수상레저 안전교육 온라인 강좌 오픈',
      content: `<p>시간과 장소의 제약 없이 학습할 수 있는 온라인 강좌를 오픈했습니다.</p>
<h3>강좌 특징</h3>
<ul>
<li>24시간 언제든 수강 가능</li>
<li>PC, 모바일 모두 지원</li>
<li>수료증 발급</li>
</ul>
<p>회원가입 후 무료로 수강하실 수 있습니다.</p>`,
      category: PostCategory.NEWS,
      status: PostStatus.PUBLISHED,
      authorId: users[1].id,
      views: 421,
      isPinned: false,
      publishedAt: new Date('2025-09-05'),
    },
    {
      title: '자격증 재발급 신청 방법 안내',
      content: `<p>자격증 분실 또는 훼손 시 재발급 신청 방법을 안내드립니다.</p>
<h3>신청 방법</h3>
<ol>
<li>홈페이지 로그인</li>
<li>마이페이지 > 자격증 관리</li>
<li>재발급 신청 버튼 클릭</li>
<li>재발급 사유 입력 및 수수료 결제</li>
</ol>
<h3>처리 기간</h3>
<p>신청 후 영업일 기준 7일</p>`,
      category: PostCategory.FAQ,
      status: PostStatus.PUBLISHED,
      authorId: admin.id,
      views: 234,
      isPinned: false,
      publishedAt: new Date('2025-09-01'),
    },
    {
      title: '협회 홈페이지 리뉴얼 완료',
      content: `<p>더욱 편리해진 새로운 홈페이지를 만나보세요!</p>
<h3>주요 개선사항</h3>
<ul>
<li>반응형 디자인 적용 (모바일 최적화)</li>
<li>교육 신청 프로세스 간소화</li>
<li>자격증 조회 기능 추가</li>
<li>사용자 경험 개선</li>
</ul>
<p>앞으로도 더 나은 서비스를 제공하겠습니다.</p>`,
      category: PostCategory.NEWS,
      status: PostStatus.PUBLISHED,
      authorId: admin.id,
      views: 567,
      isPinned: false,
      publishedAt: new Date('2025-08-28'),
    },
    {
      title: '수상안전 사진 공모전 개최',
      content: `<p>수상안전을 주제로 한 사진 공모전을 개최합니다.</p>
<h3>응모 자격</h3>
<p>제한 없음 (누구나 참여 가능)</p>
<h3>시상 내역</h3>
<ul>
<li>대상 1명: 상금 100만원</li>
<li>최우수상 2명: 상금 50만원</li>
<li>우수상 3명: 상금 30만원</li>
</ul>
<h3>접수 기간</h3>
<p>2025년 10월 1일 ~ 10월 31일</p>`,
      category: PostCategory.EVENT,
      status: PostStatus.PUBLISHED,
      authorId: admin.id,
      views: 389,
      isPinned: false,
      publishedAt: new Date('2025-08-25'),
    },
    {
      title: '겨울철 수상안전 주의사항',
      content: `<p>겨울철 수상활동 시 특별히 주의해야 할 사항들을 안내드립니다.</p>
<h3>주요 주의사항</h3>
<ul>
<li>저체온증 예방 (보온 장비 필수)</li>
<li>얼음 위 활동 금지</li>
<li>기상 정보 확인</li>
<li>동반자와 함께 활동</li>
</ul>`,
      category: PostCategory.NOTICE,
      status: PostStatus.PUBLISHED,
      authorId: users[0].id,
      views: 198,
      isPinned: false,
      publishedAt: new Date('2025-08-20'),
    },
    {
      title: '2025년 정기총회 개최 안내',
      content: `<p>2025년도 정기총회를 다음과 같이 개최합니다.</p>
<h3>일시 및 장소</h3>
<ul>
<li>일시: 2025년 12월 20일 오후 3시</li>
<li>장소: 한국수상안전협회 대강당</li>
</ul>
<h3>안건</h3>
<ol>
<li>2025년도 사업실적 및 결산 보고</li>
<li>2026년도 사업계획 및 예산안 승인</li>
<li>임원 선출</li>
</ol>`,
      category: PostCategory.NOTICE,
      status: PostStatus.PUBLISHED,
      authorId: admin.id,
      views: 156,
      isPinned: false,
      publishedAt: new Date('2025-08-15'),
    },
    {
      title: '수상안전 캠페인 참여 기관 모집',
      content: `<p>수상안전 문화 확산을 위한 캠페인에 함께할 기관을 모집합니다.</p>
<h3>캠페인 내용</h3>
<ul>
<li>수상안전 포스터 배포</li>
<li>찾아가는 안전 교육</li>
<li>온라인 안전 캠페인</li>
</ul>
<h3>참여 혜택</h3>
<p>캠페인 물품 무상 제공, 교육 강사 파견</p>`,
      category: PostCategory.NOTICE,
      status: PostStatus.PUBLISHED,
      authorId: users[1].id,
      views: 223,
      isPinned: false,
      publishedAt: new Date('2025-08-10'),
    },
    {
      title: '교육비 할인 이벤트 진행',
      content: `<p>10월 한 달간 교육비 특별 할인 이벤트를 진행합니다.</p>
<h3>할인 내용</h3>
<ul>
<li>모든 교육과정 15% 할인</li>
<li>2개 이상 동시 신청 시 20% 할인</li>
<li>재수강자 30% 할인</li>
</ul>
<h3>기간</h3>
<p>2025년 10월 1일 ~ 10월 31일</p>`,
      category: PostCategory.EVENT,
      status: PostStatus.PUBLISHED,
      authorId: admin.id,
      views: 445,
      isPinned: false,
      publishedAt: new Date('2025-08-05'),
    },
    {
      title: '수상안전 블로그 이벤트',
      content: `<p>협회 공식 블로그 오픈 기념 이벤트를 진행합니다.</p>
<h3>참여 방법</h3>
<ol>
<li>협회 블로그 이웃 추가</li>
<li>이벤트 게시글에 댓글 작성</li>
<li>SNS 공유</li>
</ol>
<h3>경품</h3>
<p>추첨을 통해 50명에게 스타벅스 기프티콘 증정</p>`,
      category: PostCategory.EVENT,
      status: PostStatus.PUBLISHED,
      authorId: users[2].id,
      views: 512,
      isPinned: false,
      publishedAt: new Date('2025-07-30'),
    },
    {
      title: '협회 소식지 구독 안내',
      content: `<p>한국수상안전협회 월간 소식지를 무료로 구독하세요.</p>
<h3>소식지 내용</h3>
<ul>
<li>협회 주요 소식</li>
<li>교육 일정 안내</li>
<li>수상안전 정보</li>
<li>회원 활동 소개</li>
</ul>
<h3>구독 신청</h3>
<p>홈페이지에서 이메일 주소 등록</p>`,
      category: PostCategory.NEWS,
      status: PostStatus.PUBLISHED,
      authorId: admin.id,
      views: 187,
      isPinned: false,
      publishedAt: new Date('2025-07-25'),
    },
    {
      title: '자주 묻는 질문(FAQ) 업데이트',
      content: `<p>회원 여러분께서 자주 문의하시는 내용을 FAQ로 정리했습니다.</p>
<h3>주요 카테고리</h3>
<ul>
<li>교육 신청 관련</li>
<li>자격증 관련</li>
<li>회원 가입 및 탈퇴</li>
<li>결제 및 환불</li>
</ul>
<p>FAQ 페이지에서 확인하세요!</p>`,
      category: PostCategory.FAQ,
      status: PostStatus.PUBLISHED,
      authorId: admin.id,
      views: 276,
      isPinned: false,
      publishedAt: new Date('2025-07-20'),
    },
  ];

  const createdPosts = await Promise.all(
    posts.map((post) => prisma.post.create({ data: post }))
  );
  console.log(`✅ ${createdPosts.length} notice posts created\n`);

  // 일부 게시글에 첨부파일 추가
  console.log('📎 Adding attachments to some posts...');
  const attachments = [
    {
      postId: createdPosts[0].id,
      filename: '2025-survival-swimming-recruitment.pdf',
      originalFilename: '생존수영지도자모집공고.pdf',
      mimeType: 'application/pdf',
      size: 1024000,
      url: '/uploads/2025-survival-swimming-recruitment.pdf',
    },
    {
      postId: createdPosts[1].id,
      filename: 'lifeguard-exam-schedule-2025.pdf',
      originalFilename: '수상인명구조사시험일정.pdf',
      mimeType: 'application/pdf',
      size: 512000,
      url: '/uploads/lifeguard-exam-schedule-2025.pdf',
    },
    {
      postId: createdPosts[2].id,
      filename: 'anniversary-invitation.pdf',
      originalFilename: '창립기념식초청장.pdf',
      mimeType: 'application/pdf',
      size: 768000,
      url: '/uploads/anniversary-invitation.pdf',
    },
  ];

  await Promise.all(
    attachments.map((attachment) => prisma.attachment.create({ data: attachment }))
  );
  console.log(`✅ ${attachments.length} attachments added\n`);

  // 통계 출력
  const stats = {
    users: await prisma.user.count(),
    programs: await prisma.educationProgram.count(),
    posts: await prisma.post.count(),
    attachments: await prisma.attachment.count(),
  };

  console.log('📊 Seeding completed successfully!\n');
  console.log('=================================');
  console.log(`👥 Users: ${stats.users}`);
  console.log(`📚 Education Programs: ${stats.programs}`);
  console.log(`📢 Posts: ${stats.posts}`);
  console.log(`📎 Attachments: ${stats.attachments}`);
  console.log('=================================\n');

  console.log('🔑 Test Accounts:');
  console.log('Admin: admin@watersafety.org');
  console.log('Instructor: instructor@watersafety.org');
  console.log('User 1: user1@example.com');
  console.log('User 2: user2@example.com');
  console.log('\n⚠️  Default password needs to be hashed with bcrypt');
  console.log('    Use: await bcrypt.hash("your-password", 10)\n');
}

main()
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
