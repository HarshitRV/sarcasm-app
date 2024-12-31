
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Sarcasm, SarcasticComment } from './types'

export const sarcasmApi = createApi({
    reducerPath: 'sarcasmApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://sarcasmapi.onrender.com' }),
    endpoints: (builder) => ({
        getRandomSarcasm: builder.query<Sarcasm, void>({
            query: () => '/',
        }),
        getAllSarcasm: builder.query<SarcasticComment[], void>({
            query: () => '/sarcasm/all'
        })
    }),
})

export const { useGetRandomSarcasmQuery, useGetAllSarcasmQuery } = sarcasmApi