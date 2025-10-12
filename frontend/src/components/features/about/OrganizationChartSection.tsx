'use client';

interface Position {
  title: string;
  name: string;
  department?: string;
}

interface Department {
  name: string;
  positions: Position[];
}

const organizationData = {
  president: {
    title: '회장',
    name: '김영수',
  },
  vicePresidents: [
    { title: '부회장', name: '이지혜' },
    { title: '부회장', name: '박민준' },
  ],
  departments: [
    {
      name: '교육운영본부',
      positions: [
        { title: '본부장', name: '최서연' },
        { title: '교육팀장', name: '정우진' },
        { title: '교육팀원', name: '강은지' },
        { title: '교육팀원', name: '한지훈' },
      ],
    },
    {
      name: '자격관리본부',
      positions: [
        { title: '본부장', name: '윤성호' },
        { title: '자격팀장', name: '김수민' },
        { title: '자격팀원', name: '이현우' },
        { title: '자격팀원', name: '박지원' },
      ],
    },
    {
      name: '안전관리본부',
      positions: [
        { title: '본부장', name: '임재현' },
        { title: '안전팀장', name: '송미라' },
        { title: '안전팀원', name: '조영수' },
        { title: '안전팀원', name: '장서윤' },
      ],
    },
    {
      name: '총무행정본부',
      positions: [
        { title: '본부장', name: '신동욱' },
        { title: '총무팀장', name: '오지현' },
        { title: '총무팀원', name: '배준호' },
        { title: '회계팀원', name: '서예진' },
      ],
    },
  ] as Department[],
};

export function OrganizationChartSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
            조직도
          </h2>
          <p className="mb-12 text-center text-gray-600">
            전문성과 체계성을 갖춘 조직 구성
          </p>

          <div className="space-y-8">
            {/* 회장 */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="rounded-lg bg-primary-600 p-6 text-center shadow-lg">
                  <div className="text-sm font-medium text-primary-100">
                    {organizationData.president.title}
                  </div>
                  <div className="mt-2 text-xl font-bold text-white">
                    {organizationData.president.name}
                  </div>
                </div>
                {/* 연결선 */}
                <div className="absolute left-1/2 top-full h-8 w-0.5 -translate-x-1/2 bg-gray-300"></div>
              </div>
            </div>

            {/* 부회장들 */}
            <div className="flex justify-center gap-8">
              {organizationData.vicePresidents.map((vp, index) => (
                <div key={index} className="relative">
                  <div className="rounded-lg bg-primary-500 p-5 text-center shadow-md">
                    <div className="text-sm font-medium text-primary-50">
                      {vp.title}
                    </div>
                    <div className="mt-1 text-lg font-bold text-white">
                      {vp.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 연결선 */}
            <div className="relative h-8">
              <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gray-300"></div>
            </div>

            {/* 본부들 */}
            <div className="grid gap-6 md:grid-cols-2">
              {organizationData.departments.map((dept, deptIndex) => (
                <div
                  key={deptIndex}
                  className="rounded-lg border-2 border-gray-200 bg-white p-6 shadow-md transition-all hover:border-primary-300 hover:shadow-lg"
                >
                  {/* 본부명 */}
                  <div className="mb-4 border-b-2 border-primary-500 pb-3">
                    <h3 className="text-center text-lg font-bold text-gray-900">
                      {dept.name}
                    </h3>
                  </div>

                  {/* 본부 구성원 */}
                  <div className="space-y-3">
                    {dept.positions.map((position, posIndex) => (
                      <div
                        key={posIndex}
                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-primary-50"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {position.title}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {position.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 전체 인원 통계 */}
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 p-6 text-center text-white shadow-md">
                <div className="text-3xl font-bold">1명</div>
                <div className="mt-2 text-sm opacity-90">회장</div>
              </div>
              <div className="rounded-lg bg-gradient-to-br from-primary-400 to-primary-500 p-6 text-center text-white shadow-md">
                <div className="text-3xl font-bold">2명</div>
                <div className="mt-2 text-sm opacity-90">부회장</div>
              </div>
              <div className="rounded-lg bg-gradient-to-br from-primary-300 to-primary-400 p-6 text-center text-white shadow-md">
                <div className="text-3xl font-bold">16명</div>
                <div className="mt-2 text-sm opacity-90">본부 및 팀 구성원</div>
              </div>
            </div>

            {/* 추가 정보 */}
            <div className="mt-8 rounded-lg bg-gray-50 p-6">
              <h4 className="mb-3 font-semibold text-gray-900">
                ※ 조직 구성 특징
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
                  <span>
                    각 본부는 전문성을 갖춘 팀장과 팀원으로 구성되어 체계적인
                    업무 수행
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
                  <span>
                    200명 이상의 전문 강사진이 전국에서 교육 활동 수행
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
                  <span>
                    정기적인 조직 역량 강화 교육 및 워크샵 실시
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
