import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
	const input = new URL(req.url).searchParams.get('input');
	console.log('input', input);

	const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googleMapsApiKey}&radius=500&input=${input}&types=establishment`;

	const response = await fetch(url);
	const data = await response.json();
	console.log('data de autocomplete', data);

	return NextResponse.json({
		message: 'OK for fetch autocomplete',
		data: data,
	});
}
