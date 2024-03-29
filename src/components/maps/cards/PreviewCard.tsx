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
                    <div className='relative flex h-[240px] w-[310px] flex-col gap-4 bg-gray-200'>
                        <Link
                            href={{
                                pathname: `/explore/${coworking?.city}/${coworking?.name}`,
                                query: { coworkingId: coworking?.id },
                            }}
                            className='h-[100px] w-[310px] bg-primary'
                        >
                            <div className='relative h-full w-full rounded-xl'>
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
                        </Link>
                        <Link
                            href={{
                                pathname: `/explore/${coworking?.city}/${coworking?.name}`,
                                query: { coworkingId: coworking?.id },
                            }}
                            className='flex flex-col gap-1 px-4'
                        >
                            <div className='flex w-full justify-between'>
                                <h1 className='text-base font-semibold'>
                                    {coworking?.name}
                                </h1>
                                <div className='flex items-center gap-1'>
                                    <Star fill='#FFC107' className='h-4 w-4 ' />
                                    <span>{averageRating}</span>
                                    <p>({coworking?.reviews?.length})</p>
                                </div>
                            </div>
                            <p>{coworking?.city}</p>
                        </Link>
                        <div className='flex flex-col gap-1 px-4'>
                            <p className='line-clamp-2'>
                                {coworking?.description}
                            </p>
                        </div>
                        <X
                            className='absolute right-2 top-2 h-8 w-8 cursor-pointer rounded-2xl border-2 bg-white/60 text-black lg:right-1 lg:top-1'
                            onClick={onCloseClick}
                        />
                    </div>
                </InfoWindow>
            )}
        </React.Fragment>
    );
};

export default PreviewCard;
