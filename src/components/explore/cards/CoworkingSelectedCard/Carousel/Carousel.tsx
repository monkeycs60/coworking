'use client';

import Image from 'next/image';
import { useState } from 'react';
import { imageSelected, UserImage } from '@/types/coworking';
import ModalWindow from '@/components/ui/modalWindow';
import useCarousel from '@/hooks/useCarousel';
import ModalGallery from './ModalGallery';

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
    const allImages = [...userImages, ...imagesSelected].map((img) => img);

    const { nextSlide, prevSlide, currentIndex, setCurrentIndex } = useCarousel(
        allImages.length,
    );

    // Modal handler
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div className='flex h-[300px] flex-col items-center justify-center gap-4 rounded-xl bg-gray-100 lg:h-[440px] lg:flex-row lg:gap-12'>
                <div
                    className='relative h-[190px] w-[90%] cursor-pointer overflow-hidden rounded-xl lg:h-[400px] lg:w-[45%]'
                    onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        setIsOpen(true);
                        setCurrentIndex(0);
                    }}
                >
                    <Image
                        src={allImages[0]?.url || defaultImage}
                        fill
                        className='rounded-xl object-cover transition-transform duration-300 hover:scale-105'
                        alt={'coucou'}
                    />
                </div>
                <div
                    className='flex h-[70px] w-[100%] cursor-pointer flex-wrap items-center justify-center gap-4 overflow-hidden rounded-xl lg:h-[400px] lg:w-[45%]'
                    onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        setIsOpen(true);
                        setCurrentIndex(1);
                    }}
                >
                    <div className='relative h-full w-[20%] overflow-hidden rounded-xl lg:h-[160px] lg:w-[42%]'>
                        <Image
                            src={allImages[1]?.url || defaultImage}
                            fill
                            className='rounded-xl object-cover transition-transform duration-300 hover:scale-105'
                            alt={'hello'}
                        />
                    </div>
                    <div
                        className='relative h-full w-[20%] cursor-pointer overflow-hidden rounded-xl lg:h-[160px] lg:w-[42%]'
                        onClick={(event: React.MouseEvent) => {
                            event.stopPropagation();
                            setIsOpen(true);
                            setCurrentIndex(2);
                        }}
                    >
                        <Image
                            src={allImages[2]?.url || defaultImage}
                            fill
                            className='rounded-xl object-cover transition-transform duration-300 hover:scale-105'
                            alt={'hello'}
                        />
                    </div>
                    <div
                        className='relative h-full w-[20%] cursor-pointer overflow-hidden rounded-xl lg:h-[160px] lg:w-[42%]'
                        onClick={(event: React.MouseEvent) => {
                            event.stopPropagation();
                            setIsOpen(true);
                            setCurrentIndex(3);
                        }}
                    >
                        <Image
                            src={allImages[3]?.url || defaultImage}
                            fill
                            className='rounded-xl object-cover transition-transform duration-300 hover:scale-105'
                            alt={'hello'}
                        />
                    </div>
                    <div
                        className='relative flex h-full w-[20%] cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-gray-300 lg:h-[160px] lg:w-[42%]'
                        onClick={(event: React.MouseEvent) => {
                            event.stopPropagation();
                            setIsOpen(true);
                            setCurrentIndex(4);
                        }}
                    >
                        {allImages.length > 4 ? (
                            <p className='text-center text-sm lg:text-left lg:text-base'>
                                <span className='font-bold'>
                                    {allImages.length - 4}+
                                </span>{' '}
                                photos
                            </p>
                        ) : (
                            <p className='text-center text-xs lg:text-base'>
                                Aucune autre photo disponible
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <ModalWindow
                isOpen={isOpen}
                onClose={handleClose}
                containerClass='w-[320px] lg:w-[1500px]'
            >
                <ModalGallery
                    allImages={allImages}
                    defaultImage={defaultImage}
                    currentIndex={currentIndex}
                    prevSlide={prevSlide}
                    nextSlide={nextSlide}
                />
            </ModalWindow>
        </div>
    );
};

export default Carousel;
