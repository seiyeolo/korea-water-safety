/**
 * 애플리케이션 라우트 상수
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  ABOUT: '/about',
  PROGRAMS: '/programs',
  PROGRAM_DETAIL: (id: string) => `/programs/${id}`,
  CERTIFICATIONS: '/certifications',
  CERTIFICATION_DETAIL: (id: string) => `/certifications/${id}`,
  SAFETY: '/safety',
  VOLUNTEER: '/volunteer',
  NOTICES: '/notices',
  NOTICE_DETAIL: (id: string) => `/notices/${id}`,
  FAQ: '/faq',

  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Dashboard routes (authenticated)
  DASHBOARD: '/my',
  PROFILE: '/my/profile',
  MY_ENROLLMENTS: '/my/enrollments',
  MY_CERTIFICATIONS: '/my/certifications',
  MY_VOLUNTEER: '/my/volunteer',
  MY_PAYMENTS: '/my/payments',

  // Admin routes
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_PROGRAMS: '/admin/programs',
  ADMIN_CERTIFICATIONS: '/admin/certifications',
  ADMIN_CONTENT: '/admin/content',

  // API routes
  API: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
      REFRESH: '/api/auth/refresh',
    },
    USERS: {
      ME: '/api/users/me',
    },
    PROGRAMS: {
      LIST: '/api/programs',
      DETAIL: (id: string) => `/api/programs/${id}`,
    },
  },
} as const;
