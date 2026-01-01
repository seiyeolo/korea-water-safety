'use client';

import Link from 'next/link';
import { Shield, Award, Users, Clock, ChevronDown } from 'lucide-react';

const stats = [
  { icon: Users, value: '15,000+', label: '교육 이수자', color: 'from-blue-500 to-cyan-500' },
  { icon: Award, value: '12,000+', label: '자격증 발급', color: 'from-emerald-500 to-teal-500' },
  { icon: Clock, value: '25년', label: '운영 경력', color: 'from-violet-500 to-purple-500' },
  { icon: Shield, value: '200+', label: '전문 강사진', color: 'from-orange-500 to-amber-500' },
];

export function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />

      {/* 애니메이션 원형 배경 */}
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse delay-1000" />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-5xl text-center">
            {/* 배지 */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Shield className="h-5 w-5 text-cyan-400" />
              <span className="text-sm font-medium text-white/90">
                대한민국 수상안전 전문 교육기관
              </span>
            </div>

            {/* 메인 헤딩 */}
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              안전한 수상 환경을
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                함께 만들어갑니다
              </span>
            </h1>

            {/* 서브 헤딩 */}
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 sm:text-xl">
              한국수상안전협회는 전문 교육과 자격증 발급을 통해
              <br className="hidden sm:block" />
              수상안전 문화를 선도하는 전문기관입니다
            </p>

            {/* CTA 버튼 */}
            <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/programs"
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  교육 프로그램 보기
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <Link
                href="/certificates"
                className="w-full rounded-xl border-2 border-white/30 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10 sm:w-auto"
              >
                자격증 안내
              </Link>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-r ${stat.color} p-3`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60 transition-colors hover:text-white"
        aria-label="아래로 스크롤"
      >
        <ChevronDown className="h-8 w-8" />
      </button>

      {/* 하단 그라데이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
