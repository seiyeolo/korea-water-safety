import Link from 'next/link';
import { BookOpen, Award, Users, ArrowRight, Target, Heart } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: '전문 교육 프로그램',
    description: '기초부터 전문가 과정까지 단계별 맞춤 교육 제공',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    icon: Award,
    title: '자격증 발급',
    description: '국가 공인 수상안전 자격증 발급 및 관리',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
  {
    icon: Users,
    title: '봉사 활동',
    description: '지역사회와 함께하는 수상안전 캠페인 및 교육',
    color: 'bg-violet-500',
    lightColor: 'bg-violet-50',
    textColor: 'text-violet-600',
  },
];

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
        <div className="h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2">
        <div className="h-96 w-96 rounded-full bg-cyan-100/50 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* 섹션 헤더 */}
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">About Us</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              한국수상안전협회를 소개합니다
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              대한민국 수상안전 교육을 선도하는 전문 기관
            </p>
          </div>

          {/* 주요 내용 */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* 왼쪽: 협회 소개 */}
            <div className="flex flex-col justify-center">
              <div className="mb-6 inline-flex items-center gap-2">
                <Heart className="h-6 w-6 text-rose-500" />
                <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Our Mission
                </span>
              </div>
              <h3 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">
                안전한 수상 환경을 위한
                <br />
                <span className="text-blue-600">우리의 사명</span>
              </h3>
              <p className="mb-6 text-lg leading-relaxed text-slate-600">
                한국수상안전협회는 1999년 설립 이래 수상안전 교육과 자격증
                발급을 통해 안전한 수상 환경 조성에 앞장서고 있습니다.
              </p>
              <p className="mb-8 text-lg leading-relaxed text-slate-600">
                전문적이고 체계적인 교육 프로그램을 통해 수상안전요원,
                수상안전강사 등 전문 인력을 양성하고 있으며, 전국 해수욕장 및
                수상레저 시설의 안전관리를 지원하고 있습니다.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-lg font-semibold text-blue-600 transition-colors hover:text-blue-700"
              >
                더 알아보기
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* 오른쪽: 주요 활동 카드 */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-5">
                    <div className={`flex-shrink-0 rounded-xl ${feature.lightColor} p-4`}>
                      <feature.icon className={`h-7 w-7 ${feature.textColor}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-500" />
                  </div>
                </div>
              ))}

              {/* 추가 통계 카드 */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
                  <div className="text-4xl font-bold">25+</div>
                  <div className="mt-1 text-blue-100">년의 경험</div>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white">
                  <div className="text-4xl font-bold">98%</div>
                  <div className="mt-1 text-slate-300">교육 만족도</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
