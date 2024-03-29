import { ExtendedAddPlaceSchemaType } from '@/types/addPlace';

export const sendPlaceDetails = async (data: ExtendedAddPlaceSchemaType) => {
    // Posting data to our API route
    const response = await fetch('/api/places', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log('responseData', response);

    if (response.ok) {
        console.log('Place added successfully!');
        console.log('responseData', responseData);

        return responseData;
    } else {
        alert(`Error: ${responseData.message}`);
        return null;
    }
};
