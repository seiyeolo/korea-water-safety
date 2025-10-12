'use client';

import { useState, useMemo } from 'react';
import { NoticeFiltersComponent } from '@/components/features/notices/NoticeFilters';
import { NoticeListItem } from '@/components/features/notices/NoticeListItem';
import { Pagination } from '@/components/common/Pagination';
import { notices } from '@/data/notices';
import { NoticeFilters } from '@/types/notice';

const ITEMS_PER_PAGE = 10;

export default function NoticesPage() {
  const [filters, setFilters] = useState<NoticeFilters>({
    category: 'all',
    searchQuery: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  // 필터링된 공지사항 목록
  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      // 카테고리 필터
      if (filters.category && filters.category !== 'all') {
        if (notice.category !== filters.category) return false;
      }

      // 검색어 필터
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchable = `${notice.title} ${notice.content}`.toLowerCase();
        if (!searchable.includes(query)) return false;
      }

      return true;
    });
  }, [filters]);

  // 고정 공지와 일반 공지 분리 및 정렬
  const sortedNotices = useMemo(() => {
    const pinned = filteredNotices.filter((n) => n.isPinned);
    const regular = filteredNotices.filter((n) => !n.isPinned);
    return [...pinned, ...regular];
  }, [filteredNotices]);

  // 페이지네이션
  const totalPages = Math.ceil(sortedNotices.length / ITEMS_PER_PAGE);
  const paginatedNotices = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedNotices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedNotices, currentPage]);

  // 필터 변경 시 첫 페이지로
  const handleFilterChange = (newFilters: NoticeFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">공지사항</h1>
            <p className="text-lg text-primary-100 md:text-xl">
              협회의 새로운 소식과 주요 공지를 확인하세요
            </p>
            <div className="mt-8 flex justify-center gap-4 text-sm">
              <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                총 {notices.length}개 게시글
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 메인 컨텐츠 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* 필터 */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
              <NoticeFiltersComponent
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* 검색 결과 헤더 */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredNotices.length > 0 ? (
                  <>
                    <span className="text-primary-600">
                      {filteredNotices.length}
                    </span>
                    개의 공지사항
                  </>
                ) : (
                  '검색 결과가 없습니다'
                )}
              </h2>
              <div className="text-sm text-gray-600">
                {currentPage} / {totalPages || 1} 페이지
              </div>
            </div>

            {/* 공지사항 목록 */}
            {paginatedNotices.length > 0 ? (
              <div className="space-y-4">
                {paginatedNotices.map((notice) => (
                  <NoticeListItem key={notice.id} notice={notice} />
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
                    handleFilterChange({ category: 'all', searchQuery: '' })
                  }
                  className="mt-4 rounded-lg bg-primary-600 px-6 py-2 font-medium text-white transition-colors hover:bg-primary-700"
                >
                  전체 공지사항 보기
                </button>
              </div>
            )}

            {/* 페이지네이션 */}
            {paginatedNotices.length > 0 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
