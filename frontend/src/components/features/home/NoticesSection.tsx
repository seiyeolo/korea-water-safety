import Link from 'next/link';
import { Bell, Calendar, Eye, Pin, ChevronRight, ArrowRight } from 'lucide-react';

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

const getCategoryStyle = (category: string) => {
  switch (category) {
    case '교육':
      return 'bg-blue-100 text-blue-700';
    case '자격증':
      return 'bg-emerald-100 text-emerald-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

export function NoticesSection() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* 섹션 헤더 */}
          <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2">
                <Bell className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-600">Notice</span>
              </div>
              <h2 className="mb-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                공지사항
              </h2>
              <p className="text-lg text-slate-600">
                한국수상안전협회의 최신 소식을 확인하세요
              </p>
            </div>
            <Link
              href="/notices"
              className="group hidden items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-blue-600 hover:text-blue-600 md:inline-flex"
            >
              전체보기
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 공지사항 리스트 */}
          <div className="space-y-4">
            {notices.map((notice, index) => (
              <Link
                key={notice.id}
                href={`/notices/${notice.id}`}
                className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* 상단: 카테고리 및 고정 표시 */}
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      {notice.isPinned && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
                          <Pin className="h-3 w-3" />
                          공지
                        </span>
                      )}
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getCategoryStyle(notice.category)}`}
                      >
                        {notice.category}
                      </span>
                    </div>

                    {/* 제목 */}
                    <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                      {notice.title}
                    </h3>

                    {/* 요약 */}
                    <p className="mb-4 text-slate-600 line-clamp-2">
                      {notice.excerpt}
                    </p>

                    {/* 하단 정보 */}
                    <div className="flex items-center gap-5 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {notice.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Eye className="h-4 w-4" />
                        {notice.views.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* 화살표 아이콘 */}
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 transition-all group-hover:bg-blue-100">
                    <ChevronRight className="h-6 w-6 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-blue-600" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 모바일 전체보기 버튼 */}
          <div className="mt-10 text-center md:hidden">
            <Link
              href="/notices"
              className="group inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-blue-600 hover:text-blue-600"
            >
              전체 공지사항 보기
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
