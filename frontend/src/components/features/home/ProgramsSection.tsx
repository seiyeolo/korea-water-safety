import Link from 'next/link';
import { GraduationCap, Clock, Users, Calendar, ArrowRight, Sparkles } from 'lucide-react';

const programs = [
  {
    id: 1,
    title: '수상안전요원 양성과정',
    category: '기초',
    categoryColor: 'bg-emerald-500',
    duration: '3일',
    price: '150,000원',
    description:
      '수상안전의 기본을 배우는 입문 과정입니다. 수영 능력, 인명구조 기술, 응급처치 등 실무에 필요한 핵심 역량을 교육합니다.',
    features: ['수영 기술 향상', '인명구조 실습', 'CPR 자격증', '이론 + 실습'],
    nextSession: '2024년 3월 15일',
    capacity: '20명',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 2,
    title: '수상안전강사 자격과정',
    category: '전문',
    categoryColor: 'bg-violet-500',
    duration: '5일',
    price: '300,000원',
    description:
      '수상안전 전문가로 성장하기 위한 심화 과정입니다. 강사로서 필요한 교수법, 안전관리, 위기대응 능력을 집중 교육합니다.',
    features: ['교수법 실습', '위기관리 시뮬레이션', '강사 자격증', '취업 연계'],
    nextSession: '2024년 4월 5일',
    capacity: '15명',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 3,
    title: '해양레저 안전관리사',
    category: '전문',
    categoryColor: 'bg-blue-500',
    duration: '4일',
    price: '220,000원',
    description:
      '해양레저 시설 운영에 필요한 안전관리 전문 과정입니다. 시설 안전점검, 위험요인 분석, 사고 예방 시스템 구축 등을 교육합니다.',
    features: ['시설 안전관리', '법규 및 규정', '사고 대응 매뉴얼', '현장 실습'],
    nextSession: '2024년 3월 25일',
    capacity: '20명',
    gradient: 'from-blue-500 to-cyan-600',
  },
];

export function ProgramsSection() {
  return (
    <section className="relative bg-white py-24">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2">
            <GraduationCap className="h-4 w-4 text-violet-600" />
            <span className="text-sm font-semibold text-violet-600">Programs</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            교육 프로그램
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            체계적인 커리큘럼으로 수상안전 전문가로 성장하세요
          </p>
        </div>

        {/* 프로그램 카드 그리드 */}
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:border-slate-300 hover:shadow-xl"
            >
              {/* 상단 그라데이션 바 */}
              <div className={`h-2 bg-gradient-to-r ${program.gradient}`} />

              <div className="flex flex-1 flex-col p-8">
                {/* 카테고리 배지 */}
                <div className="mb-6 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full ${program.categoryColor} px-3 py-1 text-sm font-semibold text-white`}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    {program.category}
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    {program.duration}
                  </span>
                </div>

                {/* 프로그램 제목 */}
                <h3 className="mb-4 text-2xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                  {program.title}
                </h3>

                {/* 설명 */}
                <p className="mb-6 flex-1 text-slate-600 line-clamp-3">
                  {program.description}
                </p>

                {/* 주요 특징 */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {program.features.map((feature, index) => (
                    <span
                      key={index}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* 프로그램 정보 */}
                <div className="mb-6 space-y-3 border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-5 w-5 text-slate-400" />
                    <span className="text-slate-600">다음 일정</span>
                    <span className="ml-auto font-semibold text-slate-900">
                      {program.nextSession}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="h-5 w-5 text-slate-400" />
                    <span className="text-slate-600">정원</span>
                    <span className="ml-auto font-semibold text-slate-900">
                      {program.capacity}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-5 w-5 text-slate-400" />
                    <span className="text-slate-600">교육 기간</span>
                    <span className="ml-auto font-semibold text-slate-900">
                      {program.duration}
                    </span>
                  </div>
                </div>

                {/* 가격 및 버튼 */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                  <div>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${program.gradient} bg-clip-text text-transparent`}>
                      {program.price}
                    </div>
                    <div className="text-xs text-slate-500">교육비</div>
                  </div>
                  <Link
                    href={`/programs/${program.id}`}
                    className={`group/btn inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${program.gradient} px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl`}
                  >
                    자세히 보기
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div className="mt-16 text-center">
          <Link
            href="/programs"
            className="group inline-flex items-center gap-3 rounded-2xl border-2 border-slate-900 bg-slate-900 px-8 py-4 font-semibold text-white transition-all hover:bg-transparent hover:text-slate-900"
          >
            전체 프로그램 보기
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
