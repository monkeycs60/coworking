import { NextApiRequest, NextApiResponse } from 'next';



export async function GET(req: NextApiRequest, res: NextApiResponse) {
	const placeId = req.query.placeId as string;
	const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${googleMapsApiKey}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: 'An error occurred.' });
	}
}
