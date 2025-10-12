'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="text-2xl font-bold text-primary-600">
            한국수상안전협회
          </Link>

          {/* 메인 네비게이션 */}
          <ul className="hidden space-x-8 md:flex">
            <li>
              <Link
                href="/about"
                className="text-gray-700 transition-colors hover:text-primary-600"
              >
                협회소개
              </Link>
            </li>
            <li>
              <Link
                href="/programs"
                className="text-gray-700 transition-colors hover:text-primary-600"
              >
                교육프로그램
              </Link>
            </li>
            <li>
              <Link
                href="/certifications"
                className="text-gray-700 transition-colors hover:text-primary-600"
              >
                자격증
              </Link>
            </li>
            <li>
              <Link
                href="/safety"
                className="text-gray-700 transition-colors hover:text-primary-600"
              >
                안전정보
              </Link>
            </li>
            <li>
              <Link
                href="/volunteer"
                className="text-gray-700 transition-colors hover:text-primary-600"
              >
                봉사활동
              </Link>
            </li>
            <li>
              <Link
                href="/notices"
                className="text-gray-700 transition-colors hover:text-primary-600"
              >
                공지사항
              </Link>
            </li>
          </ul>

          {/* 사용자 메뉴 */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-700 transition-colors hover:text-primary-600"
            >
              로그인
            </Link>
            <Link href="/register" className="btn-primary">
              회원가입
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
