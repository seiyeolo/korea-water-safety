'use client';

import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

export function CertificateLookupForm() {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('백엔드 연동 대기 중입니다. 자격증 번호: ' + certificateNumber);
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
            htmlFor="certificateNumber"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            자격증 번호
          </label>
          <input
            type="text"
            id="certificateNumber"
            value={certificateNumber}
            onChange={(e) => setCertificateNumber(e.target.value)}
            placeholder="예: WSA-2024-12345"
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

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-4 font-bold text-white transition-colors hover:bg-primary-700"
        >
          <Search className="h-5 w-5" />
          조회하기
        </button>
      </form>

      <div className="mt-6 flex items-start gap-3 rounded-lg bg-yellow-50 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
        <div className="text-sm text-yellow-800">
          <div className="font-semibold">안내사항</div>
          <ul className="mt-2 space-y-1">
            <li>• 자격증 번호는 자격증 상단에 표기되어 있습니다.</li>
            <li>• 조회 시 본인의 생년월일을 정확히 입력해주세요.</li>
            <li>• 현재 백엔드 시스템 연동 준비 중입니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
