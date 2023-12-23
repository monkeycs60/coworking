import prisma from '@/lib/prisma';

export const getLatestCoworkings = async () => {
    return await prisma.coworking.findMany({
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
};
