'use client';

import Image from 'next/image';
import { useState } from 'react';
import { imageSelected, UserImage } from '@/types/coworking';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ModalWindow from '@/components/ui/modalWindow';
import useCarousel from '@/hooks/useCarousel';
import { formatDateForFrenchLocale } from '@/lib/functions/formatDateForFrenchLocale';

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

    // Create a function to close the modal
    const handleClose = () => {
        setIsOpen(false);
        // if (success) router.refresh();
    };

    return (
        <div>
            <div className='flex h-[440px] items-center justify-center gap-12 rounded-xl bg-gray-50'>
                <div
                    className='relative h-[400px] w-[45%] cursor-pointer overflow-hidden rounded-xl'
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
                    className='flex h-[400px] w-[45%] cursor-pointer flex-wrap items-center justify-center gap-4 overflow-hidden rounded-xl'
                    onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        setIsOpen(true);
                        setCurrentIndex(1);
                    }}
                >
                    <div className='relative h-[160px] w-[42%] overflow-hidden rounded-xl'>
                        <Image
                            src={allImages[1]?.url || defaultImage}
                            fill
                            className='rounded-xl object-cover transition-transform duration-300 hover:scale-105'
                            alt={'hello'}
                        />
                    </div>
                    <div
                        className='relative h-[160px] w-[42%] cursor-pointer overflow-hidden rounded-xl'
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
                        className='relative h-[160px] w-[42%] cursor-pointer overflow-hidden rounded-xl'
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
                        className='relative flex h-[160px] w-[42%] cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-gray-300'
                        onClick={(event: React.MouseEvent) => {
                            event.stopPropagation();
                            setIsOpen(true);
                            setCurrentIndex(4);
                        }}
                    >
                        {allImages.length > 4 ? (
                            <p>
                                <span className='font-bold'>
                                    {allImages.length - 4}+
                                </span>{' '}
                                photos
                            </p>
                        ) : (
                            <p className='text-center'>
                                Aucune autre photo disponible
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <ModalWindow
                isOpen={isOpen}
                onClose={handleClose}
                containerClass='w-[1500px]'
            >
                <div className='flex h-[70vh] w-full flex-col items-center justify-center gap-6'>
                    <div className='relative h-[80%] w-[75%] '>
                        <Image
                            src={allImages[currentIndex]?.url || defaultImage}
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
                    <div className='flex flex-col items-center justify-center gap-2'>
                        Ajouté le{' '}
                        {formatDateForFrenchLocale(
                            allImages[currentIndex]?.createdAt.toISOString(),
                        )}
                        {allImages[currentIndex]?.user?.username ? (
                            <div className='flex gap-2'>
                                <span>Par</span>
                                <span className='font-semibold'>
                                    {allImages[currentIndex]?.user?.username}
                                </span>
                                {allImages[currentIndex]?.user?.image && (
                                    <div className='relative h-[25px] w-[25px] items-center justify-center rounded-2xl'>
                                        <Image
                                            src={
                                                allImages[currentIndex]?.user
                                                    ?.image || defaultImage
                                            }
                                            alt={
                                                allImages[currentIndex]?.user
                                                    ?.username || 'Anonymous'
                                            }
                                            fill
                                            className='rounded-2xl object-cover'
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <span>via Google Images</span>
                        )}
                    </div>
                </div>
            </ModalWindow>
        </div>
    );
};

export default Carousel;
