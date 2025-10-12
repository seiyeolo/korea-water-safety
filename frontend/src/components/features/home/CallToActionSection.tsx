import Link from 'next/link';

export function CallToActionSection() {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            지금 바로 시작하세요
          </h2>
          <p className="mb-8 text-lg text-primary-100 md:text-xl">
            수상안전 전문가로의 첫 걸음, 한국수상안전협회가 함께합니다
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary-600 shadow-lg transition-all hover:bg-primary-50 sm:w-auto"
            >
              회원가입하기
            </Link>
            <Link
              href="/programs"
              className="w-full rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-primary-600 sm:w-auto"
            >
              프로그램 둘러보기
            </Link>
          </div>

          {/* 연락처 정보 */}
          <div className="mt-12 grid gap-6 border-t border-primary-400 pt-8 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <svg
                className="mb-3 h-8 w-8 text-secondary-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div className="text-sm text-primary-100">전화 문의</div>
              <div className="font-semibold">02-1234-5678</div>
            </div>

            <div className="flex flex-col items-center">
              <svg
                className="mb-3 h-8 w-8 text-secondary-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div className="text-sm text-primary-100">이메일</div>
              <div className="font-semibold">info@watersafety.org</div>
            </div>

            <div className="flex flex-col items-center">
              <svg
                className="mb-3 h-8 w-8 text-secondary-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-sm text-primary-100">운영시간</div>
              <div className="font-semibold">평일 09:00 - 18:00</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
