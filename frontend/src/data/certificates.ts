import { Certificate, ExamSchedule, FAQ } from '@/types/certificate';

export const certificates: Certificate[] = [
  // 국가자격증
  {
    id: 'national-1',
    name: '1급 수상구조사',
    type: 'national',
    requirements: [
      '2급 수상구조사 자격 취득',
      '2년 이상 실무 경력',
      '만 21세 이상',
    ],
    exam: ['필기시험', '실기시험', '면접'],
    issuer: '해양경찰청',
    validity: '5년',
  },
  {
    id: 'national-2',
    name: '2급 수상구조사',
    type: 'national',
    requirements: ['수영 능력 인증 (200m 이상)', '만 18세 이상', '신체 건강한 자'],
    exam: ['필기시험', '실기시험'],
    issuer: '해양경찰청',
    validity: '5년',
  },
  // 민간등록자격증
  {
    id: 'private-1',
    name: '수상안전요원',
    type: 'private',
    requirements: ['만 18세 이상', '100m 이상 수영 가능', '신체 건강한 자'],
    exam: ['필기시험', '실기시험'],
    issuer: '한국수상안전협회',
    validity: '3년',
    education: {
      duration: '3일',
      hours: '24시간',
    },
  },
  {
    id: 'private-2',
    name: '수상안전강사',
    type: 'private',
    requirements: [
      '수상안전요원 자격 보유',
      '만 21세 이상',
      '2년 이상 현장 경력',
    ],
    exam: ['필기시험', '실기시험', '모의강의'],
    issuer: '한국수상안전협회',
    validity: '3년',
    education: {
      duration: '5일',
      hours: '40시간',
    },
  },
];

export const examSchedules: ExamSchedule[] = [
  {
    id: 'exam-2024-1',
    round: 1,
    examDate: '2024-03-15',
    applicationStart: '2024-02-01',
    applicationEnd: '2024-02-29',
    resultDate: '2024-03-29',
  },
  {
    id: 'exam-2024-2',
    round: 2,
    examDate: '2024-06-14',
    applicationStart: '2024-05-01',
    applicationEnd: '2024-05-31',
    resultDate: '2024-06-28',
  },
  {
    id: 'exam-2024-3',
    round: 3,
    examDate: '2024-09-13',
    applicationStart: '2024-08-01',
    applicationEnd: '2024-08-31',
    resultDate: '2024-09-27',
  },
  {
    id: 'exam-2024-4',
    round: 4,
    examDate: '2024-12-13',
    applicationStart: '2024-11-01',
    applicationEnd: '2024-11-30',
    resultDate: '2024-12-27',
  },
];

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: '자격증 유효기간이 지나면 어떻게 하나요?',
    answer:
      '자격증 유효기간 만료 전 갱신 교육을 이수하셔야 합니다. 만료 후에는 재취득 과정을 거쳐야 하므로, 유효기간 3개월 전부터 갱신 절차를 진행하시는 것을 권장합니다.',
  },
  {
    id: 'faq-2',
    question: '국가자격증과 민간자격증의 차이는 무엇인가요?',
    answer:
      '국가자격증은 해양경찰청에서 발급하는 공인 자격증으로 법적 효력이 있으며, 민간자격증은 한국직업능력연구원에 등록된 자격증으로 민간 부문에서 활용 가능합니다. 두 자격증 모두 수상안전 분야에서 전문성을 인정받습니다.',
  },
  {
    id: 'faq-3',
    question: '시험에 불합격하면 재응시가 가능한가요?',
    answer:
      '네, 가능합니다. 불합격 시 다음 회차 시험에 재응시할 수 있으며, 응시 횟수에는 제한이 없습니다. 단, 매 회차마다 새롭게 접수해야 합니다.',
  },
  {
    id: 'faq-4',
    question: '자격증 발급까지 얼마나 걸리나요?',
    answer:
      '합격 발표 후 약 2주 이내에 자격증이 발급됩니다. 온라인으로 먼저 확인 가능하며, 실물 자격증은 등기우편으로 발송됩니다.',
  },
  {
    id: 'faq-5',
    question: '자격증을 분실했는데 재발급이 가능한가요?',
    answer:
      '네, 재발급이 가능합니다. 협회 홈페이지 또는 방문 신청을 통해 재발급 신청을 하실 수 있으며, 재발급 수수료는 10,000원입니다. 신청 후 1주일 이내에 발급됩니다.',
  },
];
