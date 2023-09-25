'use client';

import Image from 'next/image';
import React from 'react';
import { imageSelected, UserImage } from '@/types/coworking';

interface CarouselProps {
    imagesSelected: imageSelected[];
    userImages: UserImage[];
    defaultImage: string;
}

const Carousel = ({
    imagesSelected,
    userImages,
    defaultImage,
}: CarouselProps) => {
    console.log(imagesSelected);
    console.log(userImages);

    return (
        <div>
            <div className='flex h-[440px] items-center justify-center gap-12 rounded-xl bg-gray-400'>
                <div className='relative h-[400px] w-[45%] '>
                    <Image
                        src={userImages[0]?.url || defaultImage}
                        fill
                        className='object-cover'
                        alt={'coucou'}
                    />
                </div>
                <div className='flex h-[400px] w-[45%] flex-col gap-4'>
                    <div className='relative h-[200px] w-full'>
                        <Image
                            src={imagesSelected[0]?.url || defaultImage}
                            fill
                            className='object-cover'
                            alt={'hello'}
                        />
                    </div>
                    <div className='relative h-[200px] w-full'>
                        <Image
                            src={imagesSelected[1]?.url || defaultImage}
                            fill
                            className='object-cover'
                            alt={'hello'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
