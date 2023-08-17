'use client';

import { useAppSelector } from '@/hooks/useRedux';
import { AddPlaceSchemaType, AddPlaceSchema } from '@/types/addPlace';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

const AddPlace = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AddPlaceSchemaType>({
		resolver: zodResolver(AddPlaceSchema),
	});

	const placeDetails = useAppSelector((state) => state.placeDetails.details);
	const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
	const placeId = placeDetails?.place_id;
	// const baseUrlImage = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleMapsApiKey}&`;
	const baseUrlImage = `https://maps.googleapis.com/maps/api/place/photo?key=${googleMapsApiKey}&`;

	return placeDetails ? (
		<div>
			<div className='flex flex-col items-center justify-center gap-8 bg-zinc-200 p-12'>
				<div>
					<label htmlFor='placeName'>Nom de l&apos;établissement</label>
					<input
						id='placeName'
						name='placeName'
						className='w-full bg-teal-400 p-4'
						type='text'
						value={placeDetails.name}
					/>
				</div>
				<div>
					<label htmlFor='placeAddress'>Adresse</label>
					<input
						id='placeAddress'
						name='placeAddress'
						className='w-full bg-teal-400 p-4'
						type='text'
						value={placeDetails.vicinity}
					/>
				</div>
				<div>
					<label htmlFor='placePhone'>Numéro de téléphone</label>
					<input
						id='placePhone'
						name='placePhone'
						className='w-full bg-teal-400 p-4'
						type='text'
						value={placeDetails.formatted_phone_number}
					/>
				</div>
				<div>
					<label htmlFor='placeWebsite'>Site web</label>
					<input
						id='placeWebsite'
						name='placeWebsite'
						className='w-full bg-teal-400 p-4'
						type='text'
						value={placeDetails.website}
					/>
				</div>
				<div>
					<label htmlFor='placeHours'>Horaires d&apos;ouverture</label>

					{placeDetails.current_opening_hours.weekday_text.map(
						(day, index) => (
							<div key={index} className='mt-2'>
								<label
									htmlFor={`day${index}`}
									className='block text-sm font-medium text-gray-700'>
									{day.split(':')[0]}
								</label>
								<input
									id={`day${index}`}
									name={`day${index}`}
									className='mt-1 w-full bg-teal-400 p-4'
									type='text'
									value={day.split(':')[1].trim()}
								/>
							</div>
						)
					)}
				</div>

				{placeDetails.photos
					.slice(0, Math.ceil(placeDetails.photos.length / 2))
					.map((photo) => (
						<Image
							key={photo.photo_reference}
							width={200}
							height={200}
							src={
								baseUrlImage +
								`maxwidth=400&photoreference=${photo.photo_reference}`
							}
							alt='image de l&pos;établissement'
						/>
					))}
			</div>
		</div>
	) : (
		<p>Loading...</p>
	);
};

export default AddPlace;
