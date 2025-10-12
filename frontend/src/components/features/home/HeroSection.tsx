import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* 메인 헤딩 */}
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
            안전한 수상 환경을
            <br />
            <span className="text-secondary-300">함께 만들어갑니다</span>
          </h1>

          {/* 서브 헤딩 */}
          <p className="mb-8 text-xl text-primary-100 md:text-2xl">
            한국수상안전협회는 전문 교육과 자격증 발급을 통해
            <br />
            수상안전 문화를 선도하는 전문기관입니다
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/programs"
              className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary-600 shadow-lg transition-all hover:bg-primary-50 hover:shadow-xl sm:w-auto"
            >
              교육 프로그램 보기
            </Link>
            <Link
              href="/certificates"
              className="w-full rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-primary-600 sm:w-auto"
            >
              자격증 안내
            </Link>
          </div>

          {/* 주요 통계 */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-secondary-300">
                15,000+
              </div>
              <div className="mt-2 text-sm text-primary-100">교육 이수자</div>
            </div>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-secondary-300">
                12,000+
              </div>
              <div className="mt-2 text-sm text-primary-100">자격증 발급</div>
            </div>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-secondary-300">25년</div>
              <div className="mt-2 text-sm text-primary-100">운영 경력</div>
            </div>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-secondary-300">200+</div>
              <div className="mt-2 text-sm text-primary-100">전문 강사진</div>
            </div>
          </div>
        </div>
      </div>

      {/* 배경 장식 */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
