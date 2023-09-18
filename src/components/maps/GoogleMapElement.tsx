'use client';

import {
    GoogleMap,
    LoadScript,
    MarkerClusterer,
} from '@react-google-maps/api';
import { GoogleMapsPropsWithLocations } from '@/types/googleMaps';
import React from 'react';
import { googleMapsStyle } from '@/lib/const/googleMapsStyle';
import PreviewCard from './cards/PreviewCard';
import BlankCard from './cards/BlankCard';

const GoogleMapElement = ({
    height,
    width,
    centerMap,
    zoom,
    locations,
    onMarkerClick,
    onCloseClick,
    selectedCowork,
    coworkings,
}: GoogleMapsPropsWithLocations) => {
    const googleMapsApiKey: string | undefined =
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!googleMapsApiKey) {
        return <div>Missing Google Maps API Key</div>;
    }

    return (
        <div>
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
                <GoogleMap
                    mapContainerStyle={{
                        height: height,
                        width: width,
                        position: 'relative',
                    }}
                    center={centerMap}
                    zoom={zoom}
                    options={{
                        disableDefaultUI: false, // Désactive l'UI par défaut
                        styles: googleMapsStyle,
                    }}
                >
                    <MarkerClusterer
                        options={{
                            imagePath:
                                'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                        }}
                    >
                        {(clusterer) => (
                            <>
                                {coworkings
                                    ? coworkings.map((coworking, index) => (
                                          <PreviewCard
                                              key={index}
                                              coworking={coworking}
                                              clusterer={clusterer}
                                              selectedCowork={selectedCowork}
                                              onMarkerClick={onMarkerClick}
                                              onCloseClick={onCloseClick}
                                          />
                                      ))
                                    : locations.map((location, index) => (
                                          <BlankCard
                                              key={index}
                                              clusterer={clusterer}
                                              onMarkerClick={onMarkerClick}
                                              onCloseClick={onCloseClick}
                                              selectedCowork={selectedCowork}
                                              location={location}
                                          />
                                      ))}
                            </>
                        )}
                    </MarkerClusterer>
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default GoogleMapElement;
