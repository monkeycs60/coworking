'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaceDetail } from '@/types/placeDetails';

interface PlaceDetailsState {
    details: PlaceDetail | null;
    imageUrls: string[];
    reviewContent: string;
    ratings: {
        calm: number | null;
        equip: number | null;
        food: number | null;
        feeling: number | null;
    };
}

const initialState: PlaceDetailsState = {
    details: null,
    imageUrls: [],
    reviewContent: '',
    ratings: {
        calm: null,
        equip: null,
        food: null,
        feeling: null,
    },
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
        resetAllDetails: (state) => {
            state.details = null;
            state.imageUrls = [];
            state.reviewContent = '';
            state.ratings = {
                calm: null,
                equip: null,
                food: null,
                feeling: null,
            };
        },
        setReviewContent: (state, action: PayloadAction<string>) => {
            state.reviewContent = action.payload;
        },
        setRating: (
            state,
            action: PayloadAction<{
                type: 'calm' | 'equip' | 'food' | 'feeling';
                value: number;
            }>,
        ) => {
            state.ratings[action.payload.type] = action.payload.value;
        },
    },
});

export const {
    setPlaceDetails,
    resetPlaceDetails,
    setImageUrls,
    resetImageUrls,
    resetAllDetails,
    setReviewContent,
    setRating,
} = placeDetailsSlice.actions;

export default placeDetailsSlice.reducer;
