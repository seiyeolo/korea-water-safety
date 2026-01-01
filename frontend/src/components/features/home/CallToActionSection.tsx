import Link from 'next/link';
import { Phone, Mail, Clock, ArrowRight, Sparkles } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: '전화 문의',
    value: '02-1234-5678',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Mail,
    label: '이메일',
    value: 'info@watersafety.org',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Clock,
    label: '운영시간',
    value: '평일 09:00 - 18:00',
    color: 'from-amber-500 to-orange-500',
  },
];

export function CallToActionSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24">
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* 애니메이션 배경 */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          {/* 배지 */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-white/90">
              지금 시작하세요
            </span>
          </div>

          {/* 헤딩 */}
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            수상안전 전문가로의 첫 걸음
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              한국수상안전협회가 함께합니다
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
            체계적인 교육 프로그램과 전문 강사진이 여러분의 성장을 지원합니다.
            지금 바로 시작해보세요.
          </p>

          {/* CTA 버튼 */}
          <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="group relative w-full overflow-hidden rounded-xl bg-white px-8 py-4 text-lg font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:shadow-xl sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                회원가입하기
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="/programs"
              className="w-full rounded-xl border-2 border-white/30 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10 sm:w-auto"
            >
              프로그램 둘러보기
            </Link>
          </div>

          {/* 연락처 정보 */}
          <div className="grid gap-6 border-t border-white/10 pt-12 sm:grid-cols-3">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
              >
                <div className={`mb-4 rounded-xl bg-gradient-to-r ${item.color} p-3`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className="mb-1 text-sm text-slate-400">{item.label}</div>
                <div className="font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
