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
    coworkAdress,
}: BlankCardProps) => {
    console.log(coworkAdress);

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
                    <div className='h-full w-full  p-2 font-inter text-sm'>
                        <h1 className='font-semibold'>{selectedCowork.name}</h1>
                        <h1>{coworkAdress}</h1>
                        <X
                            className='absolute right-2 top-2 h-4 w-4 cursor-pointer text-primary'
                            onClick={onCloseClick}
                        />
                    </div>
                </InfoWindow>
            )}
        </React.Fragment>
    );
};

export default BlankCard;
