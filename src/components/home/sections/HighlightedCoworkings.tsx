import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import CarouselWrapper from '../highlightedCoworkings/CarouselWrapper';

const HighlightedCoworkings = async () => {
    const latestCoworkings = await prisma.coworking.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 10,
        select: {
            id: true,
            name: true,
            address: true,
            city: true,
            reviews: true,
            userImages: {
                select: {
                    url: true,
                },
            },
            imagesSelected: {
                select: {
                    url: true,
                },
            },
            createdAt: true,
            placeId: true,
        },
    });
    return (
        <section className='my-[12vh] flex flex-col gap-8 overflow-x-hidden px-4 lg:mb-32 lg:mt-4 '>
            <div className='flex flex-col gap-8 lg:flex-row lg:justify-between '>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-2xl font-bold'>
                        Récemment dénichés par la communauté
                    </h2>
                    <h3 className='text-base text-gray-700 lg:w-[75%] lg:text-base 3xl:text-lg'>
                        Découvrez les derniers lieux ajoutés par nos membres
                    </h3>
                </div>
                <Button
                    variant={'default'}
                    size={'sm'}
                    className='w-full lg:h-12 lg:w-[320px] lg:px-4 '
                >
                    <span>Explorer tous les coworkings</span>
                </Button>
            </div>
            <CarouselWrapper coworkings={latestCoworkings} />
        </section>
    );
};

export default HighlightedCoworkings;
