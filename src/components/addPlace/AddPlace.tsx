'use client';

import { useAppSelector } from '@/hooks/useRedux';
import Image from 'next/image';

const AddPlace = () => {
	const placeDetails = useAppSelector((state) => state.placeDetails.details);
	const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
	const placeId = placeDetails?.place_id;
	// const baseUrlImage = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleMapsApiKey}&`;
	const baseUrlImage = `https://maps.googleapis.com/maps/api/place/photo?key=${googleMapsApiKey}&`;

	return placeDetails ? (
		<div>
			<p>Hello</p>
			<div className='flex flex-col items-center justify-center gap-8 bg-zinc-200 p-12'>
				<input
					className='w-full bg-teal-400 p-4'
					type='text'
					value={placeDetails.name}
					disabled
				/>
				<input
					className='w-full bg-teal-400 p-4'
					type='number'
					value={placeDetails.rating}
					disabled
				/>
				<input
					className='w-full bg-teal-400 p-4'
					type='text'
					value={placeDetails.editorial_summary.overview}
					disabled
				/>
				<Image
					width={200}
					height={200}
					src={placeDetails.icon}
					alt='logo of the coworking'
				/>
				<input
					className='w-full bg-teal-400 p-4'
					type='text'
					value={placeDetails.adr_address}
					disabled
				/>
				{/* <Image
					width={200}
					height={200}
					src={
						baseUrlImage + `maxwidth=400&photoreference=${placeDetails.photos[0].photo_reference}`
					}
					alt='logo of the coworking'
				/> */}

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
							alt='logo of the coworking'
						/>
					))}
			</div>
		</div>
	) : (
		<p>Loading...</p>
	);
};

export default AddPlace;
