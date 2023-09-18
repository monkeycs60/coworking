import { prisma } from '@/lib/prisma';

export const getCoworkingRatings = async (coworkingId: string) => {
    const coworkingRatings = await prisma.coworking.findUnique({
        where: {
            id: coworkingId,
        },
        select: {
            reviews: {
                select: {
                    calmRating: true,
                    equipRating: true,
                    foodRating: true,
                    feelingRating: true,
                },
            },
        },
    });
    return coworkingRatings;
};
