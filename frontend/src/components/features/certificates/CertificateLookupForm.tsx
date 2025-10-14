'use client';

import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface CertificateResult {
  id: string;
  certificateNumber: string;
  certificateName: string;
  type: 'NATIONAL' | 'PRIVATE';
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
  issueDate: string;
  expiryDate: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export function CertificateLookupForm() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CertificateResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const params = new URLSearchParams({
        name,
        birthDate,
        phone,
      });

      const response = await fetch(
        `${API_URL}/certificates/lookup?${params.toString()}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          const errorData = await response.json();
          throw new Error(errorData.message || '일치하는 정보를 찾을 수 없습니다.');
        }
        throw new Error('자격증 조회에 실패했습니다.');
      }

      const data = await response.json();
      setResults(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg border-2 border-primary-200 bg-white p-8 shadow-lg">
      <div className="mb-6 text-center">
        <h3 className="mb-2 text-2xl font-bold text-gray-900">
          자격증 진위 확인
        </h3>
        <p className="text-gray-600">
          발급받은 자격증의 진위 여부를 확인하실 수 있습니다
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            이름
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 홍길동"
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-colors focus:border-primary-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="birthDate"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            생년월일
          </label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-colors focus:border-primary-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            휴대폰 번호
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="예: 010-1234-5678"
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-colors focus:border-primary-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-4 font-bold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              조회 중...
            </>
          ) : (
            <>
              <Search className="h-5 w-5" />
              조회하기
            </>
          )}
        </button>
      </form>

      {/* 조회 결과 */}
      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-6 w-6" />
            <h4 className="text-lg font-bold">총 {results.length}개의 자격증이 조회되었습니다</h4>
          </div>

          {results.map((cert, index) => (
            <div key={cert.id} className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
              <div className="mb-3 flex items-center justify-between">
                <h5 className="text-base font-bold text-green-800">자격증 #{index + 1}</h5>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    cert.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-800'
                      : cert.status === 'EXPIRED'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {cert.status === 'ACTIVE'
                    ? '유효'
                    : cert.status === 'EXPIRED'
                      ? '만료'
                      : '취소'}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-gray-700">자격증 번호:</span>
                  <span className="col-span-2 text-gray-900">{cert.certificateNumber}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-gray-700">자격증명:</span>
                  <span className="col-span-2 text-gray-900">{cert.certificateName}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-gray-700">자격증 유형:</span>
                  <span className="col-span-2 text-gray-900">
                    {cert.type === 'NATIONAL' ? '국가자격증' : '민간등록자격증'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-gray-700">발급일:</span>
                  <span className="col-span-2 text-gray-900">
                    {new Date(cert.issueDate).toLocaleDateString('ko-KR')}
                  </span>
                </div>
                {cert.expiryDate && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-semibold text-gray-700">만료일:</span>
                    <span className="col-span-2 text-gray-900">
                      {new Date(cert.expiryDate).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <div className="mt-6 rounded-lg border-2 border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-2 text-red-800">
            <XCircle className="h-6 w-6" />
            <div>
              <h4 className="font-bold">조회 실패</h4>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-start gap-3 rounded-lg bg-yellow-50 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
        <div className="text-sm text-yellow-800">
          <div className="font-semibold">안내사항</div>
          <ul className="mt-2 space-y-1">
            <li>• 본인의 이름, 생년월일, 휴대폰 번호를 정확히 입력해주세요.</li>
            <li>• 입력하신 정보와 일치하는 모든 자격증이 조회됩니다.</li>
            <li>• 개인정보는 조회 목적으로만 사용되며 저장되지 않습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
