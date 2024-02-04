export const convertFacilityName = (facilityName: string) => {
    if (facilityName === 'IS_CAFE') return 'Café';
    if (facilityName === 'IS_HOTEL') return 'Hôtel';
    if (facilityName === 'IS_LIBRARY') return 'Bibliothèque';
    if (facilityName === 'IS_THIRD_SPACE') return 'Tiers-lieu';
    if (facilityName === 'IS_OTHER_TYPE') return 'Autre';
    return facilityName;
}

export const convertFacilityNameSimple = (facilityName: string) => {
    if (facilityName === 'CAFE') return 'Café';
    if (facilityName === 'RESTAURANT_BAR') return 'Restaurant / Bar';
    if (facilityName === 'HOTEL_LOBBY') return 'Hôtel';
    if (facilityName === 'LIBRARY') return 'Bibliothèque';
    if (facilityName === 'THIRD_PLACE') return 'Tiers-lieu';
    if (facilityName === 'OTHER') return 'Autre';
    return facilityName;
}