import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="card">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        로그인
      </h1>

      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            이메일
          </label>
          <input
            type="email"
            id="email"
            className="input"
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            className="input"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>로그인 상태 유지</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-primary-600 hover:underline"
          >
            비밀번호 찾기
          </Link>
        </div>

        <button type="submit" className="btn-primary w-full">
          로그인
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        계정이 없으신가요?{' '}
        <Link href="/register" className="text-primary-600 hover:underline">
          회원가입
        </Link>
      </div>
    </div>
  );
}
