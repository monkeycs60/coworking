import { prisma } from '@/lib/prisma';

export const getAllCoworkingsByCity = async (city: string) => {
    const coworkings = await prisma.coworking.findMany({
        where: {
            city: city,
        },
        include: {
            imagesSelected: true,
            userImages: true,
            reviews: true,
        },
    });
    return coworkings;
};
