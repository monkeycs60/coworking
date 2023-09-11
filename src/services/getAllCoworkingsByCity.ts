import { PrismaClient } from '@prisma/client';

export const getAllCoworkingsByCity = async (city: string) => {
    const prisma = new PrismaClient();
    const coworkings = await prisma.coworking.findMany({
        where: {
            city: city,
        },
    });
    return coworkings;
};
