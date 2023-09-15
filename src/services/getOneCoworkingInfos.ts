import { PrismaClient } from '@prisma/client';

export const getOneCoworkingInfos = async (coworkingId: string) => {
    const prisma = new PrismaClient();
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
