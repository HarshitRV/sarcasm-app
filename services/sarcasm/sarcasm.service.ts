import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    AddSarcasmRequestBody,
    AUTH_ROUTE,
    Sarcasm,
    SARCASM_ROUTE,
    SarcasticComment,
    USER_ROUTE,
    UserAuthRequestBody,
    UserAuthSuccessResponse,
} from './types';
import { getAuthToken } from '@/utils/utils';

const getBaseUrl = () => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return process.env.EXPO_PUBLIC_DEV_API_URL;
        case 'production':
            return process.env.EXPO_PUBLIC_PROD_API_URL;
        default:
            return 'https://sarcasmapi.onrender.com/api/v1';
    }
};

export const sarcasmApi = createApi({
    reducerPath: 'sarcasmApi',
    tagTypes: ['SarcasticComments'],
    baseQuery: fetchBaseQuery({
        baseUrl: getBaseUrl(),
        prepareHeaders: async headers => {
            headers.set('Content-Type', 'application/json');

            const authToken = await getAuthToken();

            if (authToken) {
                headers.set('Authorization', `Bearer ${authToken}`);
            }
            return headers;
        },
    }),
    endpoints: builder => ({
        getRandomSarcasm: builder.query<Sarcasm, void>({
            query: () => SARCASM_ROUTE.GET_RANDOM,
        }),
        getAllSarcasm: builder.query<SarcasticComment[], void>({
            query: () => SARCASM_ROUTE.GET_ALL,
            providesTags: ['SarcasticComments'],
        }),
        addSarcasticComment: builder.mutation<Sarcasm, AddSarcasmRequestBody>({
            query: ({ sarcasm, override }) => ({
                url: USER_ROUTE.ADD_SARCASM,
                method: 'POST',
                body: { sarcasm, override },
            }),
            invalidatesTags: (_, error) => (error ? [] : ['SarcasticComments']),
        }),
        login: builder.mutation<UserAuthSuccessResponse, UserAuthRequestBody>({
            query: ({ email, password }) => ({
                url: AUTH_ROUTE.LOGIN,
                method: 'POST',
                body: { email, password },
            }),
        }),
    }),
});

export const {
    useGetRandomSarcasmQuery,
    useGetAllSarcasmQuery,
    useLoginMutation,
    useAddSarcasticCommentMutation,
} = sarcasmApi;
