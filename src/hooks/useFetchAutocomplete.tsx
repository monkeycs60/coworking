import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Prediction, Place } from '@/types/placePredictions';

export const useFetchAutocomplete = (input: string) => {
	const [debouncedInput] = useDebounce(input, 2000);
	const [predictions, setPredictions] = useState<Place[]>([]);

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
	}, [debouncedInput]);

	return predictions;
};
