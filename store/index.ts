import { configureStore } from '@reduxjs/toolkit';
import { sarcasmApi } from '../services/sarcasm/sarcasm.service';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from '@/slice/auth-slice';

export const store = configureStore({
    reducer: {
        [sarcasmApi.reducerPath]: sarcasmApi.reducer,
        [authSlice.reducerPath]: authSlice.reducer,
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(sarcasmApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

setupListeners(store.dispatch);
