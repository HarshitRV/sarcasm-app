import { ObjectValues } from '@/utils/type.utils';

export const ERROR_CODES = {
    AUTH_TOKEN_EXPIRED: 'auth.token.expired',
    AUTH_TOKEN_NOT_FOUND: 'auth.token.not.found',
    DUPLICATE_SARCASM: 'duplicate.sarcasm',
    USER_NOT_FOUND: 'user.not.found',
    INCORRECT_CREDENTIALS: 'incorrect.credentials',
    DUPLICATE_USER: 'duplicate.user',
    BAD_REQUEST: 'bad.request',
    NOT_FOUND: 'not.found',
    INTERNAL_SERVER_ERROR: 'internal.server.error',
    MISSING_REQUIRED_ROLE: 'missing.required.role',

    // Default error code
    UNKNOWN_ERROR: 'unknown.error',
} as const;

export type ErrorCode = ObjectValues<typeof ERROR_CODES>;
