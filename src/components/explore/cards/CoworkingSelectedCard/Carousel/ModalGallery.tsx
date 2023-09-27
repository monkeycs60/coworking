import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { formatDateForFrenchLocale } from '@/lib/functions/formatDateForFrenchLocale';
import { UnifiedImage } from '@/types/coworking';

interface ModalGalleryProps {
    allImages: UnifiedImage[];
    defaultImage: string;
    currentIndex: number;
    prevSlide: () => void;
    nextSlide: () => void;
}

const ModalGallery = ({
    allImages,
    defaultImage,
    currentIndex,
    prevSlide,
    nextSlide,
}: ModalGalleryProps) => {
    return (
        <div className='flex h-[40vh] w-full flex-col items-center justify-center gap-6 lg:h-[70vh]'>
            <div className='relative h-[80%] w-[75%] '>
                <Image
                    src={allImages[currentIndex]?.url || defaultImage}
                    fill
                    className='select-none rounded-xl object-cover'
                    alt='clicked image'
                />
                <ChevronLeft
                    onClick={prevSlide}
                    className='absolute -left-12 top-1/2 z-[100] h-8 w-8 -translate-y-1/2 cursor-pointer lg:-left-16 lg:h-14 lg:w-14'
                />
                <ChevronRight
                    onClick={nextSlide}
                    className='absolute -right-12 top-1/2 z-[100] h-8 w-8 -translate-y-1/2 cursor-pointer lg:-right-16 lg:h-14 lg:w-14'
                />
            </div>
            {allImages[currentIndex]?.createdAt && (
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
            )}
        </div>
    );
};

export default ModalGallery;
