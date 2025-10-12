import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* 협회 정보 */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              한국수상안전협회
            </h3>
            <p className="text-sm text-gray-600">
              수상안전 교육 및 자격증 발급 전문기관
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">빠른 링크</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-primary-600">
                  협회소개
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-primary-600">
                  교육프로그램
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-primary-600">
                  자격증
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-primary-600">
                  봉사활동
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객 지원 */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">고객 지원</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/notices" className="hover:text-primary-600">
                  공지사항
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-600">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">연락처</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Tel: 02-1234-5678</li>
              <li>Email: info@watersafety.org</li>
              <li>주소: 서울시 강남구 ...</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">
              © 2024 한국수상안전협회. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-primary-600">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="hover:text-primary-600">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
