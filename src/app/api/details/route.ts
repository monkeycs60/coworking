import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
	const placeId = new URL(req.url).searchParams.get('placeId');
	console.log('placeId', placeId);

	const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleMapsApiKey}`;

	const response = await fetch(url);
	const data = await response.json();
	console.log('data du details', data);

	return NextResponse.json({
		message: 'ok ça marche le fetch détaillé',
		data: data,
	});
}
