'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Place } from '@/types/placePredictions';

interface AutocompleteState {
	input: string;
	predictions: Place[];
}

const initialState: AutocompleteState = {
	input: '',
	predictions: [],
};

export const autocompleteSlice = createSlice({
	name: 'autocomplete',
	initialState,
	reducers: {
		setInput: (state, action: PayloadAction<string>) => {
			state.input = action.payload;
		},
		setPredictions: (state, action: PayloadAction<Place[]>) => {
			state.predictions = action.payload;
		},
		resetAutocomplete: (state) => {
			state.input = '';
			state.predictions = [];
		},
	},
});

export const { setInput, setPredictions, resetAutocomplete } =
	autocompleteSlice.actions;

export default autocompleteSlice.reducer;
