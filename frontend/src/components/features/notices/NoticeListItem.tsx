import Link from 'next/link';
import { Calendar, Eye, Pin, Paperclip } from 'lucide-react';
import { Notice } from '@/types/notice';
import { getCategoryLabel } from '@/data/notices';

interface NoticeListItemProps {
  notice: Notice;
}

export function NoticeListItem({ notice }: NoticeListItemProps) {
  return (
    <Link
      href={`/notices/${notice.id}`}
      className="block rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* 제목 영역 */}
          <div className="mb-3 flex items-start gap-3">
            {notice.isPinned && (
              <Pin className="mt-1 h-5 w-5 flex-shrink-0 text-primary-600" />
            )}
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-bold text-gray-900 line-clamp-1 hover:text-primary-600">
                {notice.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span className="rounded-full bg-primary-100 px-3 py-0.5 text-xs font-medium text-primary-700">
                  {getCategoryLabel(notice.category)}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {notice.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {notice.views}
                </span>
                {notice.attachments && notice.attachments.length > 0 && (
                  <span className="flex items-center gap-1 text-primary-600">
                    <Paperclip className="h-4 w-4" />
                    {notice.attachments.length}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 내용 미리보기 */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {notice.content
              .replace(/<[^>]*>/g, '')
              .replace(/\s+/g, ' ')
              .trim()}
          </p>
        </div>

        {/* 작성자 */}
        <div className="flex-shrink-0 text-right">
          <div className="text-sm text-gray-500">작성자</div>
          <div className="font-medium text-gray-900">{notice.author}</div>
        </div>
      </div>
    </Link>
  );
}
