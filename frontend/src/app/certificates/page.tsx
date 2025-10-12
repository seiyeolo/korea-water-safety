'use client';

import { useState, useEffect } from 'react';

import { Award, Shield, Loader2 } from 'lucide-react';
import { CertificateCard } from '@/components/features/certificates/CertificateCard';
import { ProcessTimeline } from '@/components/features/certificates/ProcessTimeline';
import { ExamScheduleSection } from '@/components/features/certificates/ExamScheduleSection';
import { CertificateLookupForm } from '@/components/features/certificates/CertificateLookupForm';
import { FAQSection } from '@/components/features/certificates/FAQSection';
import { certificates as sampleCertificates } from '@/data/certificates';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState(sampleCertificates);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [usingFallbackData, setUsingFallbackData] = useState(false);

  useEffect(() => {
    // 백엔드 API에서 자격증 데이터 가져오기 시도
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        setError(null);

        // TODO: 백엔드 API 구현 시 활성화
        // const response = await fetch('http://localhost:4000/api/certificates');
        // if (!response.ok) throw new Error('Failed to fetch certificates');
        // const data = await response.json();

        // 현재는 백엔드에 자격증 데이터가 없으므로 샘플 데이터 사용
        // if (data.length > 0) {
        //   setCertificates(data);
        // } else {
        //   setUsingFallbackData(true);
        // }

        setUsingFallbackData(true);
        setCertificates(sampleCertificates);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to load certificates')
        );
        setUsingFallbackData(true);
        setCertificates(sampleCertificates); // fallback to sample data
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const nationalCertificates = certificates.filter(
    (c) => c.type === 'national'
  );
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
            {loading ? (
              <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
                데이터 로딩 중...
              </div>
            ) : (
              <>
                <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                  국가자격증 {nationalCertificates.length}종
                </div>
                <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                  민간등록자격증 {privateCertificates.length}종
                </div>
                {usingFallbackData && (
                  <div className="rounded-full bg-yellow-500/30 px-4 py-2 backdrop-blur-sm">
                    샘플 데이터
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* 에러 메시지 */}
        {error && !loading && (
          <div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <h3 className="mb-2 font-semibold text-yellow-800">알림</h3>
            <p className="text-sm text-yellow-700">
              백엔드 서버와 연결할 수 없어 샘플 데이터를 표시합니다.
            </p>
          </div>
        )}

        {/* 로딩 상태 */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary-600" />
            <p className="text-gray-600">자격증 정보를 불러오는 중...</p>
          </div>
        ) : (
          <>
            {/* 국가자격증 섹션 */}
            <section className="mb-16">
              <div className="mb-8 text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                    <Shield className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    국가자격증
                  </h2>
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
          </>
        )}
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
