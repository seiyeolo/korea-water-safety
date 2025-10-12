'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, LogOut } from 'lucide-react';

const navigation = [
  { name: '협회소개', href: '/about' },
  { name: '교육프로그램', href: '/programs' },
  { name: '공지사항', href: '/notices' },
  { name: '자격증안내', href: '/certificates' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // localStorage에서 사용자 정보 가져오기
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link
            href="/"
            className="text-xl font-bold text-primary-600 md:text-2xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            한국수상안전협회
          </Link>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden items-center space-x-8 md:flex">
            <ul className="flex space-x-8">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-700 transition-colors hover:text-primary-600"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 로그인/회원가입 또는 사용자 정보 */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="flex items-center gap-2 text-sm text-gray-700">
                    <User className="h-4 w-4" />
                    {user.name}님
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    <LogOut className="h-4 w-4" />
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600"
                  >
                    로그인
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* 모바일 햄버거 메뉴 버튼 */}
          <button
            type="button"
            className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <div className="mt-4 border-t pt-4 md:hidden">
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 모바일 로그인/회원가입 */}
            <div className="mt-4 space-y-3 border-t pt-4">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700">
                    <User className="h-4 w-4" />
                    {user.name}님
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    <LogOut className="h-4 w-4" />
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    로그인
                  </Link>
                  <Link
                    href="/register"
                    className="block rounded-lg bg-primary-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-primary-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
