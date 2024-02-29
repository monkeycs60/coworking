import { usePlaceDetailsStore } from '@/zustand/stores/placeDetailsStore';

function useOpeningHours() {
    const openingHours = usePlaceDetailsStore(
        (state) => state.details?.opening_hours?.periods,
    );

    if (!openingHours || openingHours.length !== 7) {
        return new Array(7).fill({ day: 0, open: '', close: '' });
    }

    const openingHoursSorted = openingHours
        ?.slice(1, 7)
        .concat(openingHours[0]);

    console.log('openingHoursSorted', openingHoursSorted);

    return openingHoursSorted;
}

export default useOpeningHours;
