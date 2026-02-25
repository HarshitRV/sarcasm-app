import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state) {
			state.isAuthenticated = true;
		},
		logout(state) {
			state.isAuthenticated = false;
		},
	},
	selectors: {
		isAuthenticated: (state) => state.isAuthenticated,
	},
});

export const { login, logout } = authSlice.actions;
export const { isAuthenticated } = authSlice.selectors;

export default authSlice;
