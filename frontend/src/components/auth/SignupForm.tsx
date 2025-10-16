'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

interface SignupFormProps {
  onSuccess?: () => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = '이메일은 필수입니다';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '유효한 이메일 형식이 아닙니다';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호는 필수입니다';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(formData.password)) {
      newErrors.password =
        '비밀번호는 최소 8자이며, 대문자, 소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다';
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다';
    }

    if (!formData.name) {
      newErrors.name = '이름은 필수입니다';
    } else if (formData.name.length < 2) {
      newErrors.name = '이름은 최소 2자 이상이어야 합니다';
    }

    if (formData.phone && !/^01[0-9]-?\d{3,4}-?\d{4}$/.test(formData.phone)) {
      newErrors.phone = '유효한 휴대폰 번호 형식이 아닙니다 (예: 010-1234-5678)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.users.register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone || undefined,
      });

      // 토큰과 사용자 정보 저장
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken || '');
        localStorage.setItem('user', JSON.stringify(response.user));

        onSuccess?.();
        router.push('/dashboard');
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        '회원가입에 실패했습니다. 다시 시도해주세요.';

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* 헤더 */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            이미 회원이신가요?{' '}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              로그인하기
            </Link>
          </p>
        </div>

        {/* 일반 에러 메시지 */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {/* 회원가입 폼 */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* 이메일 */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일 주소
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="이메일 주소"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="비밀번호 (대문자, 소문자, 숫자, 특수문자 포함)"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              autoComplete="new-password"
              required
              className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                errors.passwordConfirm ? 'border-red-300' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="비밀번호 확인"
              value={formData.passwordConfirm}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.passwordConfirm && (
              <p className="mt-1 text-sm text-red-600">{errors.passwordConfirm}</p>
            )}
          </div>

          {/* 이름 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              이름
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="이름"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* 휴대폰 */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              휴대폰 번호 (선택사항)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="010-1234-5678"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* 약관 동의 */}
          <div className="flex items-center">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
              <span>이용약관과 개인정보 처리방침에 동의합니다</span>
            </label>
          </div>

          {/* 회원가입 버튼 */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  가입 중...
                </span>
              ) : (
                '회원가입'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
