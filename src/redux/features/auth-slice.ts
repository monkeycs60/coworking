'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
	isAuth: boolean;
	id: string | undefined;
	name: string | undefined;
	isModerator: boolean;
}

export interface AuthState {
	user?: Partial<User> | null;
}

const initialState: AuthState = {
	user: {
		isAuth: false,
		id: undefined,
		name: undefined,
		isModerator: false,
	},
};

export const auth = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		changeName: (state, action: PayloadAction<string>) => {
			if (state.user) {
				state.user.name = action.payload;
			}
		},
	},
});

export const { setUser, changeName } = auth.actions;

export default auth.reducer;
