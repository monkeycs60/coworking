import GoogleMapElement from '@/components/maps/GoogleMapElement';

export default function Home() {
	return (
		<main>
			<h1>Hello gius</h1>
			<GoogleMapElement
				height='400px'
				width='500px'
				centerMap={{ lat: 46.603354, lng: 1.888334 }}
				zoom={5}
			/>
		</main>
	);
}
