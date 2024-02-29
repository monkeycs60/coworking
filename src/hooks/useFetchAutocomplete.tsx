'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Prediction, Place } from '@/types/placePredictions';
import { useAutocompleteStore } from '@/zustand/stores/autoCompleteStore';

export const useFetchAutocomplete = () => {
    const { input, predictions, setInput, setPredictions, resetAutocomplete } =
        useAutocompleteStore();

    const [debouncedInput] = useDebounce(input, 250);

    useEffect(() => {
        const fetchAutocomplete = async () => {
            if (!debouncedInput?.length) {
                return;
            }

            const url = `/api/autocomplete?input=${debouncedInput}`;
            const res = await fetch(url);
            const data = await res.json();
            const places = data.data.predictions.map((pred: Prediction) => ({
                value: pred.place_id,
                label: pred.description,
            }));

            setPredictions(places);
        };

        fetchAutocomplete();
    }, [debouncedInput, setPredictions]);

    return {
        input,
        predictions,
        setInput,
        setPredictions,
        resetAutocomplete,
    };
};
