export const convertFacilityName = (facilityName: string) => {
    if (facilityName === 'IS_CAFE') return 'Café';
    if (facilityName === 'IS_HOTEL') return 'Hôtel';
    if (facilityName === 'IS_LIBRARY') return 'Bibliothèque';
    if (facilityName === 'IS_THIRD_SPACE') return 'Tiers-lieu';
    if (facilityName === 'IS_OTHER_TYPE') return 'Autre';
    return facilityName;
}