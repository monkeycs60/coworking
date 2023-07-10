'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaceDetail } from '@/hooks/useFetchPlaceDetails';

interface PlaceDetailsState {
	details: PlaceDetail | null;
}

const initialState: PlaceDetailsState = {
	details: null,
};

export const placeDetailsSlice = createSlice({
	name: 'placeDetails',
	initialState,
	reducers: {
		setPlaceDetails: (state, action: PayloadAction<PlaceDetail>) => {
			state.details = action.payload;
		},
		resetPlaceDetails: (state) => {
			state.details = null;
		},
	},
});

export const { setPlaceDetails, resetPlaceDetails } = placeDetailsSlice.actions;

export default placeDetailsSlice.reducer;
