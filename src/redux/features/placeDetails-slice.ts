'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaceDetail } from '@/types/placeDetails';
import { arrayMove } from '@dnd-kit/sortable';

interface ImageSelectedUrl {
    id: number;
    url: string;
}

export enum MusicLevel {
    NoMusic = "NoMusic",
    DiscreteMusic = "DiscreteMusic",
    RandomMusic = "RandomMusic",
    LoudMusic = "LoudMusic"
}

export enum WorkComfort {
    SoloDesk = "SoloDesk",
    SmallGroupDesk = "SmallGroupDesk",
    LargeGroupDesk = "LargeGroupDesk"
}

export enum InternetQuality {
    HighWifi = "HighWifi",
    MediumWifi = "MediumWifi",
    LowWifi = "LowWifi",
    NoWifi = "NoWifi"
}

export enum WorkspaceComposition {
    PrivateBooths = "PrivateBooths",
    LargeTables = "LargeTables"
}

export enum HasToCall {
    CallFriendly = "CallFriendly",
    CallImpossible = "CallImpossible"
}

export enum DrinksAndFood {
    Snacks = "Snacks",
    Meals = "Meals",
    SoftDrinks = "SoftDrinks",
    AlcoholicDrinks = "AlcoholicDrinks"
}


export interface Experience {
    musicLevel: MusicLevel[];
    workComfort: WorkComfort[];
    internetQuality: InternetQuality[];
    workspaceComposition: WorkspaceComposition[];
    hasToCall: HasToCall[];
    drinksAndFood: DrinksAndFood[];
}

interface PlaceDetailsState {
    details: PlaceDetail | null;
    imageUrls: string[];
    imageSelectedUrls: ImageSelectedUrl[];
    experience: Experience;
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
    experience: {
        musicLevel: [],
        workComfort: [],
        internetQuality: [],
        workspaceComposition: [],
        hasToCall: [],
        drinksAndFood: [],
    },
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
        setMusicLevel: (state, action: PayloadAction<Experience['musicLevel']>) => {
            state.experience.musicLevel = action.payload;
        },
        setWorkComfort: (state, action: PayloadAction<Experience['workComfort']>) => {
            state.experience.workComfort = action.payload;
        },
        setInternetQuality: (state, action: PayloadAction<Experience['internetQuality']>) => {
            state.experience.internetQuality = action.payload;
        },
        setWorkspaceComposition: (
            state,
            action: PayloadAction<Experience['workspaceComposition']>,
        ) => {
            state.experience.workspaceComposition = action.payload;
        },
        setHasToCall: (state, action: PayloadAction<Experience['hasToCall']>) => {
            state.experience.hasToCall = action.payload;
        },
        setDrinksAndFood: (state, action: PayloadAction<Experience['drinksAndFood']>) => {
            state.experience.drinksAndFood = action.payload;
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
        resetAllDetails: (state) => {
            state.details = null;
            state.imageUrls = [];
            state.imageSelectedUrls = [];
            state.experience = {
                musicLevel: [],
                workComfort: [],
                internetQuality: [],
                workspaceComposition: [],
                hasToCall: [],
                drinksAndFood: [],
            };
            state.reviewContent = '';
            state.ratings = {
                calm: null,
                equip: null,
                food: null,
                feeling: null,
            };
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
    setMusicLevel,
    setWorkComfort,
    setInternetQuality,
    setWorkspaceComposition,
    setHasToCall,
    setDrinksAndFood,
    setReviewContent,
    setRating,
    resetAllDetails,
} = placeDetailsSlice.actions;

export default placeDetailsSlice.reducer;
