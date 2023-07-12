'use client';

import { useAppSelector } from '@/hooks/useRedux';
import Image from 'next/image';

const AddPlace = () => {
	const placeDetails = useAppSelector((state) => state.placeDetails.details);

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
				<Image width={200} height={200} src={placeDetails.icon} alt='logo of the coworking'/>
				<input
					className='w-full bg-teal-400 p-4'
					type='text'
					value={placeDetails.adr_address}
					disabled
				/>
				{/* I'm not sure how you want to render the photos or the geometry, so I'll leave them as is for now */}
				{/* {placeDetails.photos.map((photo, index) => (
					<input key={index} type="text" value={photo} disabled />
				))} */}
				{/* <input type="text" value={placeDetails.geometry.location.lat} disabled />
				<input type="text" value={placeDetails.geometry.location.lng} disabled /> */}
			</div>
		</div>
	) : (
		<p>Loading...</p>
	);
};

export default AddPlace;
