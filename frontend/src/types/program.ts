export type ProgramCategory =
  | 'lifeguard'      // 수상안전요원
  | 'instructor'     // 수상안전강사
  | 'marine'         // 해양레저
  | 'special';       // 특별과정

export type ProgramLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Program {
  id: string;
  title: string;
  category: ProgramCategory;
  level: ProgramLevel;
  description: string;
  duration: number; // 일 단위
  price: number;
  capacity: number;
  instructor: string;
  location: string;
  features: string[];
  requirements: string[];
  schedule: {
    startDate: string;
    endDate: string;
    time: string;
  }[];
  curriculum: {
    day: number;
    title: string;
    topics: string[];
  }[];
  imageUrl?: string;
  isPopular?: boolean;
  tags: string[];
}

export interface ProgramFilters {
  category?: ProgramCategory | 'all';
  level?: ProgramLevel | 'all';
  priceRange?: [number, number];
  searchQuery?: string;
}
