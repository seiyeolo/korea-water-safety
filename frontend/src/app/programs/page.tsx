'use client';

import { useState, useMemo } from 'react';
import { ProgramFiltersComponent } from '@/components/features/programs/ProgramFilters';
import { ProgramCard } from '@/components/features/programs/ProgramCard';
import { usePrograms } from '@/hooks/usePrograms';
import type { ProgramFilters } from '@/types/program';

export default function ProgramsPage() {
  const [filters, setFilters] = useState<ProgramFilters>({
    category: 'all',
    level: 'all',
    searchQuery: '',
  });

  // 백엔드 API에서 프로그램 데이터 가져오기
  const { programs: apiPrograms, loading, error } = usePrograms({ isActive: true });

  // 백엔드 데이터를 프론트엔드 타입으로 변환 및 필터링
  const filteredPrograms = useMemo(() => {
    if (!apiPrograms) return [];

    // 백엔드 데이터를 프론트엔드 형식으로 매핑
    const mappedPrograms = apiPrograms.map((program) => ({
      id: program.id,
      title: program.title,
      description: program.description,
      category: 'lifeguard' as const, // 백엔드에 category 필드가 없으므로 기본값
      level: 'intermediate' as const, // 백엔드에 level 필드가 없으므로 기본값
      duration: program.duration, // 일 단위
      price: program.price,
      capacity: program.capacity,
      instructor: program.instructorName,
      location: program.location,
      features: [
        '전문 강사진 교육',
        '소규모 그룹 수업',
        '실습 중심 교육',
        '수료증 발급',
      ],
      requirements: [
        '만 18세 이상',
        '수영 가능자',
        '건강 상태 양호자',
      ],
      schedule: [
        {
          startDate: program.startDate,
          endDate: program.endDate,
          time: '09:00 - 18:00',
        },
      ],
      curriculum: [
        {
          day: 1,
          title: '이론 교육',
          topics: ['수상안전 기본 이론', '응급처치 개론'],
        },
        {
          day: 2,
          title: '실습 교육',
          topics: ['수상 구조 기법', '실전 훈련'],
        },
      ],
      imageUrl: program.thumbnailUrl || '/images/programs/default.jpg',
      tags: [], // 백엔드에 tags 필드가 없음
    }));

    // 클라이언트 사이드 필터링
    return mappedPrograms.filter((program) => {
      // 카테고리 필터 (현재는 백엔드에서 지원 안함)
      if (filters.category && filters.category !== 'all') {
        if (program.category !== filters.category) return false;
      }

      // 레벨 필터 (현재는 백엔드에서 지원 안함)
      if (filters.level && filters.level !== 'all') {
        if (program.level !== filters.level) return false;
      }

      // 검색어 필터
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchable = `${program.title} ${program.description} ${program.instructor}`.toLowerCase();
        if (!searchable.includes(query)) return false;
      }

      return true;
    });
  }, [apiPrograms, filters]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">교육 프로그램</h1>
            <p className="text-lg text-primary-100 md:text-xl">
              전문적이고 체계적인 수상안전 교육 프로그램
            </p>
            <div className="mt-8 flex justify-center gap-4 text-sm">
              <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                {loading ? '로딩 중...' : `총 ${apiPrograms.length}개 프로그램`}
              </div>
              <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                자격증 및 수료증 발급
              </div>
              <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                소규모 그룹 교육
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 메인 컨텐츠 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* 로딩 상태 */}
          {loading && (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
                <p className="text-lg font-medium text-gray-600">
                  프로그램을 불러오는 중...
                </p>
              </div>
            </div>
          )}

          {/* 에러 상태 */}
          {error && !loading && (
            <div className="rounded-lg bg-red-50 p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                데이터를 불러올 수 없습니다
              </h3>
              <p className="mb-4 text-gray-600">{error.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-primary-600 px-6 py-2 font-medium text-white transition-colors hover:bg-primary-700"
              >
                다시 시도
              </button>
            </div>
          )}

          {/* 정상 상태 */}
          {!loading && !error && (
            <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
              {/* 필터 사이드바 */}
              <aside className="lg:sticky lg:top-4 lg:h-fit">
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <h2 className="mb-6 text-xl font-bold text-gray-900">필터</h2>
                  <ProgramFiltersComponent
                    filters={filters}
                    onFilterChange={setFilters}
                  />
                </div>
              </aside>

              {/* 프로그램 목록 */}
              <div>
                {/* 검색 결과 헤더 */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredPrograms.length > 0 ? (
                      <>
                        <span className="text-primary-600">
                          {filteredPrograms.length}
                        </span>
                        개의 프로그램
                      </>
                    ) : (
                      '검색 결과가 없습니다'
                    )}
                  </h2>
                </div>

                {/* 프로그램 카드 그리드 */}
                {filteredPrograms.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {filteredPrograms.map((program) => (
                      <ProgramCard key={program.id} program={program} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg bg-white p-12 text-center shadow-md">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                      <svg
                        className="h-8 w-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      검색 결과가 없습니다
                    </h3>
                    <p className="text-gray-600">
                      다른 검색어나 필터를 시도해보세요.
                    </p>
                    <button
                      onClick={() =>
                        setFilters({ category: 'all', level: 'all', searchQuery: '' })
                      }
                      className="mt-4 rounded-lg bg-primary-600 px-6 py-2 font-medium text-white transition-colors hover:bg-primary-700"
                    >
                      전체 프로그램 보기
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="bg-primary-600 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">프로그램에 대해 궁금하신가요?</h2>
          <p className="mb-6 text-primary-100">
            전문 상담원이 자세히 안내해드립니다
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:02-1234-5678"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-primary-600 transition-all hover:bg-primary-50"
            >
              전화 상담
            </a>
            <a
              href="mailto:info@watersafety.org"
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-all hover:bg-white/10"
            >
              이메일 문의
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
