'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, ArrowRight, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    agreePrivacy: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 유효성 검사
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다');
      return;
    }

    if (!formData.agreeTerms || !formData.agreePrivacy) {
      setError('필수 약관에 동의해주세요');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://strong-wholeness-production.up.railway.app/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || '회원가입에 실패했습니다');
        return;
      }

      // 회원가입 성공
      if (data.success) {
        alert(data.message || '회원가입이 완료되었습니다!');
        router.push('/login');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError('회원가입 중 오류가 발생했습니다. 서버 연결을 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-md">
          {/* 로고 및 제목 */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <h1 className="mb-2 text-3xl font-bold text-primary-600">
                한국수상안전협회
              </h1>
            </Link>
            <p className="text-gray-600">회원가입</p>
          </div>

          {/* 회원가입 폼 */}
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 에러 메시지 */}
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-800">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* 이름 입력 */}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                  이름 *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    placeholder="홍길동"
                  />
                </div>
              </div>

              {/* 이메일 입력 */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  이메일 *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              {/* 전화번호 입력 */}
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                  전화번호 *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>

              {/* 비밀번호 입력 */}
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                  비밀번호 *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={6}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    placeholder="6자 이상"
                  />
                </div>
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
                  비밀번호 확인 *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    minLength={6}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    placeholder="비밀번호 재입력"
                  />
                </div>
              </div>

              {/* 약관 동의 */}
              <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    이용약관에 동의합니다 (필수)
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    개인정보 처리방침에 동의합니다 (필수)
                  </span>
                </label>
              </div>

              {/* 회원가입 버튼 */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 font-semibold text-white transition-colors hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? '가입 진행 중...' : '회원가입 완료'}
                {!loading && <ArrowRight className="h-5 w-5" />}
              </button>
            </form>

            {/* 구분선 */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">또는</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* 로그인 링크 */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                이미 회원이신가요?{' '}
                <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-700">
                  로그인
                </Link>
              </p>
            </div>
          </div>

          {/* 추가 링크 */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">
              ← 홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
