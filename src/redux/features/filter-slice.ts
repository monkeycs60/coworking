'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    cafe: boolean;
    hotel: boolean;
    library: boolean;
    thirdPlace: boolean;
    otherPlace: boolean;
    calm: boolean;
    equipment: boolean;
    food: boolean;
    feeling: boolean;
    wifi: boolean;
    parking: boolean;
    callFriendly: boolean;
    plugs: boolean;
    handicap: boolean;
    outside: boolean;
    restaurant: boolean;
}

const initialState: FilterState = {
    cafe: false,
    hotel: false,
    library: false,
    thirdPlace: false,
    otherPlace: false,
    calm: false,
    equipment: false,
    food: false,
    feeling: false,
    wifi: false,
    parking: false,
    callFriendly: false,
    plugs: false,
    handicap: false,
    outside: false,
    restaurant: false,
};

export const autocompleteSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setTrue: (state, action: PayloadAction<keyof FilterState>) => {
            state[action.payload] = true;
        },
        setFalse: (state, action: PayloadAction<keyof FilterState>) => {
            state[action.payload] = false;
        },
    },
});

export const { setTrue, setFalse } = autocompleteSlice.actions;

export default autocompleteSlice.reducer;
