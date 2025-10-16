import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'isPublic';

/**
 * JWT 인증이 필요 없는 공개 엔드포인트에 사용
 * @example @Public()
 */
export const Public = () => SetMetadata(PUBLIC_KEY, true);
