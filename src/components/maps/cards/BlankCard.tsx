import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { BlankCardProps } from '@/types/googleMaps';
import '../../../styles/googleMapCard.css';

const BlankCard = ({
    clusterer,
    onMarkerClick,
    onCloseClick,
    selectedCowork,
    location,
}: BlankCardProps) => {
    console.log(location);

    return (
        <React.Fragment>
            <Marker
                position={location}
                clusterer={clusterer}
                onClick={() => onMarkerClick?.(location)}
            />
            {selectedCowork && (
                <InfoWindow
                    onCloseClick={onCloseClick}
                    position={{
                        lat: selectedCowork.lat,
                        lng: selectedCowork.lng,
                    }}
                >
                    <div>
                        <h1>{selectedCowork.name}</h1>
                        <p>I luv u Soliine</p>
                    </div>
                </InfoWindow>
            )}
        </React.Fragment>
    );
};

export default BlankCard;
