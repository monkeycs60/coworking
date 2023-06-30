import React from 'react';
import GoogleMapElement from '@/components/maps/GoogleMapElement';
import PlacesAutocomplete from '@/components/maps/PlacesAutocomplete';

const page = () => {
	return (
		<div className='bg-zinc-500'>
			<div className='mt-4 flex flex-col justify-center text-center'>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Doloribus iure quisquam sunt odit itaque? Sequi molestias
					voluptatem minima mollitia? Inventore.
				</p>
				<p>Liste de tous les coworkings</p>
			</div>
			<div className='flex justify-between p-8'>
				<GoogleMapElement
					height='400px'
					width='500px'
					centerMap={{ lat: 46.603354, lng: 1.888334 }}
					zoom={5}
				/>
				<div className='flex w-1/2 flex-col gap-4 bg-red-400'>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						Enim, dicta! Hic sed porro ad sequi quae quibusdam dolores
						qui, iure deserunt fugit suscipit rerum ducimus, labore sunt
						magni atque. Asperiores.
					</p>
					<PlacesAutocomplete />
				</div>
			</div>
		</div>
	);
};

export default page;
