'use client';

import GoogleMapElement from '../maps/GoogleMapElement';
import { useState } from 'react';

interface CoworkingLocation {
    lat: number;
    lng: number;
    name: string;
}

interface MapProps {
    centerOfFrance: {
        lat: number;
        lng: number;
    };
    coworkingLocations: CoworkingLocation[];
}

const Map = ({ centerOfFrance, coworkingLocations }: MapProps) => {
    console.log('localisation cowork', coworkingLocations);

    const [selectedCowork, setSelectedCowork] =
        useState<CoworkingLocation | null>(null);

    const handleMarkerClick = (location: CoworkingLocation) => {
        setSelectedCowork(location);
    };

    const handleCloseClick = () => {
        setSelectedCowork(null);
    }

    console.log(selectedCowork);
    

    return (
        <GoogleMapElement
            height='700px'
            width='100%'
            centerMap={centerOfFrance}
            zoom={5}
            locations={coworkingLocations}
            onMarkerClick={handleMarkerClick}
            onCloseClick={handleCloseClick}
            selectedCowork={selectedCowork}
        />
    );
};

export default Map;
