import Link from 'next/link';

const notices = [
  {
    id: 1,
    title: '2024년 1분기 수상안전요원 양성과정 모집 안내',
    category: '교육',
    date: '2024-02-15',
    views: 1234,
    isPinned: true,
    excerpt:
      '2024년 1분기 수상안전요원 양성과정 수강생을 모집합니다. 교육 일정은 3월 15일부터 3월 17일까지이며, 선착순 20명 모집합니다.',
  },
  {
    id: 2,
    title: '여름 성수기 대비 수상안전 특별 캠페인 실시',
    category: '공지',
    date: '2024-02-10',
    views: 892,
    isPinned: true,
    excerpt:
      '여름 휴가철을 앞두고 전국 주요 해수욕장에서 수상안전 캠페인을 실시합니다. 안전한 물놀이 문화 정착을 위한 다양한 프로그램을 준비했습니다.',
  },
  {
    id: 3,
    title: '수상안전강사 자격증 갱신 안내',
    category: '자격증',
    date: '2024-02-05',
    views: 567,
    isPinned: false,
    excerpt:
      '2024년 상반기 수상안전강사 자격증 갱신 접수가 시작됩니다. 자격증 유효기간이 만료되는 분들은 필히 갱신 교육을 받으시기 바랍니다.',
  },
];

export function NoticesSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* 섹션 헤더 */}
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-4xl font-bold text-gray-900">
                공지사항
              </h2>
              <p className="text-lg text-gray-600">
                한국수상안전협회의 최신 소식을 확인하세요
              </p>
            </div>
            <Link
              href="/notices"
              className="hidden rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:border-primary-600 hover:text-primary-600 md:block"
            >
              전체보기
            </Link>
          </div>

          {/* 공지사항 리스트 */}
          <div className="space-y-4">
            {notices.map((notice) => (
              <Link
                key={notice.id}
                href={`/notices/${notice.id}`}
                className="card group block hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* 상단: 카테고리 및 고정 표시 */}
                    <div className="mb-3 flex items-center gap-2">
                      {notice.isPinned && (
                        <span className="flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
                          <svg
                            className="mr-1 h-3 w-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                          </svg>
                          공지
                        </span>
                      )}
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          notice.category === '교육'
                            ? 'bg-blue-100 text-blue-800'
                            : notice.category === '자격증'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {notice.category}
                      </span>
                    </div>

                    {/* 제목 */}
                    <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {notice.title}
                    </h3>

                    {/* 요약 */}
                    <p className="mb-4 text-gray-600 line-clamp-2">
                      {notice.excerpt}
                    </p>

                    {/* 하단 정보 */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg
                          className="mr-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {notice.date}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="mr-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        {notice.views.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* 화살표 아이콘 */}
                  <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 group-hover:bg-primary-100 transition-colors">
                    <svg
                      className="h-5 w-5 text-gray-600 group-hover:text-primary-600 transition-colors"
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
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 모바일 전체보기 버튼 */}
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/notices"
              className="inline-flex items-center rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:border-primary-600 hover:text-primary-600"
            >
              전체 공지사항 보기
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
      </div>
    </section>
  );
}
