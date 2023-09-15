import { prisma } from '@/lib/prisma';

export const getOneCoworkingInfos = async (coworkingId: string) => {
    const coworking = await prisma.coworking.findUnique({
        where: {
            id: coworkingId,
        },
        include: {
            openingHours: true,
            imagesSelected: true,
            userImages: true,
            comments: true,
            reviews: {
                include: {
                    user: true,
                },
            },
        },
    });
    return coworking;
};
