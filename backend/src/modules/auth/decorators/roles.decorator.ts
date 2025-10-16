import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * 특정 역할만 접근 가능한 엔드포인트에 사용
 * @example @Roles('ADMIN', 'INSTRUCTOR')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
