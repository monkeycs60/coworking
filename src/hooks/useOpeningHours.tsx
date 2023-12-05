import { PlaceDetail } from '@/types/placeDetails';

function useOpeningHours(placeDetails: PlaceDetail) {
    const openingHours = placeDetails?.opening_hours?.periods;

    if (!openingHours || openingHours.length !== 7) {
        return new Array(7).fill({ day: 0, open: '', close: '' });
    }

    // Réorganiser pour commencer par lundi
    return openingHours
        .map((period, index) => ({
            day: index,
            open: period.open.time,
            close: period.close.time,
        }))
        .sort((a, b) => (a.day === 0 ? 7 : a.day) - (b.day === 0 ? 7 : b.day));
}

export default useOpeningHours;
