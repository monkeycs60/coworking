import { Coworking, Review, imageSelected, UserImage } from './coworking';
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

export interface PartialCoworking {
    id: string;
    name: string;
    city: string;
    address: string;
    longitude?: number | null;
    latitude?: number | null;
    description: string;
    imagesSelected: imageSelected[];
    userImages: UserImage[];
    reviews?: Review[];
    hasWiFi: boolean;
    hasParking: boolean;
}

export interface GoogleMapsPropsWithLocations extends GoogleMapsProps {
    locations: Location[];
    onMarkerClick?: (location: Location) => void;
    onCloseClick?: () => void;
    selectedCowork?: Location | null;
    coworkings?: PartialCoworking[];
    coworkAdress?: string;
}

export interface PreviewCardProps {
    clusterer?: any;
    onMarkerClick?: (location: Location) => void;
    onCloseClick?: () => void;
    selectedCowork?: Location | null;
    coworking?: PartialCoworking;
    coworkingReviews?: Review[];
}

export interface BlankCardProps {
    clusterer?: any;
    onMarkerClick?: (location: Location) => void;
    onCloseClick?: () => void;
    selectedCowork?: Location | null;
    coworking?: Coworking;
    location: Location;
    coworkAdress?: string;
}
