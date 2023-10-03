'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
    Café: boolean;
    Hôtel: boolean;
    Bibliothèque: boolean;
    Tiers_lieu: boolean;
    Autre: boolean;
    Calme: boolean;
    Equipement: boolean;
    Food: boolean;
    Feeling: boolean;
    Wifi: boolean;
    Parking: boolean;
    Call_friendly: boolean;
    Prises_électriques: boolean;
    Accès_handicapé: boolean;
    Extérieur: boolean;
    Restauration: boolean;
}

const initialState: FilterState = {
    Café: false,
    Hôtel: false,
    Bibliothèque: false,
    Tiers_lieu: false,
    Autre: false,
    Calme: false,
    Equipement: false,
    Food: false,
    Feeling: false,
    Wifi: false,
    Parking: false,
    Call_friendly: false,
    Prises_électriques: false,
    Accès_handicapé: false,
    Extérieur: false,
    Restauration: false,
};

export const autocompleteSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        toggleValue: (state, action: PayloadAction<keyof FilterState>) => {
            const key = action.payload;

            // S'assurer que la clé est bien une clé de FilterState
            if (key in state) {
                state[key] = !state[key];
                console.log('state', state);

                // Catégories
                const FACILITY_TYPES: (keyof FilterState)[] = [
                    'Café',
                    'Hôtel',
                    'Bibliothèque',
                    'Tiers_lieu',
                    'Autre',
                ];
                const STRENGTH: (keyof FilterState)[] = [
                    'Calme',
                    'Equipement',
                    'Food',
                    'Feeling',
                ];

                // Réinitialiser d'autres valeurs dans la même catégorie
                const resetOtherValuesInCategory = (
                    category: (keyof FilterState)[],
                ) => {
                    if (state[key]) {
                        category.forEach((type) => {
                            if (type !== key) {
                                state[type] = false;
                            }
                        });
                    }
                };

                // Vérifier dans quelle catégorie se trouve la clé et réinitialiser les autres valeurs
                if (FACILITY_TYPES.includes(key)) {
                    resetOtherValuesInCategory(FACILITY_TYPES);
                } else if (STRENGTH.includes(key)) {
                    resetOtherValuesInCategory(STRENGTH);
                }
            }
        },
    },
});

export const { toggleValue } = autocompleteSlice.actions;

export default autocompleteSlice.reducer;
