'use client';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import placeDetailsReducer from './features/placeDetails-slice';
import autoCompleteReducer from './features/autoComplete-slice';
import carouselReducer from './features/carouselState-slice';
import citySearchReducer from './features/citySearch-slice';
import filterReducer from './features/filter-slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        placeDetails: placeDetailsReducer,
        autoComplete: autoCompleteReducer,
        carouselState: carouselReducer,
        citySearch: citySearchReducer,
        filter: filterReducer,
    },
    middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
