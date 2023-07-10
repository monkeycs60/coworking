import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Prediction, Place } from '@/types/placePredictions';
import { useAppDispatch, useAppSelector } from './useRedux';
import { setInput, setPredictions } from '@/redux/features/autoComplete-slice';

export const useFetchAutocomplete = () => {
	const dispatch = useAppDispatch();
	const reduxStore = useAppSelector((state) => state);

	const inputField = useAppSelector((state) => state.autoComplete.input);
	const predictions = useAppSelector(
		(state) => state.autoComplete.predictions
	);

	const [debouncedInput] = useDebounce(inputField, 500);

	console.log('REDUXSTOREEEE', reduxStore);

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

			dispatch(setPredictions(places));
		};

		fetchAutocomplete();
	}, [debouncedInput, dispatch]);

	return {
		inputField,
		predictions,
		setInput: (input: string) => dispatch(setInput(input)).payload,
	};
};
