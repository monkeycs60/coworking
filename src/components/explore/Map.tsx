'use client';

import GoogleMapElement from '../maps/GoogleMapElement';
import { useState } from 'react';

interface CoworkingLocation {
    lat: number;
    lng: number;
    name: string;
}

interface MapProps {
    height: string;
    width: string;
    centerOfMap: {
        lat: number;
        lng: number;
    };
    coworkingLocations: CoworkingLocation[];
    zoom: number;
}

const Map = ({
    height,
    width,
    centerOfMap,
    coworkingLocations,
    zoom,
}: MapProps) => {
    const [selectedCowork, setSelectedCowork] =
        useState<CoworkingLocation | null>(null);

    const handleMarkerClick = (location: CoworkingLocation) => {
        setSelectedCowork(location);
    };

    const handleCloseClick = () => {
        setSelectedCowork(null);
    };

    return (
        <GoogleMapElement
            height={height}
            width={width}
            centerMap={centerOfMap}
            zoom={zoom}
            locations={coworkingLocations}
            onMarkerClick={handleMarkerClick}
            onCloseClick={handleCloseClick}
            selectedCowork={selectedCowork}
        />
    );
};

export default Map;
