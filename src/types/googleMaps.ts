import { Coworking } from './coworking';
interface GoogleMapsProps {
    height: string;
    width: string;
    centerMap: {
        lat: number;
        lng: number;
    };
    zoom: number;
}

export type Location = {
    lat: number;
    lng: number;
    name: string; // Add more properties if needed for InfoWindow
};

type OmittedCoworking = Omit<Coworking, 'imagesSelected' | 'userImages'>;

export interface GoogleMapsPropsWithLocations extends GoogleMapsProps {
    locations: Location[];
    onMarkerClick?: (location: Location) => void;
    onCloseClick?: () => void;
    selectedCowork?: Location | null;
    coworking?: OmittedCoworking[];
}
