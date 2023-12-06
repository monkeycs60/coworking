import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
	const placeId = new URL(req.url).searchParams.get('placeId');

	const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleMapsApiKey}&language=fr`;

	const response = await fetch(url);
	const data = await response.json();

	return NextResponse.json({
		message: 'ok ça marche le fetch place details from SERVER',
		data: data,
	});
}
