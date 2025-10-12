export type NoticeCategory =
  | 'general'        // 일반
  | 'education'      // 교육
  | 'certification'  // 자격증
  | 'event';         // 행사

export interface NoticeAttachment {
  id: string;
  name: string;
  size: number;
  url: string;
}

export interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  content: string;
  author: string;
  createdAt: string;
  views: number;
  isPinned: boolean;
  attachments?: NoticeAttachment[];
}

export interface NoticeFilters {
  category?: NoticeCategory | 'all';
  searchQuery?: string;
}
