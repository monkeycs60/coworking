import { prisma } from '@/lib/prisma';

export const getAllCoworkings = async () => {
    const coworkings = await prisma.coworking.findMany({
        include: {
            imagesSelected: true,
            userImages: true,
            reviews: true,
        },
    });
    return coworkings;
};
