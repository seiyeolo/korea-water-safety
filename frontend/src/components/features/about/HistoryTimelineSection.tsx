'use client';

interface TimelineItem {
  year: number;
  events: string[];
}

const historyData: TimelineItem[] = [
  {
    year: 1999,
    events: [
      '한국수상안전협회 설립',
      '초대 회장 취임',
      '수상안전요원 양성과정 1기 개설',
    ],
  },
  {
    year: 2002,
    events: [
      '대전광역시 동구 사무소 개소',
      '전국 수상안전요원 교육기관 지정',
      '누적 교육 이수자 1,000명 달성',
    ],
  },
  {
    year: 2005,
    events: [
      '수상안전강사 양성과정 신설',
      '워터파크 안전관리 위탁 사업 시작',
      '연간 교육 인원 500명 돌파',
    ],
  },
  {
    year: 2008,
    events: [
      '해양경찰청 업무협약 체결',
      '응급처치 전문교육 프로그램 도입',
      '누적 자격증 발급 5,000건 달성',
    ],
  },
  {
    year: 2010,
    events: [
      '제2대 회장 취임',
      '전국 지부 네트워크 구축 완료',
      '국제 수상안전 협력기관 가입',
    ],
  },
  {
    year: 2013,
    events: [
      '해양레저 안전관리사 과정 신설',
      '온라인 교육 시스템 구축',
      '연간 교육 인원 1,000명 돌파',
    ],
  },
  {
    year: 2015,
    events: [
      '교육센터 시설 확장 및 현대화',
      '실습용 수영장 및 구조장비 보강',
      '누적 교육 이수자 10,000명 달성',
    ],
  },
  {
    year: 2018,
    events: [
      '제3대 회장 취임',
      'VR 안전교육 시스템 도입',
      '전문 강사진 100명 돌파',
    ],
  },
  {
    year: 2020,
    events: [
      '코로나19 대응 비대면 교육 체계 구축',
      '실시간 온라인 교육 플랫폼 오픈',
      '안전수칙 준수 우수기관 표창',
    ],
  },
  {
    year: 2022,
    events: [
      '누적 자격증 발급 12,000건 달성',
      '전국 해수욕장 안전관리 위탁 확대',
      '국제 수상안전 컨퍼런스 개최',
    ],
  },
  {
    year: 2024,
    events: [
      '협회 설립 25주년 기념식',
      '스마트 안전관리 시스템 도입',
      '전문 강사진 200명 돌파',
      '누적 교육 이수자 15,000명 달성',
    ],
  },
];

export function HistoryTimelineSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
            협회 연혁
          </h2>
          <p className="mb-12 text-center text-gray-600">
            1999년부터 2024년까지 25년간의 발자취
          </p>

          <div className="relative">
            {/* 타임라인 세로선 */}
            <div className="absolute left-8 top-0 h-full w-0.5 bg-primary-200 md:left-1/2"></div>

            {/* 타임라인 아이템들 */}
            <div className="space-y-12">
              {historyData.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* 연도 표시 */}
                  <div className="relative z-10 flex w-full items-center md:w-1/2">
                    <div
                      className={`w-full ${
                        index % 2 === 0
                          ? 'md:text-right md:pr-12'
                          : 'md:text-left md:pl-12'
                      }`}
                    >
                      {/* 모바일: 연도 왼쪽 표시 */}
                      <div className="mb-4 flex items-center gap-4 md:hidden">
                        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg">
                          <span className="text-lg font-bold">{item.year}</span>
                        </div>
                      </div>

                      {/* 데스크톱: 연도 표시 */}
                      <div className="hidden md:block">
                        <span className="inline-block rounded-full bg-primary-600 px-6 py-2 text-xl font-bold text-white shadow-lg">
                          {item.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 중앙 점 - 데스크톱만 */}
                  <div className="absolute left-8 top-2 z-20 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-primary-600 bg-white md:left-1/2 md:block"></div>

                  {/* 이벤트 내용 */}
                  <div className="w-full pl-20 md:w-1/2 md:pl-0">
                    <div
                      className={`rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg ${
                        index % 2 === 0 ? 'md:ml-12' : 'md:mr-12'
                      }`}
                    >
                      {/* 모바일: 연도 표시 */}
                      <div className="mb-3 md:hidden">
                        <span className="inline-block rounded bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700">
                          {item.year}년
                        </span>
                      </div>

                      <ul className="space-y-2">
                        {item.events.map((event, eventIndex) => (
                          <li
                            key={eventIndex}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
                            <span>{event}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 마일스톤 요약 */}
          <div className="mt-16 grid gap-6 md:grid-cols-4">
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-primary-600">25년</div>
              <div className="mt-2 text-sm text-gray-600">운영 경력</div>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-primary-600">15,000+</div>
              <div className="mt-2 text-sm text-gray-600">교육 이수자</div>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-primary-600">12,000+</div>
              <div className="mt-2 text-sm text-gray-600">자격증 발급</div>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-primary-600">200+</div>
              <div className="mt-2 text-sm text-gray-600">전문 강사진</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
