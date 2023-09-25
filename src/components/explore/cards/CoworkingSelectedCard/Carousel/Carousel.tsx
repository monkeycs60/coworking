'use client';

import Image from 'next/image';
import { useState } from 'react';
import { imageSelected, UserImage } from '@/types/coworking';
import { ModalWindow } from 'react-ts-modal-cserizay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useCarousel from '@/hooks/useCarousel';

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
    const allImages = [...userImages, ...imagesSelected].map((img) => img.url);

    const { nextSlide, prevSlide, currentIndex, setCurrentIndex } = useCarousel(
        allImages.length,
    );

    // Modal handler
    const [isOpen, setIsOpen] = useState(false);

    // Create a function to open the modal
    const handleOpen = () => {
        setIsOpen(true);
    };

    // Create a function to close the modal
    const handleClose = () => {
        setIsOpen(false);
        // if (success) router.refresh();
    };

    console.log(currentIndex);

    return (
        <div>
            <div className='flex h-[440px] items-center justify-center gap-12 rounded-xl bg-gray-50'>
                <div
                    className='relative h-[400px] w-[45%] cursor-pointer'
                    onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        setIsOpen(true);
                        setCurrentIndex(0);
                        console.log(currentIndex);
                    }}
                >
                    <Image
                        src={allImages[0] || defaultImage}
                        fill
                        className='rounded-xl object-cover'
                        alt={'coucou'}
                    />
                </div>
                <div
                    className='flex h-[400px] w-[45%] cursor-pointer flex-wrap items-center justify-center gap-4'
                    onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        setIsOpen(true);
                        setCurrentIndex(1);
                        console.log(currentIndex);
                    }}
                >
                    <div className='relative h-[160px] w-[42%] '>
                        <Image
                            src={allImages[1] || defaultImage}
                            fill
                            className='rounded-xl object-cover'
                            alt={'hello'}
                        />
                    </div>
                    <div
                        className='relative h-[160px] w-[42%] cursor-pointer'
                        onClick={(event: React.MouseEvent) => {
                            event.stopPropagation();
                            setIsOpen(true);
                            setCurrentIndex(2);
                            console.log(currentIndex);
                        }}
                    >
                        <Image
                            src={allImages[2] || defaultImage}
                            fill
                            className='rounded-xl object-cover'
                            alt={'hello'}
                        />
                    </div>
                    <div
                        className='relative h-[160px] w-[42%] cursor-pointer'
                        onClick={(event: React.MouseEvent) => {
                            event.stopPropagation();
                            setIsOpen(true);
                            setCurrentIndex(3);
                            console.log(currentIndex);
                        }}
                    >
                        <Image
                            src={allImages[3] || defaultImage}
                            fill
                            className='rounded-xl object-cover'
                            alt={'hello'}
                        />
                    </div>
                    <div
                        className='relative flex h-[160px] w-[42%] cursor-pointer items-center justify-center rounded-xl bg-gray-300'
                        onClick={(event: React.MouseEvent) => {
                            event.stopPropagation();
                            setIsOpen(true);
                            setCurrentIndex(4);
                            console.log(currentIndex);
                        }}
                    >
                        <p>
                            <span className='font-bold'>
                                {allImages.length - 4}+
                            </span>{' '}
                            photos
                        </p>
                    </div>
                </div>
            </div>
            <ModalWindow isOpen={isOpen} onClose={handleClose}>
                <div className='flex h-[70vh] w-full flex-col items-center justify-center'>
                    <div className='relative h-[80%] w-[75%] '>
                        <Image
                            src={allImages[currentIndex] || defaultImage}
                            fill
                            className='select-none rounded-xl object-cover'
                            alt='clicked image'
                        />
                        <ChevronLeft
                            onClick={prevSlide}
                            className='absolute -left-16 top-1/2 z-[100] h-14 w-14 -translate-y-1/2 cursor-pointer'
                        />
                        <ChevronRight
                            onClick={nextSlide}
                            className='absolute -right-16 top-1/2 z-[100] h-14 w-14 -translate-y-1/2 cursor-pointer'
                        />
                    </div>
                </div>
            </ModalWindow>
        </div>
    );
};

export default Carousel;
