'use client';

import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { PreviewCardProps } from '@/types/googleMaps';
import { X, Star } from 'lucide-react';
import '../../../styles/googleMapDynamicCard.css';
import Link from 'next/link';
import Image from 'next/image';
import { averageRatingFromReviews } from '@/lib/functions/averageRatingFromReviews';

const PreviewCard = ({
    clusterer,
    coworking,
    selectedCowork,
    onMarkerClick,
    onCloseClick,
    coworkingReviews,
}: PreviewCardProps) => {
    let averageRating;
    if (coworkingReviews)
        averageRating = averageRatingFromReviews(coworkingReviews);

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
                    options={{}}
                >
                    <Link
                        href={{
                            pathname: `/explore/${coworking?.city}/${coworking?.name}`,
                            query: { coworkingId: coworking?.id },
                        }}
                        className='h-full w-[200px] space-y-3 bg-red-400 font-inter'
                        style={{}}
                    >
                        <div className='relative h-[100px] w-full'>
                            <Image
                                src={
                                    coworking?.userImages?.[0]?.url ||
                                    coworking?.imagesSelected?.[0]?.url ||
                                    '/cowork-placeholder.jpg'
                                }
                                alt='coucou'
                                fill
                                className='object-cover'
                            />
                        </div>
                        <div className='flex flex-col gap-1 px-2'>
                            <div className='flex w-full justify-between'>
                                <h1 className='text-base font-semibold'>
                                    {coworking?.name}
                                </h1>
                                <div className='flex items-center gap-1'>
                                    <Star fill='black' className='h-4 w-4 ' />
                                    <span>{averageRating}</span>
                                    <p>({coworking?.reviews?.length})</p>
                                </div>
                            </div>
                            <p>{coworking?.city}</p>
                        </div>
                        <div className='flex flex-col gap-1 px-2'>
                            <p className='line-clamp-3'>
                                {coworking?.description}
                            </p>
                        </div>
                        {/* ... add other relevant details here ... */}
                        <X
                            className='absolute right-2 top-2 h-4 w-4 cursor-pointer text-primary'
                            onClick={onCloseClick}
                        />
                    </Link>
                </InfoWindow>
            )}
        </React.Fragment>
    );
};

export default PreviewCard;
