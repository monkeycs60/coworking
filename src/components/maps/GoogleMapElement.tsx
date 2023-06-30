'use client';

import {
	GoogleMap,
	LoadScript,
	Marker,
	MarkerClusterer,
	InfoWindow,
} from '@react-google-maps/api';
import { GoogleMapsProps } from '@/types/googleMaps';

type Location = {
	lat: number;
	lng: number;
};

const locations: Location[] = [
	// Bordeaux
	{ lat: 44.8378, lng: -0.5792 },
	{ lat: 44.837, lng: -0.58 },
	{ lat: 44.838, lng: -0.578 },

	// Paris
	{ lat: 48.8566, lng: 2.3522 },
	{ lat: 48.856, lng: 2.353 },
	{ lat: 48.857, lng: 2.351 },

	// Lyon
	{ lat: 45.75, lng: 4.85 },
	{ lat: 45.751, lng: 4.851 },
	{ lat: 45.749, lng: 4.849 },
];

const centerOfFrance: Location = {
	lat: 46.603354,
	lng: 1.888334,
};

const GoogleMapElement = ({
	height,
	width,
	centerMap,
	zoom,
}: GoogleMapsProps) => {
	const googleMapsApiKey: string | undefined =
		process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	if (!googleMapsApiKey) {
		return <div>Missing Google Maps API Key</div>;
	}
	return (
		<div>
			<LoadScript googleMapsApiKey={googleMapsApiKey}>
				<GoogleMap
					mapContainerStyle={{ height: height, width: width }}
					center={centerMap}
					zoom={zoom}
					options={{
						// Ajouter cette propriété
						disableDefaultUI: true, // Désactive l'UI par défaut
						styles: [
							{
								featureType: 'water',
								elementType: 'geometry',
								stylers: [{ color: '#007BFF' }, { lightness: 1 }],
							},
							{
								featureType: 'landscape',
								elementType: 'geometry',
								stylers: [{ color: '#FFFFFF' }],
							},
							{
								featureType: 'road',
								elementType: 'geometry',
								stylers: [
									{ color: '#808080' },
									{ visibility: 'simplified' },
								],
							},
							// Ajoutez plus d'objets de style ici pour styliser d'autres éléments de la carte
						],
					}}>
					<MarkerClusterer
						options={{
							imagePath:
								'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
						}}>
						{(clusterer) => (
							<>
								{locations.map((location, index) => (
									<Marker
										key={index}
										position={location}
										clusterer={clusterer}
									/>
								))}
							</>
						)}
					</MarkerClusterer>
					<InfoWindow
						position={{
							lat: 44.8378,
							lng: -0.5792,
						}}>
						<div>
							<h1>Le titre</h1>
							<p>Votre texte ici</p>
						</div>
					</InfoWindow>
				</GoogleMap>
			</LoadScript>
		</div>
	);
};

export default GoogleMapElement;
