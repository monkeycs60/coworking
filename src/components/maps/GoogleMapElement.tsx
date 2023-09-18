'use client';

import { GoogleMap, LoadScript, MarkerClusterer } from '@react-google-maps/api';
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
    coworkAdress,
}: GoogleMapsPropsWithLocations) => {
    const googleMapsApiKey: string | undefined =
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!googleMapsApiKey) {
        return <div>Missing Google Maps API Key</div>;
    }

    console.log(coworkings);

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
                                    ? coworkings.map((coworking, index) => {
                                          const coworkingReviews =
                                              coworking.reviews;
                                          return (
                                              <div key={index}>
                                                  <PreviewCard
                                                      key={index}
                                                      coworking={coworking}
                                                      coworkingReviews={
                                                          coworkingReviews
                                                      }
                                                      clusterer={clusterer}
                                                      selectedCowork={
                                                          selectedCowork
                                                      }
                                                      onMarkerClick={
                                                          onMarkerClick
                                                      }
                                                      onCloseClick={
                                                          onCloseClick
                                                      }
                                                  />
                                                  <span>{coworkAdress}</span>
                                              </div>
                                          );
                                      })
                                    : locations.map((location, index) => (
                                          <BlankCard
                                              key={index}
                                              clusterer={clusterer}
                                              onMarkerClick={onMarkerClick}
                                              onCloseClick={onCloseClick}
                                              selectedCowork={selectedCowork}
                                              location={location}
                                              coworkAdress={coworkAdress}
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
