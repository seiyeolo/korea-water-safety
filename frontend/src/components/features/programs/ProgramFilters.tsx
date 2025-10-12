'use client';

import { Search } from 'lucide-react';
import { ProgramCategory, ProgramLevel, ProgramFilters } from '@/types/program';
import { getCategoryLabel, getLevelLabel } from '@/data/programs';

interface ProgramFiltersProps {
  filters: ProgramFilters;
  onFilterChange: (filters: ProgramFilters) => void;
}

const categories: (ProgramCategory | 'all')[] = [
  'all',
  'lifeguard',
  'instructor',
  'marine',
  'special',
];

const levels: (ProgramLevel | 'all')[] = ['all', 'beginner', 'intermediate', 'advanced'];

export function ProgramFiltersComponent({
  filters,
  onFilterChange,
}: ProgramFiltersProps) {
  const handleCategoryChange = (category: ProgramCategory | 'all') => {
    onFilterChange({ ...filters, category });
  };

  const handleLevelChange = (level: ProgramLevel | 'all') => {
    onFilterChange({ ...filters, level });
  };

  const handleSearchChange = (searchQuery: string) => {
    onFilterChange({ ...filters, searchQuery });
  };

  return (
    <div className="space-y-6">
      {/* 검색 */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="프로그램 검색..."
          value={filters.searchQuery || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full rounded-lg border-2 border-gray-200 py-3 pl-12 pr-4 transition-colors focus:border-primary-500 focus:outline-none"
        />
      </div>

      {/* 카테고리 필터 */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900">카테고리</h3>
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

      {/* 레벨 필터 */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900">난이도</h3>
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => handleLevelChange(level)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                (filters.level || 'all') === level
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {level === 'all' ? '전체' : getLevelLabel(level)}
            </button>
          ))}
        </div>
      </div>

      {/* 필터 초기화 */}
      {(filters.category !== 'all' ||
        filters.level !== 'all' ||
        filters.searchQuery) && (
        <button
          onClick={() =>
            onFilterChange({ category: 'all', level: 'all', searchQuery: '' })
          }
          className="w-full rounded-lg border-2 border-gray-300 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          필터 초기화
        </button>
      )}
    </div>
  );
}
