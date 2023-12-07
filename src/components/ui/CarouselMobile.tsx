'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import { setActiveIndex } from '@/redux/features/carouselState-slice';

interface CarouselMobileProps {
    id: string;
    children?: React.ReactNode;
    nextSlide: () => void;
    prevSlide: () => void;
    currentIndex: number;
    isAtStart: boolean;
    isAtEnd: boolean;
}

const CarouselMobile = ({
    id,
    children,
    nextSlide,
    prevSlide,
    currentIndex,
    isAtStart,
    isAtEnd,
}: CarouselMobileProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setActiveIndex({ carouselId: id, index: currentIndex }));
    }, [currentIndex, dispatch, id]);

    const visibleChildren = React.Children.toArray(children).slice(
        currentIndex,
        currentIndex + 1,
    );

    return (
        <div className='m-auto flex flex-col lg:gap-4'>
            <div className='relative flex w-full overflow-visible lg:pl-8'>
                <div className='flex w-full gap-4 transition-all duration-500 ease-in-out'>
                    {children &&
                        visibleChildren.map((child, index: number) => (
                            <div
                                key={index}
                                className={`carouselMobileItem py-6 transition-all duration-500
                                ease-in-out`}
                            >
                                {child}
                            </div>
                        ))}
                </div>
                {!isAtStart && (
                    <Button
                        variant='round'
                        size='sm'
                        className='group absolute left-[-50px] top-1/2 -translate-y-1/2 rounded-full border-[2px] border-transparent bg-primary p-1 text-primary hover:border-primary hover:bg-defaultWhite  lg:left-[-70px] lg:p-3'
                        onClick={prevSlide}
                    >
                        <ChevronLeft className='text-white group-hover:text-primary' />
                    </Button>
                )}
                {!isAtEnd ? (
                    <Button
                        variant='round'
                        size='sm'
                        className='group absolute right-[-50px] top-1/2 -translate-y-1/2 rounded-full border-[2px] border-transparent bg-primary p-1 text-defaultWhite hover:border-primary hover:bg-transparent lg:right-[-70px] lg:p-3'
                        onClick={nextSlide}
                    >
                        <ChevronRight className='text-white group-hover:text-primary' />
                    </Button>
                ) : (
                    <Button
                        variant='round'
                        size='sm'
                        className='group absolute right-[-50px] top-1/2 -translate-y-1/2 rounded-full border-[2px] border-transparent bg-gray-600 p-1 text-defaultWhite hover:border-gray-700 hover:bg-gray-700 lg:right-[-70px] lg:p-3'
                    >
                        <ChevronRight className='text-white group-hover:text-gray-200' />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CarouselMobile;
