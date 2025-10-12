import Image from 'next/image';

export function PresidentMessageSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            회장 인사말
          </h2>

          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* 회장 이미지 */}
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-lg bg-gray-100 shadow-lg">
              <div className="flex h-full items-center justify-center text-gray-400">
                {/* 실제 이미지로 교체 필요 */}
                <div className="text-center">
                  <svg
                    className="mx-auto h-24 w-24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <p className="mt-2 text-sm">회장님 사진</p>
                </div>
              </div>
            </div>

            {/* 인사말 내용 */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-lg font-semibold text-primary-600">
                  안전한 수상 환경을 위한 노력
                </p>
                <h3 className="text-2xl font-bold text-gray-900">
                  한국수상안전협회를 찾아주신 <br />
                  여러분을 환영합니다
                </h3>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  안녕하십니까, 한국수상안전협회 회장 김영수입니다.
                </p>
                <p>
                  한국수상안전협회는 1999년 설립 이래 25년간 대한민국의 수상안전
                  문화를 선도하며, 전문적인 교육과 자격증 발급을 통해 수많은
                  수상안전 전문가를 양성해왔습니다.
                </p>
                <p>
                  우리 협회는 단순한 교육기관을 넘어, 안전한 수상 환경을 만들기 위한
                  사명을 가지고 있습니다. 전국의 수영장, 워터파크, 해수욕장 등에서
                  활동하는 15,000명 이상의 수상안전요원들이 바로 우리 협회의
                  교육을 받은 전문가들입니다.
                </p>
                <p>
                  앞으로도 한국수상안전협회는 최고 수준의 교육 프로그램과
                  체계적인 관리 시스템을 통해 수상안전 분야의 표준을 제시하고,
                  국민의 생명과 안전을 지키는 데 최선을 다하겠습니다.
                </p>
                <p className="pt-4">
                  <span className="block text-lg font-semibold text-gray-900">
                    한국수상안전협회 회장
                  </span>
                  <span className="mt-2 block text-2xl font-bold text-primary-600">
                    김영수
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
