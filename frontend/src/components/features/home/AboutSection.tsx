import Link from 'next/link';

export function AboutSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* 섹션 헤더 */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              한국수상안전협회를 소개합니다
            </h2>
            <p className="text-lg text-gray-600">
              대한민국 수상안전 교육을 선도하는 전문 기관
            </p>
          </div>

          {/* 주요 내용 */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* 왼쪽: 협회 소개 */}
            <div className="card">
              <h3 className="mb-4 text-2xl font-bold text-primary-600">
                우리의 미션
              </h3>
              <p className="mb-4 leading-relaxed text-gray-700">
                한국수상안전협회는 1999년 설립 이래 수상안전 교육과 자격증
                발급을 통해 안전한 수상 환경 조성에 앞장서고 있습니다.
              </p>
              <p className="mb-6 leading-relaxed text-gray-700">
                전문적이고 체계적인 교육 프로그램을 통해 수상안전요원,
                수상안전강사 등 전문 인력을 양성하고 있으며, 전국 해수욕장 및
                수상레저 시설의 안전관리를 지원하고 있습니다.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-primary-600 hover:text-primary-700"
              >
                더 알아보기
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* 오른쪽: 주요 활동 */}
            <div className="space-y-4">
              <div className="card hover:shadow-lg transition-shadow">
                <div className="mb-3 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                    <svg
                      className="h-6 w-6 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    전문 교육 프로그램
                  </h4>
                </div>
                <p className="text-gray-600">
                  기초부터 전문가 과정까지 단계별 맞춤 교육 제공
                </p>
              </div>

              <div className="card hover:shadow-lg transition-shadow">
                <div className="mb-3 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100">
                    <svg
                      className="h-6 w-6 text-secondary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    자격증 발급
                  </h4>
                </div>
                <p className="text-gray-600">
                  국가 공인 수상안전 자격증 발급 및 관리
                </p>
              </div>

              <div className="card hover:shadow-lg transition-shadow">
                <div className="mb-3 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    봉사 활동
                  </h4>
                </div>
                <p className="text-gray-600">
                  지역사회와 함께하는 수상안전 캠페인 및 교육
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
