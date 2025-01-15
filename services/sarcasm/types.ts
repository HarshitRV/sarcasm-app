export interface Sarcasm {
    sarcasm: string;
}

export interface SarcasticComment extends Sarcasm {
    _id: string;
}

export interface ErrorResponse {
    message: string;
}

export interface AddSarcasmRequestBody {
    sarcasm: string;
}

export interface UserAuthRequestBody {
    email: string;
    password: string;
}

export interface UserAuthSuccessResponse {
    authToken: string;
}

export const AUTH_ROUTE = {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    RESET_PASSWORD_DATA: '/auth/reset-password-data',
    RESET_PASSWORD: '/auth/reset-password',
    GET_RESET_PASSWORD_PAGE: '/auth/reset-password/:userId/:token',
} as const;

export const USER_ROUTE = {
    ADD_SARCASM: '/user/sarcasm/add',
} as const;

export const SARCASM_ROUTE = {
    ALL: '/',
    GET_ALL: '/sarcasm/all',
    GET_RANDOM: '/sarcasm/random',
} as const;