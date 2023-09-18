'use client';

import GoogleMapElement from '../maps/GoogleMapElement';
import { Coworking } from '@/types/coworking';
import { useState } from 'react';

interface CoworkingLocation {
    lat: number;
    lng: number;
    name: string;
}

type OmittedCoworking = Omit<Coworking, 'imagesSelected' | 'userImages'>;

interface MapProps {
    height: string;
    width: string;
    centerOfMap: {
        lat: number;
        lng: number;
    };
    coworkingLocations: CoworkingLocation[];
    zoom: number;
    coworkings?: Coworking[];
    coworkAdress?: string;
}

const Map = ({
    height,
    width,
    centerOfMap,
    coworkingLocations,
    zoom,
    coworkings,
    coworkAdress,
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
            coworkings={coworkings}
            coworkAdress={coworkAdress}
        />
    );
};

export default Map;
