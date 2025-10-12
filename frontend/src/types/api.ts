// API 응답 타입 정의

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  database: 'connected' | 'disconnected';
  version?: string;
  error?: string;
}

export interface DatabaseStats {
  users: number;
  programs: number;
  posts: number;
  certificates: number;
  timestamp: string;
}

// 백엔드 API 응답 타입 (Prisma 스키마 기반)
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  birthDate: string | null;
  address: string | null;
  role: 'USER' | 'INSTRUCTOR' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

export interface EducationProgram {
  id: string;
  title: string;
  description: string;
  content: string;
  instructorName: string;
  duration: number;
  capacity: number;
  price: number;
  location: string;
  address: string;
  thumbnailUrl: string | null;
  imageUrls: string[];
  startDate: string;
  endDate: string;
  recruitStartDate: string;
  recruitEndDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  registrations?: Registration[];
}

export interface Registration {
  id: string;
  userId: string;
  programId: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  paymentAmount: number;
  isPaid: boolean;
  paidAt: string | null;
  completedAt: string | null;
  certificateIssued: boolean;
  memo: string | null;
  createdAt: string;
  updatedAt: string;
  user?: Partial<User>;
  program?: Partial<EducationProgram>;
}

export interface Post {
  id: string;
  authorId: string;
  title: string;
  content: string;
  category: 'NOTICE' | 'NEWS' | 'EVENT' | 'FAQ';
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  views: number;
  isPinned: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    email?: string;
  };
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  postId: string;
  filename: string;
  originalFilename: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
}

export interface Certificate {
  id: string;
  userId: string;
  certificateNumber: string;
  certificateName: string;
  type: 'NATIONAL' | 'PRIVATE';
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
  issueDate: string;
  expiryDate: string | null;
  certificateUrl: string | null;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
}

// API 요청 파라미터 타입
export interface GetProgramsParams {
  isActive?: boolean;
}

export interface GetPostsParams {
  category?: 'NOTICE' | 'NEWS' | 'EVENT' | 'FAQ';
  page?: number;
  limit?: number;
}

export interface GetUsersParams {
  role?: 'USER' | 'INSTRUCTOR' | 'ADMIN';
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}
