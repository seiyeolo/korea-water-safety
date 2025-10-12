import Link from 'next/link';
import { Calendar, Clock, Users, MapPin, Star, ArrowRight } from 'lucide-react';
import { Program } from '@/types/program';
import { getCategoryLabel, getLevelLabel } from '@/data/programs';

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
  const nextSchedule = program.schedule[0];

  return (
    <div className="group relative overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-md transition-all hover:border-primary-300 hover:shadow-xl">
      {/* 인기 배지 */}
      {program.isPopular && (
        <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-yellow-500 px-3 py-1 text-sm font-bold text-white shadow-lg">
          <Star className="h-4 w-4 fill-current" />
          <span>인기</span>
        </div>
      )}

      {/* 이미지 영역 */}
      <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600">
        <div className="flex h-full items-center justify-center p-8 text-center">
          <div>
            <div className="mb-2 text-sm font-medium text-primary-100">
              {getCategoryLabel(program.category)}
            </div>
            <h3 className="text-2xl font-bold text-white">{program.title}</h3>
          </div>
        </div>
      </div>

      {/* 내용 영역 */}
      <div className="p-6">
        {/* 태그 */}
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
            {getLevelLabel(program.level)}
          </span>
          {program.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 설명 */}
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {program.description}
        </p>

        {/* 정보 */}
        <div className="mb-4 space-y-2 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-primary-500" />
            <span>
              {program.duration}일 과정 • {nextSchedule?.startDate}부터
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-primary-500" />
            <span>{nextSchedule?.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4 text-primary-500" />
            <span>정원 {program.capacity}명</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-primary-500" />
            <span>{program.location}</span>
          </div>
        </div>

        {/* 가격 및 버튼 */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <div className="text-sm text-gray-500">교육비</div>
            <div className="text-2xl font-bold text-primary-600">
              {program.price.toLocaleString()}원
            </div>
          </div>
          <Link
            href={`/programs/${program.id}`}
            className="flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-700 hover:gap-3"
          >
            자세히 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
