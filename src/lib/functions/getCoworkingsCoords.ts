type Coworking = {
    latitude: number | null;
    longitude: number | null;
    name: string;
};

type CoworkingLocation = {
    lat: number;
    lng: number;
    name: string;
};

const getCoworkingsCoords = (
    coworkings: Coworking[],
): CoworkingLocation[] => {
    return coworkings
        .filter(
            (cowork) => cowork.latitude !== null && cowork.longitude !== null,
        )
        .map((cowork) => ({
            lat: cowork.latitude as number, // Avec la vérification ci-dessus, vous pouvez utiliser l'assertion de type ici
            lng: cowork.longitude as number, // De même ici
            name: cowork.name,
        }));
};

export default getCoworkingsCoords;