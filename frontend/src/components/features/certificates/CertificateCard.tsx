import { Award, CheckCircle, Building, Calendar } from 'lucide-react';
import { Certificate } from '@/types/certificate';

interface CertificateCardProps {
  certificate: Certificate;
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const isNational = certificate.type === 'national';

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border-2 p-6 transition-all hover:shadow-xl ${
        isNational
          ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 hover:border-yellow-400'
          : 'border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:border-blue-400'
      }`}
    >
      {/* 배지 */}
      <div className="mb-4 flex items-center justify-between">
        <div
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold ${
            isNational
              ? 'bg-yellow-500 text-white'
              : 'bg-blue-600 text-white'
          }`}
        >
          <Award className="h-4 w-4" />
          {isNational ? '국가자격증' : '민간등록자격증'}
        </div>
        <div
          className={`text-3xl ${
            isNational ? 'text-yellow-600' : 'text-blue-600'
          }`}
        >
          <Award className="h-8 w-8" />
        </div>
      </div>

      {/* 자격증명 */}
      <h3
        className={`mb-4 text-2xl font-bold ${
          isNational ? 'text-yellow-900' : 'text-blue-900'
        }`}
      >
        {certificate.name}
      </h3>

      {/* 교육 정보 (민간자격증만) */}
      {certificate.education && (
        <div className="mb-4 rounded-lg bg-white/60 p-4">
          <div className="mb-2 text-sm font-semibold text-gray-700">
            교육 과정
          </div>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>기간: {certificate.education.duration}</span>
            <span>시간: {certificate.education.hours}</span>
          </div>
        </div>
      )}

      {/* 자격 요건 */}
      <div className="mb-4">
        <div
          className={`mb-2 flex items-center gap-2 text-sm font-semibold ${
            isNational ? 'text-yellow-800' : 'text-blue-800'
          }`}
        >
          <CheckCircle className="h-4 w-4" />
          자격 요건
        </div>
        <ul className="space-y-1">
          {certificate.requirements.map((req, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 시험 정보 */}
      <div className="mb-4">
        <div
          className={`mb-2 flex items-center gap-2 text-sm font-semibold ${
            isNational ? 'text-yellow-800' : 'text-blue-800'
          }`}
        >
          <CheckCircle className="h-4 w-4" />
          시험 구성
        </div>
        <div className="flex flex-wrap gap-2">
          {certificate.exam.map((examType, index) => (
            <span
              key={index}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                isNational
                  ? 'bg-yellow-200 text-yellow-800'
                  : 'bg-blue-200 text-blue-800'
              }`}
            >
              {examType}
            </span>
          ))}
        </div>
      </div>

      {/* 발급 기관 및 유효기간 */}
      <div className="mb-4 grid gap-3 rounded-lg bg-white/60 p-4 md:grid-cols-2">
        <div>
          <div className="mb-1 flex items-center gap-1 text-xs text-gray-500">
            <Building className="h-3 w-3" />
            발급 기관
          </div>
          <div className="font-semibold text-gray-900">
            {certificate.issuer}
          </div>
        </div>
        <div>
          <div className="mb-1 flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            유효 기간
          </div>
          <div className="font-semibold text-gray-900">
            {certificate.validity}
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <button
        className={`w-full rounded-lg py-3 font-semibold text-white transition-all ${
          isNational
            ? 'bg-yellow-600 hover:bg-yellow-700'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        자세히 보기
      </button>
    </div>
  );
}
