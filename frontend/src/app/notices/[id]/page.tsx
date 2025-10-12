'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Eye,
  User,
  ArrowLeft,
  Download,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { notices, getCategoryLabel } from '@/data/notices';

export default function NoticeDetailPage() {
  const params = useParams();
  const noticeId = params.id as string;

  const noticeIndex = notices.findIndex((n) => n.id === noticeId);
  const notice = notices[noticeIndex];

  // 이전글/다음글
  const prevNotice = noticeIndex > 0 ? notices[noticeIndex - 1] : null;
  const nextNotice =
    noticeIndex < notices.length - 1 ? notices[noticeIndex + 1] : null;

  if (!notice) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-md">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              공지사항을 찾을 수 없습니다
            </h1>
            <p className="mb-8 text-gray-600">
              요청하신 공지사항이 존재하지 않거나 삭제되었습니다.
            </p>
            <Link
              href="/notices"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
            >
              <ArrowLeft className="h-5 w-5" />
              목록으로
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 파일 크기 포맷팅
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/notices"
              className="mb-4 inline-flex items-center gap-2 text-primary-100 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              목록으로
            </Link>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-primary-600">
                  {getCategoryLabel(notice.category)}
                </span>
                {notice.isPinned && (
                  <span className="rounded-full bg-yellow-500 px-3 py-1 text-sm font-bold text-white">
                    공지
                  </span>
                )}
              </div>
              <h1 className="mb-4 text-2xl font-bold md:text-3xl">
                {notice.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-primary-100">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {notice.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {notice.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {notice.views}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* 본문 */}
          <div className="mb-8 rounded-lg bg-white p-8 shadow-md">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: notice.content }}
              style={{
                lineHeight: '1.8',
              }}
            />
          </div>

          {/* 첨부파일 */}
          {notice.attachments && notice.attachments.length > 0 && (
            <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <Download className="h-5 w-5" />
                첨부파일 ({notice.attachments.length})
              </h3>
              <div className="space-y-2">
                {notice.attachments.map((file) => (
                  <a
                    key={file.id}
                    href={file.url}
                    download
                    className="flex items-center justify-between rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-primary-300 hover:bg-primary-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                        <Download className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {file.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatFileSize(file.size)}
                        </div>
                      </div>
                    </div>
                    <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700">
                      다운로드
                    </button>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 이전글/다음글 */}
          <div className="rounded-lg bg-white shadow-md">
            {/* 다음글 */}
            {nextNotice && (
              <Link
                href={`/notices/${nextNotice.id}`}
                className="flex items-center justify-between border-b-2 border-gray-100 p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">다음글</div>
                    <div className="font-medium text-gray-900 line-clamp-1">
                      {nextNotice.title}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{nextNotice.createdAt}</div>
              </Link>
            )}

            {/* 이전글 */}
            {prevNotice && (
              <Link
                href={`/notices/${prevNotice.id}`}
                className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">이전글</div>
                    <div className="font-medium text-gray-900 line-clamp-1">
                      {prevNotice.title}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{prevNotice.createdAt}</div>
              </Link>
            )}
          </div>

          {/* 목록 버튼 */}
          <div className="mt-8 text-center">
            <Link
              href="/notices"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 px-8 py-3 font-medium text-gray-700 transition-all hover:border-primary-600 hover:bg-primary-50 hover:text-primary-600"
            >
              <ArrowLeft className="h-5 w-5" />
              목록으로
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
