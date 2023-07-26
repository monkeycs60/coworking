'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CarouselState {
	activeIndex: number;
}

const initialState: CarouselState = {
	activeIndex: 0,
};

export const carouselSlice = createSlice({
	name: 'carousel',
	initialState,
	reducers: {
		setActiveIndex: (state, action: PayloadAction<number>) => {
			state.activeIndex = action.payload;
		},
	},
});

export const { setActiveIndex } = carouselSlice.actions;

export default carouselSlice.reducer;
