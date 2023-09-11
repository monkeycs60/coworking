export async function getCityCenter(city: string) {
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleMapsApiKey}`,
    );
    const data = await response.json();
    if (
        data.results &&
        data.results[0] &&
        data.results[0].geometry &&
        data.results[0].geometry.location
    ) {
        return data.results[0].geometry.location;
    }
    return null;
}
