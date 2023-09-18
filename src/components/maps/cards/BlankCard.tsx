import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { BlankCardProps } from '@/types/googleMaps';
import '../../../styles/googleMapCard.css';
import { X } from 'lucide-react';

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
                    <div className='h-full w-full bg-blue-400 p-8 '>
                        <h1>{selectedCowork.name}</h1>
                        <X
                            className='absolute right-2 top-2 cursor-pointer'
                            onClick={onCloseClick}
                        />
                    </div>
                </InfoWindow>
            )}
        </React.Fragment>
    );
};

export default BlankCard;
