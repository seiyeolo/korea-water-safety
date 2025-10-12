'use client';

import { Search } from 'lucide-react';
import { NoticeCategory, NoticeFilters } from '@/types/notice';
import { getCategoryLabel } from '@/data/notices';

interface NoticeFiltersProps {
  filters: NoticeFilters;
  onFilterChange: (filters: NoticeFilters) => void;
}

const categories: (NoticeCategory | 'all')[] = [
  'all',
  'general',
  'education',
  'certification',
  'event',
];

export function NoticeFiltersComponent({
  filters,
  onFilterChange,
}: NoticeFiltersProps) {
  const handleCategoryChange = (category: NoticeCategory | 'all') => {
    onFilterChange({ ...filters, category });
  };

  const handleSearchChange = (searchQuery: string) => {
    onFilterChange({ ...filters, searchQuery });
  };

  return (
    <div className="space-y-4">
      {/* 검색 */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="공지사항 검색..."
          value={filters.searchQuery || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full rounded-lg border-2 border-gray-200 py-3 pl-12 pr-4 transition-colors focus:border-primary-500 focus:outline-none"
        />
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              (filters.category || 'all') === category
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? '전체' : getCategoryLabel(category)}
          </button>
        ))}
      </div>
    </div>
  );
}
