export interface GoogleMapsProps {
    height: string;
    width: string;
    centerMap: {
        lat: number;
        lng: number;
    };
    zoom: number;
}