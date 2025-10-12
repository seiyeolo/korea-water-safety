import { Metadata } from 'next';
import { Award, Shield } from 'lucide-react';
import { CertificateCard } from '@/components/features/certificates/CertificateCard';
import { ProcessTimeline } from '@/components/features/certificates/ProcessTimeline';
import { ExamScheduleSection } from '@/components/features/certificates/ExamScheduleSection';
import { CertificateLookupForm } from '@/components/features/certificates/CertificateLookupForm';
import { FAQSection } from '@/components/features/certificates/FAQSection';
import { certificates } from '@/data/certificates';

export const metadata: Metadata = {
  title: '자격증 안내 - 한국수상안전협회',
  description:
    '한국수상안전협회에서 발급하는 국가자격증 및 민간등록자격증 안내. 수상구조사, 수상안전요원, 수상안전강사 자격증 정보.',
  keywords: ['자격증', '수상구조사', '수상안전요원', '수상안전강사', '국가자격증'],
};

export default function CertificatesPage() {
  const nationalCertificates = certificates.filter((c) => c.type === 'national');
  const privateCertificates = certificates.filter((c) => c.type === 'private');

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">자격증 안내</h1>
          <p className="text-lg text-primary-100 md:text-xl">
            수상안전 전문가로 인정받는 공인 자격증
          </p>
          <div className="mt-8 flex justify-center gap-4 text-sm">
            <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              국가자격증 {nationalCertificates.length}종
            </div>
            <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              민간등록자격증 {privateCertificates.length}종
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* 국가자격증 섹션 */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">국가자격증</h2>
            </div>
            <p className="text-gray-600">
              해양경찰청에서 발급하는 공인 국가자격증
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {nationalCertificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} />
            ))}
          </div>
        </section>

        {/* 민간등록자격증 섹션 */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                민간등록자격증
              </h2>
            </div>
            <p className="text-gray-600">
              한국직업능력연구원에 등록된 전문 자격증
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {privateCertificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} />
            ))}
          </div>
        </section>

        {/* 취득 절차 섹션 */}
        <section className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              자격증 취득 절차
            </h2>
            <p className="text-gray-600">
              5단계로 이루어지는 체계적인 자격증 취득 과정
            </p>
          </div>
          <ProcessTimeline />
        </section>

        {/* 시험 일정 섹션 */}
        <section className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              2024년 시험 일정
            </h2>
            <p className="text-gray-600">
              연 4회 실시되는 자격시험 일정을 확인하세요
            </p>
          </div>
          <ExamScheduleSection />
        </section>

        {/* 자격증 조회 섹션 */}
        <section className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              자격증 조회
            </h2>
            <p className="text-gray-600">
              발급받은 자격증의 진위 여부를 확인하실 수 있습니다
            </p>
          </div>
          <CertificateLookupForm />
        </section>

        {/* FAQ 섹션 */}
        <section>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              자주 묻는 질문
            </h2>
            <p className="text-gray-600">
              자격증 관련 궁금하신 사항을 확인하세요
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <FAQSection />
          </div>
        </section>
      </div>

      {/* CTA 섹션 */}
      <section className="bg-primary-600 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">
            자격증에 대해 더 궁금하신가요?
          </h2>
          <p className="mb-6 text-primary-100">
            전문 상담원이 자세히 안내해드립니다
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
