import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import '@/styles/globals.css';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: {
    default: '한국수상안전협회',
    template: '%s | 한국수상안전협회',
  },
  description:
    '한국수상안전협회는 수상안전 교육, 자격증 발급, 봉사활동을 통해 안전한 수상환경을 만들어갑니다.',
  keywords: [
    '수상안전',
    '수상안전교육',
    '수상안전요원',
    '수상안전강사',
    '자격증',
    '봉사활동',
  ],
  authors: [{ name: '한국수상안전협회' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: '한국수상안전협회',
    description: '수상안전 교육 및 자격증 발급 전문기관',
    siteName: '한국수상안전협회',
  },
  twitter: {
    card: 'summary_large_image',
    title: '한국수상안전협회',
    description: '수상안전 교육 및 자격증 발급 전문기관',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
