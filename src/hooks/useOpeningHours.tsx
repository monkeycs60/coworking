import { PlaceDetail } from '@/types/placeDetails';

function useOpeningHours(placeDetails: PlaceDetail) {
    const openingHours = placeDetails?.opening_hours?.periods;

    if (!openingHours || openingHours.length !== 7) {
        return new Array(7).fill({ day: 0, open: '', close: '' });
    }

    const openingHoursSorted = openingHours
        ?.slice(1, 7)
        .concat(openingHours[0]);

    return openingHoursSorted;
}

export default useOpeningHours;
