import prisma from '@/lib/prisma';
import { LastCoworking } from '@/types/lastCoworking';

export const getLatestCoworkings = async (): Promise<LastCoworking[]> => {
    return await prisma.coworking.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 8,
        select: {
            id: true,
            name: true,
            address: true,
            city: true,
            reviews: true,
            establishmentType: true,
            espressoPrice: true,
            imageSelectedUrls: {
                select: {
                    url: true,
                },
            },
            createdAt: true,
            placeId: true,
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                },
            },
        },
    });
};
