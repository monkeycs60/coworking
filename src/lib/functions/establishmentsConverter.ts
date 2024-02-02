export const establishmentsConverter = (establishmentType: string) => {
    switch (establishmentType) {
        case 'HOTEL_LOBBY':
            return "Lobby d'hôtel";
        case 'CAFE':
            return 'Café';
        case 'RESTAURANT_BAR':
            return 'Restaurant / Bar';
        case 'THIRD_PLACE':
            return 'Tiers-lieu';
        case 'LIBRARY':
            return 'Bibliothèque';
        case 'OTHER':
            return 'Autre';
        default:
            return 'Autre';
    }
};
