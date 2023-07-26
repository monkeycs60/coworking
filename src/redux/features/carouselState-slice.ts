'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CarouselState {
	activeIndices: { [carouselId: string]: number };
}

const initialState: CarouselState = {
	activeIndices: {},
};

export const carouselSlice = createSlice({
	name: 'carousel',
	initialState,
	reducers: {
		setActiveIndex: (
			state,
			action: PayloadAction<{ carouselId: string; index: number }>
		) => {
			const { carouselId, index } = action.payload;
			state.activeIndices[carouselId] = index;
		},
	},
});

export const { setActiveIndex } = carouselSlice.actions;

export default carouselSlice.reducer;
