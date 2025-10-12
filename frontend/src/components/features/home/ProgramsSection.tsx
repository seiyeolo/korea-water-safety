import Link from 'next/link';

const programs = [
  {
    id: 1,
    title: '수상안전요원 양성과정',
    category: '기초',
    duration: '3일',
    price: '150,000원',
    description:
      '수상안전의 기본을 배우는 입문 과정입니다. 수영 능력, 인명구조 기술, 응급처치 등 실무에 필요한 핵심 역량을 교육합니다.',
    features: ['수영 기술 향상', '인명구조 실습', 'CPR 자격증', '이론 + 실습'],
    nextSession: '2024년 3월 15일',
    capacity: '20명',
    image: '/images/programs/lifeguard.jpg',
  },
  {
    id: 2,
    title: '수상안전강사 자격과정',
    category: '전문',
    duration: '5일',
    price: '300,000원',
    description:
      '수상안전 전문가로 성장하기 위한 심화 과정입니다. 강사로서 필요한 교수법, 안전관리, 위기대응 능력을 집중 교육합니다.',
    features: [
      '교수법 실습',
      '위기관리 시뮬레이션',
      '강사 자격증',
      '취업 연계',
    ],
    nextSession: '2024년 4월 5일',
    capacity: '15명',
    image: '/images/programs/instructor.jpg',
  },
  {
    id: 3,
    title: '해양레저 안전관리사',
    category: '전문',
    duration: '4일',
    price: '220,000원',
    description:
      '해양레저 시설 운영에 필요한 안전관리 전문 과정입니다. 시설 안전점검, 위험요인 분석, 사고 예방 시스템 구축 등을 교육합니다.',
    features: [
      '시설 안전관리',
      '법규 및 규정',
      '사고 대응 매뉴얼',
      '현장 실습',
    ],
    nextSession: '2024년 3월 25일',
    capacity: '20명',
    image: '/images/programs/marine-safety.jpg',
  },
];

export function ProgramsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            교육 프로그램
          </h2>
          <p className="text-lg text-gray-600">
            체계적인 커리큘럼으로 수상안전 전문가로 성장하세요
          </p>
        </div>

        {/* 프로그램 카드 그리드 */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program.id}
              className="group card hover:shadow-xl transition-all duration-300"
            >
              {/* 카테고리 배지 */}
              <div className="mb-4">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                    program.category === '기초'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {program.category}
                </span>
              </div>

              {/* 프로그램 제목 */}
              <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                {program.title}
              </h3>

              {/* 설명 */}
              <p className="mb-4 text-gray-600 line-clamp-3">
                {program.description}
              </p>

              {/* 주요 특징 */}
              <div className="mb-4 flex flex-wrap gap-2">
                {program.features.map((feature, index) => (
                  <span
                    key={index}
                    className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* 프로그램 정보 */}
              <div className="mb-4 space-y-2 border-t pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">교육 기간</span>
                  <span className="font-semibold text-gray-900">
                    {program.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">다음 일정</span>
                  <span className="font-semibold text-gray-900">
                    {program.nextSession}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">정원</span>
                  <span className="font-semibold text-gray-900">
                    {program.capacity}
                  </span>
                </div>
              </div>

              {/* 가격 및 버튼 */}
              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <div className="text-2xl font-bold text-primary-600">
                    {program.price}
                  </div>
                  <div className="text-xs text-gray-500">교육비</div>
                </div>
                <Link
                  href={`/programs/${program.id}`}
                  className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  자세히 보기
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div className="mt-12 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center rounded-lg border-2 border-primary-600 px-8 py-3 font-semibold text-primary-600 transition-all hover:bg-primary-600 hover:text-white"
          >
            전체 프로그램 보기
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
