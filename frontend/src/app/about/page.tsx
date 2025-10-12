import { Metadata } from 'next';
import { PresidentMessageSection } from '@/components/features/about/PresidentMessageSection';
import { HistoryTimelineSection } from '@/components/features/about/HistoryTimelineSection';
import { OrganizationChartSection } from '@/components/features/about/OrganizationChartSection';
import { LocationSection } from '@/components/features/about/LocationSection';

export const metadata: Metadata = {
  title: '협회 소개 - 한국수상안전협회',
  description:
    '한국수상안전협회의 회장 인사말, 연혁, 조직도, 오시는 길을 안내합니다.',
  keywords: ['한국수상안전협회', '협회소개', '연혁', '조직도', '오시는길'],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* 페이지 헤더 */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">협회 소개</h1>
          <p className="text-lg text-primary-100 md:text-xl">
            대한민국 수상안전 교육을 선도하는 전문 기관
          </p>
          <div className="mt-8 flex justify-center gap-2 text-sm">
            <span className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              1999년 설립
            </span>
            <span className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              25년 역사
            </span>
            <span className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              15,000+ 교육 이수자
            </span>
          </div>
        </div>
      </section>

      {/* 각 섹션들 */}
      <PresidentMessageSection />
      <HistoryTimelineSection />
      <OrganizationChartSection />
      <LocationSection />

      {/* 문의 섹션 */}
      <section className="bg-primary-600 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">
            한국수상안전협회에 문의하세요
          </h2>
          <p className="mb-6 text-primary-100">
            전문 상담원이 친절하게 안내해드립니다
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
