
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AddSarcasmRequestBody, AUTH_ROUTE, Sarcasm, SARCASM_ROUTE, SarcasticComment, USER_ROUTE, UserAuthRequestBody, UserAuthSuccessResponse } from './types'

export const sarcasmApi = createApi({
    reducerPath: 'sarcasmApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://sarcasmapi.onrender.com/api/v1' }),
    endpoints: (builder) => ({
        getRandomSarcasm: builder.query<Sarcasm, void>({
            query: () => SARCASM_ROUTE.GET_RANDOM,
        }),
        getAllSarcasm: builder.query<SarcasticComment[], void>({
            query: () => SARCASM_ROUTE.GET_ALL
        }),
        addSarcasticComment: builder.mutation<Sarcasm, AddSarcasmRequestBody>({
            query: ({ sarcasm }) => ({
                url: USER_ROUTE.ADD_SARCASM,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { sarcasm },
            })
        }),
        login: builder.mutation<UserAuthSuccessResponse, UserAuthRequestBody>({
            query: ({ email, password }) => ({
                url: AUTH_ROUTE.LOGIN,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { email, password },
            })
        }),
    })
})

export const { useGetRandomSarcasmQuery, useGetAllSarcasmQuery, useLoginMutation } = sarcasmApi