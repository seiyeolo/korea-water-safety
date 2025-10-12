import { Program } from '@/types/program';

export const programs: Program[] = [
  {
    id: 'lifeguard-basic',
    title: '수상안전요원 양성과정',
    category: 'lifeguard',
    level: 'beginner',
    description:
      '수영장, 워터파크, 해수욕장 등에서 안전요원으로 활동하기 위한 기본 자격증 취득 과정입니다. 수상안전 이론, 구조 기술, 응급처치 등을 체계적으로 학습합니다.',
    duration: 3,
    price: 150000,
    capacity: 30,
    instructor: '김태영 강사',
    location: '대전 본부 교육장',
    features: [
      '수상안전요원 자격증 발급',
      '실습 위주의 교육',
      '소규모 그룹 교육',
      '무료 교재 제공',
    ],
    requirements: [
      '만 18세 이상',
      '100m 이상 수영 가능자',
      '신체 건강한 자',
      '신분증 지참',
    ],
    schedule: [
      {
        startDate: '2024-11-15',
        endDate: '2024-11-17',
        time: '09:00 - 18:00',
      },
      {
        startDate: '2024-12-10',
        endDate: '2024-12-12',
        time: '09:00 - 18:00',
      },
    ],
    curriculum: [
      {
        day: 1,
        title: '수상안전 이론 및 기초',
        topics: [
          '수상안전 개론',
          '사고 예방 및 대응',
          '수영 능력 평가',
          '기본 구조 기술',
        ],
      },
      {
        day: 2,
        title: '구조 기술 실습',
        topics: [
          '익수자 구조법',
          '구조 장비 사용법',
          '단체 구조 훈련',
          '야간 구조 대응',
        ],
      },
      {
        day: 3,
        title: '응급처치 및 평가',
        topics: ['심폐소생술(CPR)', '응급처치 실습', '종합 평가', '자격증 발급'],
      },
    ],
    isPopular: true,
    tags: ['자격증', '초급', '인기', '실습'],
  },
  {
    id: 'instructor-course',
    title: '수상안전강사 자격과정',
    category: 'instructor',
    level: 'advanced',
    description:
      '수상안전 교육을 담당하는 전문 강사 양성 과정입니다. 수상안전요원 자격 보유자를 대상으로 교육 이론과 실무 능력을 배양합니다.',
    duration: 5,
    price: 300000,
    capacity: 20,
    instructor: '이미선 수석강사',
    location: '대전 본부 교육장',
    features: [
      '수상안전강사 자격증 발급',
      '교육 실습 기회 제공',
      '취업 연계 지원',
      '무료 교재 및 교구 제공',
    ],
    requirements: [
      '수상안전요원 자격증 보유',
      '만 21세 이상',
      '2년 이상 현장 경력',
      '추천서 1부',
    ],
    schedule: [
      {
        startDate: '2024-11-20',
        endDate: '2024-11-24',
        time: '09:00 - 18:00',
      },
      {
        startDate: '2025-01-15',
        endDate: '2025-01-19',
        time: '09:00 - 18:00',
      },
    ],
    curriculum: [
      {
        day: 1,
        title: '교육학 이론',
        topics: [
          '성인 교육학 개론',
          '교수법 이론',
          '학습자 특성 분석',
          '교육 과정 설계',
        ],
      },
      {
        day: 2,
        title: '수상안전 전문 지식',
        topics: [
          '수상안전 심화 이론',
          '사고 사례 분석',
          '법규 및 제도',
          '위기 관리',
        ],
      },
      {
        day: 3,
        title: '교육 실습 준비',
        topics: [
          '강의안 작성법',
          '교구 활용법',
          '시연 준비',
          '평가 기준 이해',
        ],
      },
      {
        day: 4,
        title: '모의 강의 실습',
        topics: [
          '개인별 모의 강의',
          '피드백 세션',
          '개선 및 재실습',
          '평가',
        ],
      },
      {
        day: 5,
        title: '종합 평가 및 인증',
        topics: ['최종 시연', '필기 평가', '실기 평가', '자격증 발급'],
      },
    ],
    isPopular: true,
    tags: ['자격증', '고급', '강사', '전문'],
  },
  {
    id: 'marine-safety',
    title: '해양레저 안전관리사',
    category: 'marine',
    level: 'intermediate',
    description:
      '해양레저 시설 및 활동의 안전을 관리하는 전문가 양성 과정입니다. 요트, 카약, 스쿠버다이빙 등 다양한 해양레저 분야의 안전 관리를 학습합니다.',
    duration: 4,
    price: 220000,
    capacity: 25,
    instructor: '박준호 강사',
    location: '대전 본부 교육장 + 현장실습',
    features: [
      '해양레저 안전관리사 자격증',
      '현장 실습 포함',
      '해양경찰청 인증',
      '취업 추천서 발급',
    ],
    requirements: [
      '만 20세 이상',
      '수영 가능자',
      '해양레저 활동 경험자 우대',
      '신원조회 동의',
    ],
    schedule: [
      {
        startDate: '2024-11-25',
        endDate: '2024-11-28',
        time: '09:00 - 18:00',
      },
      {
        startDate: '2024-12-16',
        endDate: '2024-12-19',
        time: '09:00 - 18:00',
      },
    ],
    curriculum: [
      {
        day: 1,
        title: '해양레저 개론',
        topics: [
          '해양레저 산업 이해',
          '관련 법규 및 제도',
          '안전관리 체계',
          '기상 및 해상 상황',
        ],
      },
      {
        day: 2,
        title: '종목별 안전관리',
        topics: [
          '수상레저기구 안전',
          '스쿠버다이빙 안전',
          '서핑 및 윈드서핑',
          '요트 및 보트',
        ],
      },
      {
        day: 3,
        title: '위기 대응 및 구조',
        topics: [
          '해상 사고 대응',
          '구조 장비 활용',
          '응급처치',
          '통신 및 신고 체계',
        ],
      },
      {
        day: 4,
        title: '현장 실습 및 평가',
        topics: ['해양레저 시설 방문', '현장 안전점검', '종합 평가', '자격증 발급'],
      },
    ],
    tags: ['자격증', '중급', '해양', '레저'],
  },
  {
    id: 'cpr-emergency',
    title: '응급처치 및 CPR 전문과정',
    category: 'special',
    level: 'beginner',
    description:
      '수상안전뿐만 아니라 일상생활에서도 활용 가능한 응급처치와 심폐소생술을 집중적으로 학습하는 과정입니다.',
    duration: 1,
    price: 50000,
    capacity: 40,
    instructor: '최은정 강사',
    location: '대전 본부 교육장',
    features: [
      '응급처치 수료증 발급',
      '소방청 인증 교육',
      '1일 완성 과정',
      '개별 실습 키트 제공',
    ],
    requirements: ['만 16세 이상', '누구나 참여 가능'],
    schedule: [
      {
        startDate: '2024-11-08',
        endDate: '2024-11-08',
        time: '09:00 - 17:00',
      },
      {
        startDate: '2024-11-22',
        endDate: '2024-11-22',
        time: '09:00 - 17:00',
      },
      {
        startDate: '2024-12-06',
        endDate: '2024-12-06',
        time: '09:00 - 17:00',
      },
    ],
    curriculum: [
      {
        day: 1,
        title: '응급처치 및 CPR',
        topics: [
          '응급처치 개론',
          '심폐소생술(CPR) 이론',
          '자동제세동기(AED) 사용법',
          '기도폐쇄 처치',
          '지혈 및 상처 관리',
          '골절 및 염좌 처치',
          '실습 평가',
        ],
      },
    ],
    tags: ['수료증', '초급', '1일', 'CPR'],
  },
  {
    id: 'winter-safety',
    title: '동계 수상안전 특별과정',
    category: 'special',
    level: 'intermediate',
    description:
      '겨울철 빙판 사고 및 저온 환경에서의 수상안전 관리를 학습하는 특별 과정입니다.',
    duration: 2,
    price: 100000,
    capacity: 20,
    instructor: '정우진 강사',
    location: '대전 본부 교육장',
    features: [
      '동계 안전 수료증',
      '저온 환경 실습',
      '특수 장비 체험',
      '계절 한정 과정',
    ],
    requirements: [
      '수상안전요원 자격증 보유',
      '만 18세 이상',
      '방한 장비 개인 준비',
    ],
    schedule: [
      {
        startDate: '2024-12-20',
        endDate: '2024-12-21',
        time: '09:00 - 18:00',
      },
      {
        startDate: '2025-01-25',
        endDate: '2025-01-26',
        time: '09:00 - 18:00',
      },
    ],
    curriculum: [
      {
        day: 1,
        title: '동계 수상안전 이론',
        topics: [
          '저온 환경의 이해',
          '빙판 사고 예방',
          '저체온증 대응',
          '동계 장비 관리',
        ],
      },
      {
        day: 2,
        title: '실습 및 평가',
        topics: [
          '빙판 구조 훈련',
          '저온 환경 응급처치',
          '특수 장비 사용',
          '종합 평가',
        ],
      },
    ],
    tags: ['수료증', '중급', '특별', '계절'],
  },
  {
    id: 'kids-safety',
    title: '어린이 수상안전 지도자과정',
    category: 'special',
    level: 'beginner',
    description:
      '어린이 대상 수상안전 교육을 담당하는 지도자 양성 과정입니다. 유치원, 초등학교 교사 및 관련 종사자에게 적합합니다.',
    duration: 2,
    price: 120000,
    capacity: 30,
    instructor: '한지훈 강사',
    location: '대전 본부 교육장',
    features: [
      '어린이 안전지도자 수료증',
      '교육 자료 제공',
      '현장 적용 가이드',
      '재교육 할인 혜택',
    ],
    requirements: [
      '만 20세 이상',
      '교육 관련 종사자 우대',
      '아동학대 예방교육 이수자',
    ],
    schedule: [
      {
        startDate: '2024-11-30',
        endDate: '2024-12-01',
        time: '09:00 - 17:00',
      },
      {
        startDate: '2024-12-14',
        endDate: '2024-12-15',
        time: '09:00 - 17:00',
      },
    ],
    curriculum: [
      {
        day: 1,
        title: '어린이 수상안전 교육법',
        topics: [
          '아동 발달 단계별 특성',
          '어린이 수상안전 교육 방법',
          '놀이 중심 안전 교육',
          '교구 및 교재 활용',
        ],
      },
      {
        day: 2,
        title: '실습 및 평가',
        topics: [
          '모의 수업 실습',
          '상황별 대응 훈련',
          '부모 교육 가이드',
          '수료증 발급',
        ],
      },
    ],
    tags: ['수료증', '초급', '어린이', '교육'],
  },
];

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    lifeguard: '수상안전요원',
    instructor: '수상안전강사',
    marine: '해양레저',
    special: '특별과정',
  };
  return labels[category] || category;
};

export const getLevelLabel = (level: string): string => {
  const labels: Record<string, string> = {
    beginner: '초급',
    intermediate: '중급',
    advanced: '고급',
  };
  return labels[level] || level;
};
