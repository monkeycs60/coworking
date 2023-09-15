'use client';

import {
    GoogleMap,
    LoadScript,
    Marker,
    MarkerClusterer,
    InfoWindow,
} from '@react-google-maps/api';
import { GoogleMapsPropsWithLocations } from '@/types/googleMaps';
import React from 'react';
import { googleMapsStyle } from '@/lib/const/googleMapsStyle';

const GoogleMapElement = ({
    height,
    width,
    centerMap,
    zoom,
    locations,
    onMarkerClick,
    onCloseClick,
    selectedCowork,
    coworking,
}: GoogleMapsPropsWithLocations) => {
    const googleMapsApiKey: string | undefined =
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!googleMapsApiKey) {
        return <div>Missing Google Maps API Key</div>;
    }

    console.log(coworking);
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
                        // Ajouter cette propriété
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
                                {locations.map((location, index) => (
                                    <React.Fragment key={index}>
                                        <Marker
                                            key={index}
                                            position={location}
                                            clusterer={clusterer}
                                            onClick={() =>
                                                onMarkerClick?.(location)
                                            }
                                        />
                                        {selectedCowork && (
                                            <InfoWindow
                                                onCloseClick={() =>
                                                    onCloseClick
                                                }
                                                position={{
                                                    lat: selectedCowork.lat,
                                                    lng: selectedCowork.lng,
                                                }}
                                            >
                                                <div>
                                                    <h1>
                                                        {selectedCowork.name}
                                                    </h1>
                                                    <p>I luv u Soliine</p>
                                                </div>
                                            </InfoWindow>
                                        )}
                                    </React.Fragment>
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
