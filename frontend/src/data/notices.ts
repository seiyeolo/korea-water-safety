import { Notice } from '@/types/notice';

export const notices: Notice[] = [
  {
    id: 'notice-001',
    title: '2024년 1분기 수상안전요원 양성과정 모집 안내',
    category: 'education',
    content: `
<h2>2024년 1분기 수상안전요원 양성과정을 다음과 같이 모집합니다.</h2>

<h3>모집 개요</h3>
<ul>
  <li><strong>모집 인원:</strong> 총 150명 (회차당 30명)</li>
  <li><strong>교육 기간:</strong> 3일 (09:00 ~ 18:00)</li>
  <li><strong>교육 비용:</strong> 150,000원</li>
  <li><strong>교육 장소:</strong> 대전 본부 교육장</li>
</ul>

<h3>교육 일정</h3>
<table border="1" cellpadding="8" cellspacing="0">
  <thead>
    <tr>
      <th>회차</th>
      <th>교육 기간</th>
      <th>접수 기간</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1차</td>
      <td>2024.11.15 ~ 11.17</td>
      <td>2024.11.01 ~ 11.10</td>
    </tr>
    <tr>
      <td>2차</td>
      <td>2024.12.10 ~ 12.12</td>
      <td>2024.11.25 ~ 12.05</td>
    </tr>
    <tr>
      <td>3차</td>
      <td>2025.01.20 ~ 01.22</td>
      <td>2025.01.05 ~ 01.15</td>
    </tr>
  </tbody>
</table>

<h3>지원 자격</h3>
<ul>
  <li>만 18세 이상</li>
  <li>100m 이상 수영 가능자</li>
  <li>신체 건강한 자</li>
</ul>

<h3>신청 방법</h3>
<p>홈페이지 또는 전화(02-1234-5678)로 신청 가능합니다.</p>

<h3>제출 서류</h3>
<ul>
  <li>신청서 1부</li>
  <li>증명사진 2매 (3x4cm)</li>
  <li>신분증 사본</li>
</ul>

<p>많은 관심과 참여 부탁드립니다.</p>
    `,
    author: '교육운영팀',
    createdAt: '2024-10-25',
    views: 1247,
    isPinned: true,
    attachments: [
      {
        id: 'att-001',
        name: '수상안전요원_양성과정_신청서.pdf',
        size: 245000,
        url: '/attachments/lifeguard-application.pdf',
      },
    ],
  },
  {
    id: 'notice-002',
    title: '여름 성수기 대비 수상안전 특별 캠페인 실시',
    category: 'event',
    content: `
<h2>여름 성수기를 맞아 수상안전 특별 캠페인을 실시합니다.</h2>

<h3>캠페인 개요</h3>
<p>2024년 여름철 물놀이 안전사고 예방을 위한 전국 단위 캠페인을 진행합니다.</p>

<h3>주요 내용</h3>
<ul>
  <li><strong>기간:</strong> 2024년 6월 ~ 8월</li>
  <li><strong>장소:</strong> 전국 주요 해수욕장 및 워터파크</li>
  <li><strong>대상:</strong> 일반 시민 및 관광객</li>
</ul>

<h3>캠페인 활동</h3>
<ol>
  <li>수상안전 교육 부스 운영</li>
  <li>심폐소생술(CPR) 체험</li>
  <li>구명조끼 착용 캠페인</li>
  <li>안전 수칙 홍보물 배포</li>
</ol>

<h3>참여 방법</h3>
<p>자원봉사자를 상시 모집하고 있습니다. 참여를 원하시는 분은 협회로 연락주시기 바랍니다.</p>

<p>안전한 여름 물놀이 문화 조성에 많은 관심 부탁드립니다.</p>
    `,
    author: '안전관리본부',
    createdAt: '2024-10-20',
    views: 856,
    isPinned: false,
  },
  {
    id: 'notice-003',
    title: '수상안전강사 자격증 갱신 안내',
    category: 'certification',
    content: `
<h2>수상안전강사 자격증 갱신 제도에 대해 안내드립니다.</h2>

<h3>갱신 대상</h3>
<p>2019년에 수상안전강사 자격증을 취득한 회원님들은 2024년 12월 31일까지 갱신이 필요합니다.</p>

<h3>갱신 요건</h3>
<ul>
  <li>최근 3년간 교육 활동 실적 20시간 이상</li>
  <li>보수 교육 이수 (8시간)</li>
  <li>자격증 갱신 수수료 납부 (50,000원)</li>
</ul>

<h3>보수 교육 일정</h3>
<ul>
  <li>1차: 2024년 11월 16일 (토) 09:00 ~ 18:00</li>
  <li>2차: 2024년 12월 07일 (토) 09:00 ~ 18:00</li>
  <li>3차: 2024년 12월 21일 (토) 09:00 ~ 18:00</li>
</ul>

<h3>신청 방법</h3>
<p>협회 홈페이지에서 온라인 신청 또는 전화 신청 가능합니다.</p>

<h3>주의 사항</h3>
<p>갱신 기한 내 미갱신 시 자격이 정지되며, 재취득을 위해서는 재교육이 필요합니다.</p>
    `,
    author: '자격관리본부',
    createdAt: '2024-10-18',
    views: 1543,
    isPinned: true,
    attachments: [
      {
        id: 'att-002',
        name: '자격증_갱신_신청서.hwp',
        size: 125000,
        url: '/attachments/renewal-form.hwp',
      },
      {
        id: 'att-003',
        name: '보수교육_안내문.pdf',
        size: 180000,
        url: '/attachments/renewal-guide.pdf',
      },
    ],
  },
  {
    id: 'notice-004',
    title: '2024년 하반기 워터파크 안전점검 실시 결과',
    category: 'general',
    content: `
<h2>2024년 하반기 전국 워터파크 안전점검 결과를 발표합니다.</h2>

<h3>점검 개요</h3>
<ul>
  <li><strong>점검 기간:</strong> 2024년 9월 1일 ~ 9월 30일</li>
  <li><strong>점검 대상:</strong> 전국 50개 워터파크</li>
  <li><strong>점검 항목:</strong> 시설 안전, 구조 장비, 안전요원 배치 등</li>
</ul>

<h3>점검 결과</h3>
<p>전체 50개소 중:</p>
<ul>
  <li>우수: 35개소 (70%)</li>
  <li>양호: 12개소 (24%)</li>
  <li>보통: 3개소 (6%)</li>
</ul>

<h3>주요 개선 사항</h3>
<ol>
  <li>일부 시설의 구조 장비 보강 필요</li>
  <li>안전요원 추가 배치 권고</li>
  <li>안전 수칙 안내판 보완</li>
</ol>

<h3>향후 계획</h3>
<p>개선이 필요한 시설에 대해서는 재점검을 실시하고, 우수 시설에는 인증 마크를 부여할 예정입니다.</p>
    `,
    author: '안전관리본부',
    createdAt: '2024-10-15',
    views: 645,
    isPinned: false,
  },
  {
    id: 'notice-005',
    title: '해양레저 안전관리사 과정 신규 개설 안내',
    category: 'education',
    content: `
<h2>해양레저 안전관리사 과정을 신규로 개설합니다.</h2>

<h3>과정 소개</h3>
<p>해양레저 활동의 안전을 관리하는 전문가를 양성하는 과정입니다.</p>

<h3>교육 정보</h3>
<ul>
  <li><strong>교육 기간:</strong> 4일</li>
  <li><strong>교육 비용:</strong> 220,000원</li>
  <li><strong>정원:</strong> 25명</li>
  <li><strong>교육 장소:</strong> 대전 본부 + 현장 실습</li>
</ul>

<h3>1차 교육 일정</h3>
<p>2024년 11월 25일(월) ~ 11월 28일(목)</p>

<h3>지원 자격</h3>
<ul>
  <li>만 20세 이상</li>
  <li>수영 가능자</li>
  <li>해양레저 활동 경험자 우대</li>
</ul>

<h3>수료 후 혜택</h3>
<ul>
  <li>해양레저 안전관리사 자격증 발급</li>
  <li>해양경찰청 인증</li>
  <li>취업 추천서 발급</li>
</ul>
    `,
    author: '교육운영팀',
    createdAt: '2024-10-12',
    views: 892,
    isPinned: false,
  },
  {
    id: 'notice-006',
    title: '협회 창립 25주년 기념행사 개최',
    category: 'event',
    content: `
<h2>한국수상안전협회 창립 25주년 기념행사를 개최합니다.</h2>

<h3>행사 개요</h3>
<ul>
  <li><strong>일시:</strong> 2024년 11월 30일(토) 14:00</li>
  <li><strong>장소:</strong> 대전 본부 대강당</li>
  <li><strong>대상:</strong> 회원, 강사, 교육 이수자, 유관 기관</li>
</ul>

<h3>행사 프로그램</h3>
<ol>
  <li>개회식 및 회장 인사말</li>
  <li>25년 발자취 영상 상영</li>
  <li>유공자 표창</li>
  <li>안전 문화 확산 세미나</li>
  <li>리셉션 및 네트워킹</li>
</ol>

<h3>참석 신청</h3>
<p>참석을 원하시는 분은 11월 20일까지 협회로 신청해주시기 바랍니다.</p>

<h3>문의</h3>
<p>총무행정본부 (02-1234-5678)</p>
    `,
    author: '총무행정본부',
    createdAt: '2024-10-10',
    views: 1125,
    isPinned: false,
  },
  {
    id: 'notice-007',
    title: '동계 수상안전 특별과정 수강생 모집',
    category: 'education',
    content: `
<h2>동계 수상안전 특별과정 수강생을 모집합니다.</h2>

<h3>과정 소개</h3>
<p>겨울철 빙판 사고 및 저온 환경에서의 수상안전 관리 능력을 배양하는 특별 과정입니다.</p>

<h3>교육 정보</h3>
<ul>
  <li><strong>교육 기간:</strong> 2일</li>
  <li><strong>교육 비용:</strong> 100,000원</li>
  <li><strong>정원:</strong> 20명</li>
  <li><strong>지원 자격:</strong> 수상안전요원 자격증 보유자</li>
</ul>

<h3>교육 일정</h3>
<ul>
  <li>1차: 2024년 12월 20일 ~ 21일</li>
  <li>2차: 2025년 1월 25일 ~ 26일</li>
</ul>

<h3>준비물</h3>
<p>방한복, 장갑, 방한화 등 개인 방한 장비</p>
    `,
    author: '교육운영팀',
    createdAt: '2024-10-08',
    views: 534,
    isPinned: false,
  },
  {
    id: 'notice-008',
    title: '온라인 교육 시스템 업그레이드 완료',
    category: 'general',
    content: `
<h2>협회 온라인 교육 시스템이 업그레이드되었습니다.</h2>

<h3>주요 개선 사항</h3>
<ul>
  <li>화면 UI/UX 개선</li>
  <li>모바일 반응형 지원 강화</li>
  <li>강의 재생 속도 조절 기능 추가</li>
  <li>북마크 및 메모 기능 추가</li>
  <li>수료증 자동 발급 시스템</li>
</ul>

<h3>이용 방법</h3>
<p>기존 아이디와 비밀번호로 로그인하시면 됩니다.</p>

<h3>문의</h3>
<p>시스템 이용 관련 문의는 교육운영팀(02-1234-5678)으로 연락주시기 바랍니다.</p>
    `,
    author: '교육운영팀',
    createdAt: '2024-10-05',
    views: 723,
    isPinned: false,
  },
  {
    id: 'notice-009',
    title: '어린이 수상안전 지도자 과정 추가 모집',
    category: 'education',
    content: `
<h2>어린이 수상안전 지도자 과정 추가 모집을 실시합니다.</h2>

<h3>모집 배경</h3>
<p>높은 관심과 조기 마감으로 인해 추가 과정을 개설하게 되었습니다.</p>

<h3>교육 정보</h3>
<ul>
  <li><strong>교육 기간:</strong> 2일</li>
  <li><strong>교육 비용:</strong> 120,000원</li>
  <li><strong>추가 모집 인원:</strong> 30명</li>
  <li><strong>교육 일정:</strong> 2024년 12월 14일 ~ 15일</li>
</ul>

<h3>대상</h3>
<p>유치원, 초등학교 교사 및 어린이 교육 관련 종사자</p>

<h3>신청 기간</h3>
<p>2024년 11월 1일 ~ 11월 30일</p>
    `,
    author: '교육운영팀',
    createdAt: '2024-10-03',
    views: 678,
    isPinned: false,
  },
  {
    id: 'notice-010',
    title: '2024년 수상안전 우수기관 선정 결과',
    category: 'general',
    content: `
<h2>2024년도 수상안전 우수기관 선정 결과를 발표합니다.</h2>

<h3>선정 개요</h3>
<p>수상안전 관리가 우수한 기관을 선정하여 표창합니다.</p>

<h3>선정 기관</h3>
<ul>
  <li><strong>대상:</strong> 부산 해운대 해수욕장</li>
  <li><strong>최우수상:</strong> 캐리비안베이, 오션월드</li>
  <li><strong>우수상:</strong> 송도 센트럴파크, 여의도 한강공원 수영장 외 3곳</li>
</ul>

<h3>시상식</h3>
<p>11월 30일 협회 창립 기념행사에서 진행됩니다.</p>

<h3>선정 기준</h3>
<ul>
  <li>안전 시설 및 장비 관리</li>
  <li>안전요원 배치 및 교육</li>
  <li>사고 예방 활동</li>
  <li>이용객 만족도</li>
</ul>
    `,
    author: '안전관리본부',
    createdAt: '2024-10-01',
    views: 891,
    isPinned: false,
  },
  {
    id: 'notice-011',
    title: 'CPR 및 응급처치 무료 교육 실시',
    category: 'event',
    content: `
<h2>지역 주민을 대상으로 CPR 및 응급처치 무료 교육을 실시합니다.</h2>

<h3>교육 개요</h3>
<ul>
  <li><strong>대상:</strong> 대전 지역 주민 누구나</li>
  <li><strong>교육비:</strong> 무료</li>
  <li><strong>인원:</strong> 회차당 40명</li>
  <li><strong>소요 시간:</strong> 3시간</li>
</ul>

<h3>교육 일정</h3>
<ul>
  <li>11월 9일(토) 10:00 ~ 13:00</li>
  <li>11월 16일(토) 10:00 ~ 13:00</li>
  <li>11월 23일(토) 10:00 ~ 13:00</li>
</ul>

<h3>교육 내용</h3>
<ul>
  <li>심폐소생술(CPR)</li>
  <li>자동제세동기(AED) 사용법</li>
  <li>기도폐쇄 처치</li>
  <li>지혈 및 상처 관리</li>
</ul>

<h3>신청 방법</h3>
<p>전화(02-1234-5678) 또는 홈페이지 신청</p>
    `,
    author: '교육운영팀',
    createdAt: '2024-09-28',
    views: 1456,
    isPinned: false,
  },
  {
    id: 'notice-012',
    title: '2025년 교육 일정 사전 공지',
    category: 'education',
    content: `
<h2>2025년도 교육 일정을 사전 안내드립니다.</h2>

<h3>수상안전요원 양성과정</h3>
<p>매월 2회 개설 예정 (총 24회)</p>

<h3>수상안전강사 자격과정</h3>
<p>분기별 1회 개설 (총 4회)</p>

<h3>해양레저 안전관리사</h3>
<p>격월 1회 개설 (총 6회)</p>

<h3>특별과정</h3>
<ul>
  <li>동계 수상안전: 1월, 2월</li>
  <li>어린이 안전지도자: 분기별 1회</li>
  <li>CPR 전문과정: 매월 2회</li>
</ul>

<h3>신청 안내</h3>
<p>상세 일정은 12월 중 홈페이지에 공지됩니다.</p>
    `,
    author: '교육운영팀',
    createdAt: '2024-09-25',
    views: 1089,
    isPinned: false,
  },
];

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    general: '일반',
    education: '교육',
    certification: '자격증',
    event: '행사',
  };
  return labels[category] || category;
};
