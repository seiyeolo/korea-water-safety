'use client';

import { useState, useMemo } from 'react';
import { NoticeFiltersComponent } from '@/components/features/notices/NoticeFilters';
import { NoticeListItem } from '@/components/features/notices/NoticeListItem';
import { Pagination } from '@/components/common/Pagination';
import { usePosts } from '@/hooks/usePosts';
import { NoticeFilters } from '@/types/notice';
import type { Post } from '@/types/api';

const ITEMS_PER_PAGE = 20;

// 백엔드 Post 카테고리를 프론트엔드 Notice 카테고리로 매핑
const categoryMap: Record<Post['category'], string> = {
  NOTICE: 'general',
  NEWS: 'general',
  EVENT: 'event',
  FAQ: 'general',
};

// 프론트엔드 카테고리를 백엔드 카테고리로 역변환
const reverseCategoryMap: Record<string, Post['category'] | undefined> = {
  general: 'NOTICE',
  education: 'NEWS',
  certification: 'NEWS',
  event: 'EVENT',
};

export default function NoticesPage() {
  const [filters, setFilters] = useState<NoticeFilters>({
    category: 'all',
    searchQuery: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  // 백엔드 API 카테고리 파라미터 설정
  const backendCategory = filters.category === 'all' ? undefined : reverseCategoryMap[filters.category || 'general'];

  // 백엔드 API에서 게시글 데이터 가져오기
  const { posts, loading, error, pagination } = usePosts({
    category: backendCategory,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  // 백엔드 Post를 프론트엔드 Notice 형식으로 변환
  const mappedNotices = useMemo(() => {
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      category: categoryMap[post.category] as 'general' | 'education' | 'certification' | 'event',
      content: post.content,
      author: post.author?.name || '관리자',
      createdAt: post.publishedAt || post.createdAt,
      views: post.views,
      isPinned: post.isPinned,
      attachments: post.attachments?.map((att) => ({
        id: att.id,
        name: att.originalFilename,
        size: att.size,
        url: att.url,
      })),
    }));
  }, [posts]);

  // 클라이언트 사이드 검색어 필터링 (백엔드에서 검색 지원하지 않는 경우)
  const filteredNotices = useMemo(() => {
    if (!filters.searchQuery) return mappedNotices;

    const query = filters.searchQuery.toLowerCase();
    return mappedNotices.filter((notice) => {
      const searchable = `${notice.title} ${notice.content}`.toLowerCase();
      return searchable.includes(query);
    });
  }, [mappedNotices, filters.searchQuery]);

  // 고정 공지와 일반 공지 분리 및 정렬
  const sortedNotices = useMemo(() => {
    const pinned = filteredNotices.filter((n) => n.isPinned);
    const regular = filteredNotices.filter((n) => !n.isPinned);
    return [...pinned, ...regular];
  }, [filteredNotices]);

  // 필터 변경 시 첫 페이지로
  const handleFilterChange = (newFilters: NoticeFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 총 페이지 수 (백엔드 pagination 사용)
  const totalPages = pagination?.totalPages || 1;
  const totalCount = pagination?.total || sortedNotices.length;

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
                총 {totalCount}개 게시글
              </div>
              {loading && (
                <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                  데이터 로딩 중...
                </div>
              )}
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

            {/* 에러 메시지 */}
            {error && (
              <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
                <h3 className="mb-2 font-semibold">데이터를 불러오는 중 오류가 발생했습니다</h3>
                <p className="text-sm">{error.message}</p>
              </div>
            )}

            {/* 검색 결과 헤더 */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {loading ? (
                  <span className="text-gray-400">로딩 중...</span>
                ) : sortedNotices.length > 0 ? (
                  <>
                    <span className="text-primary-600">
                      {totalCount}
                    </span>
                    개의 공지사항
                  </>
                ) : (
                  '검색 결과가 없습니다'
                )}
              </h2>
              <div className="text-sm text-gray-600">
                {currentPage} / {totalPages} 페이지
              </div>
            </div>

            {/* 로딩 상태 */}
            {loading && (
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse rounded-lg bg-white p-6 shadow-md"
                  >
                    <div className="mb-4 h-4 w-1/4 rounded bg-gray-200"></div>
                    <div className="mb-2 h-6 w-3/4 rounded bg-gray-300"></div>
                    <div className="h-4 w-full rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            )}

            {/* 공지사항 목록 */}
            {!loading && sortedNotices.length > 0 && (
              <div className="space-y-4">
                {sortedNotices.map((notice) => (
                  <NoticeListItem key={notice.id} notice={notice} />
                ))}
              </div>
            )}

            {/* 검색 결과 없음 */}
            {!loading && sortedNotices.length === 0 && (
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
            {!loading && sortedNotices.length > 0 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
