'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/users/login` : 'http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || '로그인에 실패했습니다');
        return;
      }

      // 로그인 성공
      if (data.success) {
        // 토큰과 사용자 정보를 localStorage에 저장
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));

        // 대시보드로 리다이렉트
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('로그인 중 오류가 발생했습니다. 서버 연결을 확인해주세요.');
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
            <p className="text-gray-600">회원 로그인</p>
          </div>

          {/* 로그인 폼 */}
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 에러 메시지 */}
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-800">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* 이메일 입력 */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  이메일
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              {/* 비밀번호 입력 */}
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
              </div>

              {/* 로그인 옵션 */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-600">로그인 상태 유지</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                  비밀번호 찾기
                </Link>
              </div>

              {/* 로그인 버튼 */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 font-semibold text-white transition-colors hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? '로그인 중...' : '로그인'}
                {!loading && <ArrowRight className="h-5 w-5" />}
              </button>
            </form>

            {/* 구분선 */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">또는</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* 회원가입 링크 */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                아직 회원이 아니신가요?{' '}
                <Link href="/register" className="font-semibold text-primary-600 hover:text-primary-700">
                  회원가입
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
