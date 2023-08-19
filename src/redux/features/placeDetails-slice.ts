'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaceDetail } from '@/types/placeDetails';

interface PlaceDetailsState {
	details: PlaceDetail | null;
	imageUrls: string[];
	ratings: {
		calm: number | null;
		equipment: number | null;
		foodAndDrinks: number | null;
	};
}

const initialState: PlaceDetailsState = {
	details: null,
	imageUrls: [],
	ratings: {
		calm: null,
		equipment: null,
		foodAndDrinks: null,
	}
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
		setImageUrls: (state, action: PayloadAction<string[]>) => {
			state.imageUrls = action.payload;
		},

		resetImageUrls: (state) => {
			state.imageUrls = [];
		},
		setCalmRating: (state, action: PayloadAction<number>) => {
			state.ratings.calm = action.payload;
		},
		setEquipmentRating: (state, action: PayloadAction<number>) => {
			state.ratings.equipment = action.payload;
		},
		setFoodAndDrinksRating: (state, action: PayloadAction<number>) => {
			state.ratings.foodAndDrinks = action.payload;
		},
	},
});

export const { setPlaceDetails, resetPlaceDetails, setImageUrls, resetImageUrls, setCalmRating, setEquipmentRating, setFoodAndDrinksRating } = placeDetailsSlice.actions;

export default placeDetailsSlice.reducer;
