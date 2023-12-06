'use client';

import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import { setActiveIndex } from '@/redux/features/carouselState-slice';

interface CarouselProps {
    id: string;
    children?: React.ReactNode;
    nextSlide: () => void;
    prevSlide: () => void;
    currentIndex: number;
    isAtStart: boolean;
    isAtEnd: boolean;
}

const Carousel = ({
    id,
    children,
    nextSlide,
    prevSlide,
    currentIndex,
    isAtStart,
    isAtEnd,
}: CarouselProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setActiveIndex({ carouselId: id, index: currentIndex }));
    }, [currentIndex, dispatch, id]);

    const visibleChildren = React.Children.toArray(children).slice(
        currentIndex,
        currentIndex + 4,
    );

    console.log(visibleChildren);
	

    return (
        <div className='m-auto flex flex-col gap-4'>
            <div className='relative flex w-full overflow-visible'>
                <div className='flex w-full gap-4 transition-all duration-500 ease-in-out'>
                    {children &&
                        visibleChildren.map((child, index: number) => (
                            <div
                                key={index}
                                className={`carouselItem  py-6 transition-all duration-500
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
                        className='group absolute left-[-70px] top-1/2 -translate-y-1/2 rounded-full border-[2px] border-transparent bg-primary p-3 text-primary  hover:border-primary hover:bg-defaultWhite'
                        onClick={prevSlide}
                    >
                        <ChevronLeft className='text-white group-hover:text-primary' />
                    </Button>
                )}
                {!isAtEnd ? (
                    <Button
                        variant='round'
                        size='sm'
                        className='group absolute right-[-70px] top-1/2 -translate-y-1/2 rounded-full border-[2px] border-transparent bg-primary p-3 text-defaultWhite hover:border-primary hover:bg-transparent'
                        onClick={nextSlide}
                    >
                        <ChevronRight className='text-white group-hover:text-primary' />
                    </Button>
                ) : (
                    <Button
                        variant='round'
                        size='sm'
                        className='group absolute right-[-70px] top-1/2 -translate-y-1/2 rounded-full border-[2px] border-transparent bg-gray-600 p-3 text-defaultWhite hover:border-gray-700 hover:bg-gray-700'
                    >
                        <ChevronRight className='text-white group-hover:text-gray-200' />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Carousel;
