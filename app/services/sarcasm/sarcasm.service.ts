
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Sarcasm } from './types'

export const sarcasmApi = createApi({
    reducerPath: 'sarcasmApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://sarcasmapi.onrender.com' }),
    endpoints: (builder) => ({
        getRandomSarcasm: builder.query<Sarcasm, void>({
            query: () => '/',
        }),
    }),
})

export const { useGetRandomSarcasmQuery } = sarcasmApi