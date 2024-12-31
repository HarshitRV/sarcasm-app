import { configureStore } from '@reduxjs/toolkit'
import { sarcasmApi } from '../services/sarcasm/sarcasm.service'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        [sarcasmApi.reducerPath]: sarcasmApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sarcasmApi.middleware),
})

setupListeners(store.dispatch)
