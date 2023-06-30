import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
	const placeId = new URL(req.url).searchParams.get('placeId');
	const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${googleMapsApiKey}`;

	const response = await fetch(url);
	const data = await response.json();
	console.log('data du details', data);

	return new Response('ok ça marche le fetch détaillé', {
		status: 200,
		headers: {
			'content-type': 'application/json',
		},
	});
}
