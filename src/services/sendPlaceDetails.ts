import { AddPlaceSchemaType } from '@/types/addPlace';

export const sendPlaceDetails = async (data: AddPlaceSchemaType) => {
	// Posting data to our API route
	const response = await fetch('/api/addPlace', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	const responseData = await response.json();
	if (response.ok) {
		alert('Place added successfully!');
		return responseData;
	} else {
		alert(`Error: ${responseData.message}`);
		return null;
	}
};
