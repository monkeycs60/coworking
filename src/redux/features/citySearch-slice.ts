'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CitySearchState {
    selectedCity: string | null;
    inputSearch: string;
}

const initialState: CitySearchState = {
    selectedCity: null,
    inputSearch: '',
};

export const citySearchSlice = createSlice({
    name: 'citySearch',
    initialState,
    reducers: {
        setSelectedCity: (state, action: PayloadAction<string>) => {
            state.selectedCity = action.payload;
        },
        resetSelectedCity: (state) => {
            state.selectedCity = null;
        },
        setInputSearch: (state, action: PayloadAction<string>) => {
            state.inputSearch = action.payload;
        },
        resetInputSearch: (state) => {
            state.inputSearch = '';
        },
    },
});

export const {
    setSelectedCity,
    resetSelectedCity,
    setInputSearch,
    resetInputSearch,
} = citySearchSlice.actions;

export default citySearchSlice.reducer;
