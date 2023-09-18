import React from 'react';
import { Marker } from '@react-google-maps/api';
import { BlankCardProps } from '@/types/googleMaps';
import '../../../styles/googleMapCard.css';

const BlankCard = ({
    clusterer,
    onMarkerClick,
    location,
}: BlankCardProps) => {

    return (
        <React.Fragment>
            <Marker
                position={location}
                clusterer={clusterer}
                onClick={() => onMarkerClick?.(location)}
            />
        </React.Fragment>
    );
};

export default BlankCard;
