'use client';

import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import {
	setImageUrls,
	resetImageUrls,
} from '@/redux/features/placeDetails-slice';
import { AddPlaceSchemaType, AddPlaceSchema } from '@/types/addPlace';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { daysOfWeek } from '@/lib/const/daysOfWeek';
import { extractCityFromAdrAddress } from '@/lib/functions/extractCityFromAddress';
import { useEffect } from 'react';
import { Star } from '@phosphor-icons/react';
import StarRating from '../ui/StarRating';

const AddPlace = () => {
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AddPlaceSchemaType>({
		resolver: zodResolver(AddPlaceSchema),
	});

	const placeDetails = useAppSelector((state) => state.placeDetails.details);
	const imageUrls = useAppSelector((state) => state.placeDetails.imageUrls); // fetch image URLs from redux

	const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
	const placeId = placeDetails?.place_id;
	// const baseUrlImage = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleMapsApiKey}&`;
	const baseUrlImage = `https://maps.googleapis.com/maps/api/place/photo?key=${googleMapsApiKey}&`;

	useEffect(() => {
		if (placeDetails?.photos) {
			dispatch(resetImageUrls());

			const urls = placeDetails.photos
				.slice(0, Math.ceil(placeDetails.photos.length / 2))
				.map((photo) => {
					return `${baseUrlImage}maxwidth=400&photoreference=${photo.photo_reference}`;
				});
			dispatch(setImageUrls(urls)); // update redux state
		}
	}, [placeDetails, dispatch]);

	return placeDetails ? (
		<div>
			<div className='flex flex-col items-center justify-center gap-8 bg-zinc-200 p-12'>
				<div>
					<label htmlFor='name'>Nom de l&apos;établissement</label>
					<input
						{...register('name')}
						id='name'
						name='name'
						className='w-full bg-teal-400 p-4'
						type='text'
						value={placeDetails.name ? placeDetails.name : ''}
					/>
				</div>
				<div>
					<label htmlFor='address'>Adresse</label>
					<input
						{...register('address')}
						id='address'
						name='address'
						className='w-full bg-teal-400 p-4'
						type='text'
						value={placeDetails.vicinity ? placeDetails.vicinity : ''}
					/>
				</div>
				<div>
					<label htmlFor='city'>Ville</label>
					<input
						{...register('city')}
						id='city'
						name='city'
						className='w-full bg-teal-400 p-4'
						type='text'
						value={
							extractCityFromAdrAddress(placeDetails.adr_address) ?? ''
						}
					/>
				</div>
				<div>
					<label htmlFor='phoneNumber'>Numéro de téléphone</label>
					<input
						{...register('phoneNumber')}
						id='phoneNumber'
						name='phoneNumber'
						className='w-full bg-teal-400 p-4'
						type='text'
						value={
							placeDetails.formatted_phone_number
								? placeDetails.formatted_phone_number
								: ''
						}
					/>
				</div>
				<div>
					<label htmlFor='website'>Site web</label>
					<input
						{...register('website')}
						id='website'
						name='website'
						className='w-full bg-teal-400 p-4'
						type='text'
						value={placeDetails.website ? placeDetails.website : ''}
					/>
				</div>
				<div>
					<label htmlFor='description'>Description</label>
					<input
						{...register('description')}
						id='description'
						name='description'
						className='w-full bg-teal-400 p-4'
						type='text'
						value={
							placeDetails.editorial_summary.overview
								? placeDetails.editorial_summary.overview
								: ''
						}
					/>
				</div>
				<div>
					<label htmlFor='placeHours'>Horaires d&apos;ouverture</label>

					{placeDetails.current_opening_hours &&
					placeDetails.current_opening_hours.weekday_text
						? placeDetails.current_opening_hours.weekday_text.map(
								(day: string, index: number) => (
									<div key={index} className='mt-2'>
										<label
											htmlFor={`openingHours.${index}`}
											className='block text-sm font-medium text-gray-700'>
											{day.split(':')[0]}
										</label>
										<input
											{...register(`openingHours.${index}`)}
											id={`openingHours.${index}`}
											name={`openingHours.${index}`}
											className='mt-1 w-full bg-teal-400 p-4'
											type='text'
											value={day.split(':')[1].trim()}
										/>
									</div>
								)
						  )
						: daysOfWeek.map((day, index) => (
								<div key={index} className='mt-2'>
									<label
										htmlFor={`openingHours.${index}`}
										className='block text-sm font-medium text-gray-700'>
										{day}
									</label>
									<input
										{...register(`openingHours.${index}`)}
										id={`openingHours.${index}`}
										name={`openingHours.${index}`}
										className='mt-1 w-full bg-teal-400 p-4'
										type='text'
										value=''
									/>
								</div>
						  ))}
				</div>

				<div>
					{imageUrls.map((url, index) => (
						<Image
							key={index}
							width={200}
							height={200}
							src={url}
							alt='image de l&pos;établissement'
						/>
					))}
				</div>
				<div className='flex items-center justify-between gap-3'>
					<p className='mr-4'>Calme</p>
					<StarRating type='calm' />
				</div>
				<div className='flex items-center justify-between gap-3'>
					<p className='mr-4'>Equipement</p>
					<StarRating type='equipment' />
				</div>
				<div className='flex items-center justify-between gap-3'>
					<p className='mr-4'>Food & Drinks</p>
					<StarRating type='foodAndDrinks' />
				</div>
			</div>
		</div>
	) : (
		<p>Loading...</p>
	);
};

export default AddPlace;
