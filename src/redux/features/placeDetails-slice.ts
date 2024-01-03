'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaceDetail } from '@/types/placeDetails';
import { arrayMove } from '@dnd-kit/sortable';

interface ImageSelectedUrl {
    id: number;
    url: string;
}

interface PlaceDetailsState {
    details: PlaceDetail | null;
    imageUrls: string[];
    imageSelectedUrls: ImageSelectedUrl[];
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
    imageSelectedUrls: [],
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
        addImageSelectedUrls: (state, action: PayloadAction<ImageSelectedUrl>) => {
            state.imageSelectedUrls.push(action.payload);
        },
        addImageSelectedUrlsBulk: (state, action: PayloadAction<ImageSelectedUrl[]>) => {
            const existingUrls = state.imageSelectedUrls.map((image) => image.url);
            const newUrls = action.payload.filter((image) => !existingUrls.includes(image.url));
            state.imageSelectedUrls = [...state.imageSelectedUrls, ...newUrls];
        },
        removeImageSelectedUrls: (state, action: PayloadAction<number>) => {
            state.imageSelectedUrls = state.imageSelectedUrls.filter(
                (image) => image.id !== action.payload,
            );
        },
        moveImageSelectedUrls: (state, action: PayloadAction<{ from: number; to: number }>) => {
            const { from, to } = action.payload;
            if (from === to) return;
            const newImageSelectedUrls = arrayMove(state.imageSelectedUrls, from, to);
            state.imageSelectedUrls = newImageSelectedUrls;
        },
        resetAllDetails: (state) => {
            state.details = null;
            state.imageUrls = [];
            state.imageSelectedUrls = [];
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
    addImageSelectedUrls,
    removeImageSelectedUrls,
    addImageSelectedUrlsBulk,
    moveImageSelectedUrls,
    resetAllDetails,
    setReviewContent,
    setRating,
} = placeDetailsSlice.actions;

export default placeDetailsSlice.reducer;
