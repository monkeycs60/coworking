import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { PreviewCardProps } from '@/types/googleMaps';

const PreviewCard = ({
    clusterer,
    coworking,
    selectedCowork,
    onMarkerClick,
    onCloseClick,
}: PreviewCardProps) => {
    return (
        <React.Fragment key={coworking?.id}>
            <Marker
                position={{
                    lat: coworking?.latitude as number,
                    lng: coworking?.longitude as number,
                }}
                clusterer={clusterer}
                onClick={() => onMarkerClick?.(coworking as any)}
            />

            {selectedCowork?.name === coworking?.name && (
                <InfoWindow
                    onCloseClick={onCloseClick}
                    position={{
                        lat: coworking?.latitude as number,
                        lng: coworking?.longitude as number,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '16px',
                            borderRadius: '8px',
                        }}
                    >
                        <h1>{coworking?.name}</h1>
                        <p>{coworking?.address}</p>
                        <p>{coworking?.city}</p>
                        {/* ... add other relevant details here ... */}
                    </div>
                </InfoWindow>
            )}
        </React.Fragment>
    );
};

export default PreviewCard;
