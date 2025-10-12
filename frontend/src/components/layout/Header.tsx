'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: '협회소개', href: '/about' },
  { name: '교육프로그램', href: '/programs' },
  { name: '공지사항', href: '/notices' },
  { name: '자격증안내', href: '/certificates' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <ul className="hidden space-x-8 md:flex">
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
          </div>
        )}
      </nav>
    </header>
  );
}
